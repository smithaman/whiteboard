'use server';

import { clarifyDrawingFeedback } from '@/ai/flows/clarify-feedback';
import type { ClarifyDrawingFeedbackInput } from '@/ai/flows/clarify-feedback';

export async function getClarifiedFeedbackAction(
  input: ClarifyDrawingFeedbackInput
): Promise<{ clarifiedOptions?: string[]; error?: string }> {
  try {
    const result = await clarifyDrawingFeedback(input);
    return { clarifiedOptions: result.clarifiedFeedbackOptions };
  } catch (error) {
    console.error('Error clarifying feedback:', error);
    return {
      error:
        "Sorry, I couldn't generate suggestions right now. Please try again later.",
    };
  }
}
