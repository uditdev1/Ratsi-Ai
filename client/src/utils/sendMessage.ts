import { backend } from "./backend";

export const sendMessage = async (
        text: string, 
        loading : boolean , 
        setLoading : any , 
        setError : any, 
        setMessages : any,
        id : string
    ) => {
    if (!text.trim() || loading) return;

    setLoading(true);
    setError(null);

    setMessages((prev : Object[]) => [...prev, { type: "user", content: text }]);

    try {
        const response = await fetch(backend + "/tutor/dsa_tutor", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json" , 
                "access_token" : localStorage.getItem("token") ?? "" 
            },
            body: JSON.stringify({ prompt: text, userId: id }),
        });

        if (!response.body) throw new Error("Response body is null");

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let accumulatedText = "";

        setMessages((prev : Object[]) => [...prev, { type: "ai", content: "⏳ AI is thinking..." }]);
        
        const updateLastMessage = (newContent: string) => {
            setMessages((prev : []) => {
                return prev.map((msg : String, index : number) =>
                    index === prev.length - 1 ? { ...msg, content: newContent } : msg
                );
            });
        };

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunkText = decoder.decode(value, { stream: true });
            accumulatedText += chunkText;

            updateLastMessage(accumulatedText);
        }

    } catch (error) {
        console.error("Error fetching AI response:", error);
        setError("Failed to fetch AI response. Please try again.");
        setMessages((prev : any) => [
            ...prev.filter((msg : any) => msg.content !== "⏳ AI is thinking..."),
            { type: "ai", content: "Failed to fetch response. Please try again." },
        ]);
    } finally {
        setLoading(false);
    }
};