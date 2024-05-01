import { useState } from "react";

const PromptPage = () => {
  const [prompt, setPrompt] = useState("Press button for prompt");
  const [inputValue, setInputValue] = useState('');
  
  const handlePrompt = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/prompt');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPrompt(data);
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
