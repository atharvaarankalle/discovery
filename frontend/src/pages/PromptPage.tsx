import { useState } from "react";
import generate from "../api/openAI";

const PromptPage = () => {
  const [prompt, setPrompt] = useState("Press button for prompt");
  const [inputValue, setInputValue] = useState('');
  
  const handlePrompt = async () => {
    try {
      const response = await generate(); // assuming query() is your async function
      setPrompt(response); // setting state with the resolved string
    } catch (error) {
      console.error('There was a problem fetching the message:', error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <h1>{prompt}</h1>
      <button onClick={handlePrompt}>Generate</button>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter your answer"
      />
      <p>You typed: {inputValue}</p> {/* Displaying the typed value */}
    </div>
  );
};

export default PromptPage;
