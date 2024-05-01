import OpenAI from 'openai';

function randomWord(words: []) {
  return words[Math.floor(Math.random() * words.length)];
}

async function generate() {
    const openai = new OpenAI();
    const data = require('./gptTopics.json');
    const words = data.words;
    const promptWord = randomWord(words);
    const systemPrompt = `
        You are a generator for a music application. The prompts ask users questions where their response is a particular song.

        Rules:
        - Prompts are all questions to prompt the user to input a song.
        - Prompts are strings of 5 to 8 words long.
        - Language use is suitable for teenagers.
        - Messages should all a friendly tone.
        - Responses are in plain text.
        - Only return a valid string. Do NOT include any text outside of the string object. Do not provide any additional explanations or context. 
        Just the string is needed.
        - Do not encapsulate response in quotation marks.
        - STRICTLY generate a question with the topic of: "${promptWord}", without explicity using this word in the final response.
        - DO NOT use 'go-to'.
          
    `;

    const stream = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'system', content: systemPrompt }],
        temperature: 0.8,
        stream: true,
      });
    
      let responseText = '';
    
      for await (const chunk of stream) {
        if (chunk.choices && chunk.choices.length > 0 && chunk.choices[0]?.delta?.content) {
          responseText += chunk.choices[0]?.delta?.content; 
        }
      }
      console.log(promptWord);
      console.log(responseText);
      return responseText;
    }


export default generate;

