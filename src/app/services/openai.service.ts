import { Injectable } from '@angular/core';
import OpenAI from 'openai';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: environment.OPENAI_API_KEY,
      dangerouslyAllowBrowser: true // Note: In production, API calls should be made from backend
    });
  }

  async generateResponse(userMessage: string, conversationHistory: any[] = []): Promise<string> {
    try {
      // Create a system prompt for medical AI assistant
      const systemPrompt = `You are a helpful AI Health Assistant for a medical application. You provide accurate, helpful information about health and wellness, but you are not a substitute for professional medical advice. Always encourage users to consult healthcare professionals for serious concerns.

Key guidelines:
- Be empathetic and supportive
- Provide general health information and tips
- For symptoms, suggest monitoring and when to seek medical help
- Never diagnose conditions or prescribe treatments
- Direct users to book appointments with doctors when appropriate
- Keep responses concise but informative
- Use clear, simple language

If users ask about booking appointments, direct them to use the appointment booking feature.`;

      // Prepare messages for the API
      const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
        { role: 'system', content: systemPrompt },
        ...conversationHistory.slice(-10).map(msg => ({ // Keep last 10 messages for context
          role: msg.isBot ? 'assistant' as const : 'user' as const,
          content: msg.text
        })),
        { role: 'user', content: userMessage }
      ];

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
      });

      return completion.choices[0]?.message?.content || 'I apologize, but I couldn\'t generate a response right now. Please try again.';
    } catch (error) {
      console.error('OpenAI API error:', error);
      return 'I apologize, but I\'m experiencing technical difficulties. Please try again later or contact support if the issue persists.';
    }
  }
}