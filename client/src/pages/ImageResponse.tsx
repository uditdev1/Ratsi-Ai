import axios from "axios";
import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { backend } from "../utils/backend";
import InputPrompt from "../components/InputPrompt";
import ReactMarkdown from "react-markdown";
import { useVerifyMe } from "../hooks/useVerifyMe";

interface Message {
  type: "user" | "ai";
  content: string | {
    text : string , 
    code : string ,
  };
}

const ImageResponse = () => {
  
  const [messages , setMessages] = useState<Message[]>([]);
  const [coinImagePreviewURL , setPreviewURL] = useState();
  const [coinImage, setCoinImage] = useState(null);
  const [ id ] = useState<string>(localStorage.getItem("email") ?? "");
  const [loading , setLoading] = useState<boolean>(false);
  const [firstCall , setFirstCall] = useState<boolean>(true);

  const separateTextCode = (data: string) => {
    const textMatch = data.match(/Text:\s*([\s\S]*?)\s*Code:/);
    const textPart = textMatch ? textMatch[1].trim() : "";
  
    const codeBlocks = [...data.matchAll(/```(?:\w+)?\s*([\s\S]*?)\s*```/g)].map(match => match[1].trim());
    if (textPart || codeBlocks.length > 0) {
      setMessages((prev: Message[]) => [
        ...prev, 
        { type: "ai", content: { text: textPart, code: codeBlocks.join("\n\n") } }
      ]);

    } else {
      console.log("Error: No valid text/code found.");
      setMessages((prev: Message[]) => [
        ...prev, 
        { type: "ai", content: { text: data, code: "Error" } }
      ]);
    }
  };

  const { verifyUser } = useVerifyMe();

  useEffect(() => {
    verifyUser();

    return () => {
      fetch( backend + "/solve/removeme?userId=" + id , {
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

  const handleImageChange = (e : any) => {
    const file = e.target.files[0];
    if (file) {
      const reader : any = new FileReader();
      if(!reader) {
        return ;
      }
      reader.onloadend = () => {
        setPreviewURL(reader.result); 
      };
      reader.readAsDataURL(file);
      setCoinImage(file);
    }
  };

  const handleSubmit = async (prompt : string) => {
    setLoading(true);
    setMessages((prev : Message[]) => [...prev, { type: "user", content: prompt }]);

    if(firstCall) {
      setFirstCall(false);
      handleSubmitFirst(prompt);
    } else {
      try {
        const { data } = await axios.post("/solve/img/query", { prompt , userId : id });
        if(!data.success){
          throw new Error(data.message);
        }
        separateTextCode(data.message);
        setLoading(false);
      } catch (e : any) {
        console.log(e.message);
        separateTextCode("Error occured");
        setLoading(false);
      }
    }
  }

  const handleSubmitFirst = async (prompt : string) => {
    const formData = new FormData();
    if(!coinImage) {
      return ;
    }
    formData.append("file", coinImage);
    formData.append("userId", id);
    formData.append("description", prompt);

    try {
      const { data } = await axios.post("/solve/img/bug", formData , {
        headers: {
            "Content-Type": "multipart/form-data",
        }
      });

      if(!data.success){
        throw new Error(data.message);
      }
      setPreviewURL(data.image);
      separateTextCode(data.message);

    } catch (e : any) {
      console.log(e.message);
      separateTextCode("Error occured");
    }

    setLoading(false);
  }

  return (
    <div className="p-4 min-h-screen relative pt-36">
      { 
          coinImage ?
          <img 
              className="h-40 my-4 w-[90%] rounded-xl relative object-cover"
              src={coinImagePreviewURL} alt="" 
          /> 
          :
          <div className="m-2 relative">
              <label className="block mb-2 text-2xl font-medium text-white" htmlFor="file_input">Upload file</label>
              <input onChange={(e) => handleImageChange(e)} className="block w-full text-2xl h-12 flex border border-gray-300 rounded-lg cursor-pointer text-gray-400 focus:outline-none border-gray-600 placeholder-gray-400" id="file_input" type="file"/>
          </div>
      }
      <div className="flex-1 overflow-y-auto no-scrollbar mb-4">
        {messages.map((msg, index) => (
          index !== 0 && (
            <div
              key={index}
              className={`p-4 my-2 text-white rounded-lg max-w-[90%] ${
                msg.type === "ai" ? "bg-gray-800 self-start" : "bg-blue-500 self-end"
              }`}
            >
              {typeof msg.content === "string" ? (
                msg.content
              ) : (
                <div>
                  <ReactMarkdown>{msg.content.text}</ReactMarkdown>
                  <SyntaxHighlighter language="java" style={dracula}>
                    {msg.content.code ?? ""}
                  </SyntaxHighlighter>
                </div>
              )}
            </div>
          )
        ))}
          {
            loading && (
              <div className="p-4 my-2 bg-gray-800 rounded-lg max-w-[90%] text-green-200 font-bold self-start">
                  <span className="animate-pulse">Typing...</span>
              </div>
            )
          }
      </div>
      <div className="col-span-2">
          <InputPrompt 
              firstCall={firstCall}
              loading={loading}
              handleSendMessage={handleSubmit}
          />
      </div>
    </div>
  );
};

export default ImageResponse;
