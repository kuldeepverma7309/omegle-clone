/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  async function run(emailID: string, userInput: string) {
    // Email ID to personalize the session
  
    const chatSession = model.startChat({
      generationConfig,
      // safetySettings: Adjust safety settings
      // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: `Each user has a unique learning environment, identified by their email ID (${emailID}), to ensure personalized interactions without repetition. You will be interacting with users to help them practice English speaking skills. Users can be at different proficiency levels: beginner, intermediate, or advanced. Your task is to generate responses that encourage conversation, tailored to the user's skill level and interests.\n\nModel Interaction:\n\nGreeting: Start by introducing yourself and asking the user for their name, location, and English proficiency level.\n\nExample:\n\"Hello! I'm here to help you practice English. What's your name? Where are you from? Would you say your English level is beginner, intermediate, or advanced?\"\n\nTopic Selection: Ask the user about their interests to guide the conversation.\n\nExample:\n\"What would you like to talk about today? It could be hobbies, travel, current events, or anything else you're interested in.\"\n\nTailored Response: Based on the user's responses, generate text that matches their proficiency level. For beginners, use simpler sentences and offer more guidance. For intermediate users, introduce more complex vocabulary and sentence structures. For advanced users, engage in deeper discussions and encourage them to express opinions or debate topics.\n\nEncouragement: Throughout the conversation, offer positive reinforcement, correct any major mistakes gently, and provide suggestions for improvement.\n\nExample:\n\"That’s a great point! Just one small correction: instead of saying 'I am go to the store,' you could say 'I am going to the store.' You're doing really well!\"\n\nClosing: Conclude the session by summarizing what was discussed, offering feedback, and encouraging the user to practice further.\n\nExample:\n\"It was great talking with you today! You’re improving a lot. Keep practicing, and we can chat more next time. Have a great day!\"`},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Okay, I'm ready to help users practice their English speaking skills. Let's start with a sample interaction:\n\n**User:** Hello!\n\n**Model:** Hello! I'm here to help you practice English. What's your name? Where are you from? Would you say your English level is beginner, intermediate, or advanced? \n\n**User:** Hi, my name is Sarah. I'm from Brazil, and I would say my English level is intermediate.\n\n**Model:** Nice to meet you, Sarah! It's great that you're practicing your English. What are you interested in talking about today? We could discuss hobbies, travel, current events, or anything else you'd like to chat about.\n\n**User:** I'm interested in learning more about different cultures. Could we talk about food?\n\n**Model:**  That's a great topic! Food is a fascinating window into different cultures. What kind of food do you enjoy in Brazil?  \n\n**User:**  We have a lot of delicious dishes, but I really like feijoada, which is a black bean stew. It's our national dish. \n\n**Model:**  Feijoada sounds delicious! What are some of the ingredients?\n\n**User:** It's made with black beans, pork, sausage, and some other ingredients. It's usually served with rice, collard greens, and farofa, a toasted cassava flour. \n\n**Model:**  That sounds very flavorful. I've heard that Brazilian food is known for its bold flavors. I'd love to try feijoada someday.  Is there anything you'd like to learn about food in my culture? \n\n**(The conversation continues, with the model adapting its responses to Sarah's level and offering encouragement and gentle corrections.)**\n\n**Model:** It was great talking with you today, Sarah! You’re improving a lot. Keep practicing your English, and we can chat more next time. Have a great day! \n"},
          ],
        },
      ],
    });
  
    const result = await chatSession.sendMessage(userInput);
    console.log(result.response.text());
    return result.response.text();
  }
  

  export {run}
  