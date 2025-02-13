import OpenAI from "openai";
import { z } from "zod";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY environment variable");
}

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const answerSchema = z.object({
  answer: z.string(),
  explanation: z.string(),
  relatedTopics: z.array(z.string())
});

export type AnswerResponse = z.infer<typeof answerSchema>;

export async function generateAnswer(
  question: string,
  subject: string
): Promise<AnswerResponse> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert ${subject} teacher for 9th and 10th grade students. 
            Provide clear, accurate, and educational answers suitable for this age group.
            Format your response as JSON with these fields:
            - answer: The main answer to the question
            - explanation: A detailed explanation of the concept
            - relatedTopics: An array of related topics to explore`
        },
        {
          role: "user",
          content: question
        }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content);
    return answerSchema.parse(result);
  } catch (error) {
    throw new Error(`Failed to generate answer: ${error.message}`);
  }
}

export async function generateBlanks(text: string): Promise<{
  content: string;
  blanks: string[];
  answers: string[];
}> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Create a fill-in-the-blank exercise from the given text.
            Select key terms or concepts to blank out.
            Format response as JSON with:
            - content: Text with blanks marked as ___
            - blanks: Array of blank spaces in order
            - answers: Array of correct answers in order`
        },
        {
          role: "user",
          content: text
        }
      ],
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    throw new Error(`Failed to generate exercise: ${error.message}`);
  }
}
