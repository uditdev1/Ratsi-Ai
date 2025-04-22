import { useState } from "react";
import { backend } from "../utils/backend";
import axios from "axios";

const AudioResponse = () => {
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    const generateAudio = async () => {
        if (!text.trim()) return alert("Please enter some text!");
    
        setLoading(true);
        try {
            const response = await axios.post(
                backend + "/solve/audio",
                { text },
                { responseType: "arraybuffer" }
            );
            const audioBlob = new Blob([response.data], { type: "audio/mpeg" });
            const url = URL.createObjectURL(audioBlob);
            setAudioUrl(url);
        } catch (error) {
            console.error("TTS Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 pt-20 min-h-screen">
            <h2 className="text-xl font-bold">Text-to-Speech</h2>
            <textarea
                className={`
                    border border-green-300 
                    focus:outline-none focus:border-green-400 focus:shadow-sm shadow-green-200
                    text-white rounded-md p-4 w-full
                    h-30
                `}
                value={text}
                onKeyDown={(e) => {
                    if(e.key === 'Enter') {
                        e.preventDefault();
                        generateAudio();
                    }
                }}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text here..."
            />
            <button
                className="bg-green-500 rounded-md duration-200 cursor-pointer hover:opacity-[0.8] opacity-full text-white px-4 py-2 mt-2"
                onClick={generateAudio}
                disabled={loading}
            >
                {loading ? "Generating..." : "Generate Audio"}
            </button>

            {audioUrl && (
                <audio autoPlay controls className="mt-4 ">
                    <source src={audioUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            )}
        </div>
    );
};

export default AudioResponse;
