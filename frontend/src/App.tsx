import { useState } from "react";
import querry from "./api/openAI";

function App() {
  const [prompt, setPrompt] = useState("Click the button to generate");
  
  const handlePrompt = async () => {
    try {
      const response = await querry(); 
      setPrompt(response); 
    } catch (error) {
      console.error('There was a problem fetching the message:', error);
    }
  };
  
  return (
    <div>
      <h1>{prompt}</h1>
      <button onClick={handlePrompt}>Generate Prompt</button>
    </div>
  );
}

export default App;
