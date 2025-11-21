import { z } from "zod";

export const walletAddressSchema = z
  .string()
  .trim()
  .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid wallet address format");

export const questIdSchema = z
  .string()
  .trim()
  .min(1, "Quest ID is required")
  .max(100, "Quest ID is too long");

export const agentConfigSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Agent name is required")
    .max(50, "Agent name must be less than 50 characters"),
  questId: questIdSchema,
  parameters: z.record(z.unknown()).optional(),
});

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(1000, "Message must be less than 1000 characters"),
});

export type WalletAddress = z.infer<typeof walletAddressSchema>;
export type QuestId = z.infer<typeof questIdSchema>;
export type AgentConfig = z.infer<typeof agentConfigSchema>;
export type ContactForm = z.infer<typeof contactFormSchema>;
