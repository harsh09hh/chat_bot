// lib/contextManager.ts
import { CoreMessage } from "ai";

export interface ConversationContext {
  summary: string;          // compressed history
  recentMessages: CoreMessage[]; // last K messages verbatim
  turnCount: number;
  activeModel: string;
}

const SUMMARY_EVERY_N_TURNS = 6;  // summarise after every 6 turns
const KEEP_RECENT_N         = 4;  // always keep last 4 messages verbatim

/** Call this after every assistant reply */
export async function updateContext(
  ctx: ConversationContext,
  newUserMsg: CoreMessage,
  newAssistantMsg: CoreMessage,
  summarise: (messages: CoreMessage[]) => Promise<string>  // injected
): Promise<ConversationContext> {
  const updated: ConversationContext = {
    ...ctx,
    recentMessages: [...ctx.recentMessages, newUserMsg, newAssistantMsg],
    turnCount: ctx.turnCount + 1,
  };

  // Summarise when the window overflows
  if (updated.recentMessages.length > KEEP_RECENT_N * 2) {
    const toCompress = updated.recentMessages.slice(0, -KEEP_RECENT_N * 2);
    const freshSummary = await summarise([
      ...toCompress,
      {
        role: "user",
        content: `Summarise the above conversation in 3–5 bullet points.
                  Focus on facts, decisions, and any names/numbers mentioned.
                  Existing summary to build on:\n${ctx.summary}`,
      },
    ]);

    return {
      ...updated,
      summary: freshSummary,
      recentMessages: updated.recentMessages.slice(-KEEP_RECENT_N * 2),
    };
  }

  return updated;
}

/** Build the final messages array to send to ANY provider */
export function buildPayload(ctx: ConversationContext): CoreMessage[] {
  // Summary becomes a system-level "memory block"
  const memoryBlock: CoreMessage | null = ctx.summary
    ? {
        role: "user",   // most providers accept user role for injected context
        content: `[Conversation so far — treat this as memory, not a question]\n${ctx.summary}`,
      }
    : null;

  return [
    ...(memoryBlock ? [memoryBlock] : []),
    ...ctx.recentMessages,
  ];
}