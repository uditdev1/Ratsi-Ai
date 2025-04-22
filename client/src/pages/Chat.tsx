import { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import TopicTitle from "../components/TopicTitle";
import InputPrompt from "../components/InputPrompt";
import { backend } from "../utils/backend";
import { sendMessage } from "../utils/sendMessage";
import { useVerifyMe } from "../hooks/useVerifyMe";

interface ChatProps {
    topic: string;
}

interface Message {
    type: "user" | "ai";
    content: string;
}

const Chat: React.FC<ChatProps> = ({ topic }) => {
    const { verifyUser } = useVerifyMe();

    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [ id ] = useState<string>(localStorage.getItem("email") ?? "");

    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleSendMessage = (text : string) => {
        sendMessage(text, loading, setLoading, setError, setMessages, id);
    };

    useEffect(() => {
        verifyUser();
        sendMessage(topic, loading, setLoading, setError, setMessages, id);
    }, []);

    useEffect(() => {
        return () => {
            fetch( backend + "/tutor/removeme?userId=" + id , {
                method : "GET",
                headers: { 
                "access_token" : localStorage.getItem("token") ?? "" 
                },
            })
            .then((response) => {
                if (!response.ok) {
                    console.error("Failed to call removeme API");
                }
            })
            .catch((error) => {
                console.error("Error calling removeme API:", error);
            });
        };
    }, []);

    return (
        <div className="flex flex-col h-screen p-4 bg-gray-900 text-white no-scroll pt-30">
            <TopicTitle topic={messages[0]?.content ?? "Unknown topic "} />
            <div className="flex-1 overflow-y-auto no-scrollbar mb-4">
                {messages.map((msg, index) => (
                    index != 0 &&
                    <div
                        key={index}
                        className={`p-4 my-2 rounded-lg max-w-[80%] ${
                            msg.type === "ai"
                                ? "bg-gray-800 self-start"
                                : "bg-blue-500 self-end"
                        }`}
                    >
                        {msg.type === "ai" ? (
                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                        ) : (
                            msg.content
                        )}
                    </div>
                ))}
                {loading && (
                    <div className="p-4 my-2 bg-gray-800 rounded-lg max-w-[80%] self-start">
                        <span className="animate-pulse">Typing...</span>
                    </div>
                )}
                {error && (
                    <div className="p-4 my-2 bg-red-500 rounded-lg max-w-[80%] self-start">
                        {error}
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>

            <div className="grid max-sm:flex grid-cols-3 max-sm:flex-col gap-4 justify-center items-center ">
                <div className="flex gap-8 justify-center col-span-1 w-full">
                    <button
                        disabled={loading}
                        onClick={() => handleSendMessage("Yes , I understand this lets move on to next topic")}
                        className="bg-blue-500 h-[3rem] cursor-pointer px-4 py-2 rounded-md disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >
                        Yes
                    </button>
                    <button
                        disabled={loading}
                        onClick={() => handleSendMessage("No, I didn't understand this, please repeat this ")}
                        className="bg-blue-500 h-[3rem] cursor-pointer px-4 py-2 rounded-md disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >
                        No
                    </button>
                </div>
                <div className="col-span-2">
                    <InputPrompt 
                        loading={loading}
                        handleSendMessage={handleSendMessage}
                    />
                </div>
            </div>
        </div>
    );
};

export default Chat;