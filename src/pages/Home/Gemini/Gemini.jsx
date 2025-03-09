import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaCommentDots, FaTimes, FaPaperPlane, FaRobot } from "react-icons/fa";

const Gemini = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        // Add user message immediately
        const userMessage = { sender: "user", text: input.trim() };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            // Get bot response
            const res = await axios.post("https://aura-bite-server.vercel.app/gemini", { 
                prompt: input 
            });
            
            const botMessage = { 
                sender: "bot", 
                text: res.data?.response || "I'm having trouble connecting. Please try again later."
            };
            
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("API Error:", error);
            const errorMessage = {
                sender: "bot",
                text: "Oops! Something went wrong. Please try again."
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 left-6 z-[999]">
            {/* Chat Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-3 text-white rounded-full shadow-xl transition-all duration-300 ${
                    isOpen ? "bg-rose-500 rotate-45" : "bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                }`}
            >
                {isOpen ? <FaTimes size={24} /> : <FaCommentDots size={24} />}
            </button>

            {/* Chat Container */}
            {isOpen && (
                <div className="absolute bottom-20 left-0 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <FaRobot className="text-white text-xl" />
                            <h2 className="text-white font-bold text-lg">AuraBot</h2>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:text-purple-200 transition-colors"
                        >
                            <FaTimes size={18} />
                        </button>
                    </div>

                    {/* Messages Container */}
                    <div className="h-64 overflow-y-auto p-4 bg-gray-50">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-3`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-xl p-3 text-sm ${
                                        msg.sender === "user"
                                            ? "bg-purple-600 text-white rounded-br-none"
                                            : "bg-white text-gray-800 shadow-md rounded-bl-none border border-gray-100"
                                    }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-white shadow-md rounded-xl p-3 text-sm text-gray-600 flex space-x-2 items-center">
                                    <div className="animate-bounce w-2 h-2 bg-purple-600 rounded-full"></div>
                                    <div className="animate-bounce delay-100 w-2 h-2 bg-purple-600 rounded-full"></div>
                                    <div className="animate-bounce delay-200 w-2 h-2 bg-purple-600 rounded-full"></div>
                                </div>
                            </div>
                        )}
                        
                        {/* Empty State */}
                        {messages.length === 0 && !loading && (
                            <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                                Start chatting with AuraBot!
                            </div>
                        )}
                        
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t border-gray-100 bg-white">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                                placeholder="Type your message..."
                                className="flex-1 px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                disabled={loading}
                            />
                            <button
                                onClick={sendMessage}
                                disabled={loading || !input.trim()}
                                className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <FaPaperPlane className="text-sm" />
                            </button>
                        </div>
                        <p className="text-xs text-center text-gray-400 mt-2">
                            Powered by AuraBot AI
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gemini;


// import { useState } from "react";
// import axios from "axios";
// import { FaCommentDots, FaTimes, FaPaperPlane } from "react-icons/fa";

// const Gemini = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [messages, setMessages] = useState([]);
//     const [input, setInput] = useState("");
//     const [loading, setLoading] = useState(false);

//     const sendMessage = async () => {
//         if (!input.trim()) return;

//         const newMessages = [...messages, { sender: "user", text: input }];
//         setMessages(newMessages);
//         setInput("");
//         setLoading(true);

//         try {
//             const res = await axios.post("https://aura-bite-server.vercel.app/gemini", { prompt: input });
//             const botResponse = res.data.response || "Sorry, I couldn't understand that.";

//             setMessages([...newMessages, { sender: "bot", text: botResponse }]);
//         } catch (error) {
//             console.error("Error:", error);
//             setMessages([...newMessages, { sender: "bot", text: "Error getting response. Try again!" }]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <>
//             {/* Chat Bubble - Now on the LEFT */}
//             <div className="fixed bottom-6 left-6 z-[999]">
//                 <button
//                     onClick={() => setIsOpen(!isOpen)}
//                     className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
//                 >
//                     {isOpen ? <FaTimes size={24} /> : <FaCommentDots size={24} />}
//                 </button>
//             </div>

//             {/* Chat Box - Ensured it's on top */}
//             {isOpen && (
//                 <div className="fixed bottom-20 left-6 w-80 bg-white shadow-lg rounded-lg p-4 border border-gray-300 z-[1000]">
//                     <div className="flex justify-between items-center border-b pb-2 mb-2">
//                         <h3 className="text-lg font-semibold text-gray-800">Gemini AI Chat</h3>
//                         <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-red-500">
//                             <FaTimes size={20} />
//                         </button>
//                     </div>

//                     {/* Messages */}
//                     <div className="h-64 overflow-y-auto p-2 space-y-2">
//                         {messages.map((msg, index) => (
//                             <div
//                                 key={index}
//                                 className={`p-2 rounded-lg text-white ${
//                                     msg.sender === "user" ? "bg-blue-600 self-end" : "bg-gray-500 self-start"
//                                 }`}
//                             >
//                                 {msg.text}
//                             </div>
//                         ))}
//                         {loading && <p className="text-gray-500">Thinking...</p>}
//                     </div>

//                     {/* Input Box */}
//                     <div className="flex items-center mt-2 border-t pt-2">
//                         <input
//                             type="text"
//                             className="flex-1 p-2 border rounded-l focus:outline-none"
//                             placeholder="Type a message..."
//                             value={input}
//                             onChange={(e) => setInput(e.target.value)}
//                             onKeyPress={(e) => e.key === "Enter" && sendMessage()}
//                         />
//                         <button
//                             onClick={sendMessage}
//                             className="bg-blue-600 text-white p-2 rounded-r hover:bg-blue-700"
//                         >
//                             <FaPaperPlane />
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default Gemini;



