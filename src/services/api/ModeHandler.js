import { OpenAI } from    'openai';
import { OPENAI_API_KEY } from '@env';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export async function handleMode(mode, messages) {
  let fullResponse = '';
  let hasError = false;

  let systemInstructions = '';
  
  if (mode === 'Creative Mode') {
    systemInstructions = `
      As a creative assistant, your task is to suggest creative activities like journaling, painting, or making music. 
      Focus on activities that engage artistic expression and stimulate imagination.
    `;
  } else if (mode === 'Social Break Mode') {
    systemInstructions = `
      As a wellness assistant, suggest activities for taking a break from social interaction. This could include journaling, walks, or mindfulness.
    `;
  } else if (mode === 'Drunk Mode') {
    systemInstructions = `
      As a self-care assistant, suggest activities for someone who is intoxicated and needs to stay off social media. Offer calming, responsible suggestions.
    `;
  } else if (mode === 'Focus Mode') {
    systemInstructions = `
      As a productivity assistant, suggest activities that help with focus. Encourage deep work, time-blocking, and productivity techniques.
    `;
  }

  try {
    // Generate response using OpenAI GPT
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemInstructions },
        ...messages.map(msg => ({ role: 'user', content: msg })),
      ],
    });

    fullResponse = response.choices[0].message.content;
  } catch (err) {
    hasError = true;
    fullResponse = 'Error: ' + err.message;
  }

  return { response: fullResponse, hasError };
}