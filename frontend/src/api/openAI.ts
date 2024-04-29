import OpenAI from 'openai';

async function querry() {
    const openai = new OpenAI({
        apiKey: 'sk-proj-eKNyjosvJVzhz014cRXBT3BlbkFJbou5phOpITkW0sbWlakg', dangerouslyAllowBrowser: true });
    
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
        - Randomly pick and base it on a topic in the following array of 100 words (use a randomizer):
        [
            "balmy", "scorching", "dreamy", "treble", "mournful", "chilly", "cool", "orchestra", "concert",
            "chill", "gardening", "buzzy", "instrumental", "harmony", "bass", "freezing", "tranquil", "melancholy",
            "genre", "skating", "happy", "stormy", "soothing", "wild", "cloudy", "painting", "atmospheric", "rainy",
            "serene", "clear", "reading", "hopeful", "joyful", "pessimistic", "yoga", "intense", "acoustic", "note",
            "cold", "writing", "humid", "shopping", "sad", "excited", "lyric", "singing", "frosty", "beat", "gloomy",
            "lazy", "spooky", "rhythm", "vibrant", "dancing", "moody", "groovy", "melody", "blustery", "energetic",
            "spirited", "edgy", "thunderous", "depressed", "melodic", "cosmic", "working", "windy", "anxious",
            "restless", "sunny", "relaxed", "mellow", "meditating", "hiking", "jogging", "despair", "dry", "foggy",
            "tempo", "cooking", "chord", "studying", "warm", "elated", "relaxing", "hot", "swimming", "lively", "tune",
            "upbeat", "traveling", "vocal", "fishing", "content", "optimistic", "symphony", "cheerful", "harmonize",
            "cycling", "downcast"
          ]
          
    `;

    const stream = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'system', content: systemPrompt }],
        stream: true,
      });
    
      let responseText = '';
    
      for await (const chunk of stream) {
        if (chunk.choices && chunk.choices.length > 0 && chunk.choices[0]?.delta?.content) {
          responseText += chunk.choices[0]?.delta?.content; 
        }
      }
      console.log(responseText);
      return responseText;
    }


export default querry;

