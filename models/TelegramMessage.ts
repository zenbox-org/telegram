import { z } from 'zod'
import { TelegramIdSchema } from './TelegramId'
import { Id } from '../../generic/models/Id'

/**
 * https://core.telegram.org/tdlib/docs/classtd_1_1td__api_1_1_message_content.html
 */
export const TelegramMessageTypeSchema = z.enum(['text'])

/**
 * https://core.telegram.org/tdlib/docs/classtd_1_1td__api_1_1message.html
 */
export const TelegramMessageSchema = z.object({
  id: TelegramIdSchema,
  senderId: TelegramIdSchema,
  chatId: TelegramIdSchema,
  date: z.date(),
  type: TelegramMessageTypeSchema,
  text: z.string(), // TODO: `text` field should only be present if message type is "text", according to Telegram docs: https://core.telegram.org/tdlib/docs/classtd_1_1td__api_1_1_message_content.html
})

export type TelegramMessage = z.infer<typeof TelegramMessageSchema>

export function validateTelegramMessage(message: TelegramMessage) {
  return TelegramMessageSchema.parse(message)
}

export function getTelegramMessageUid(message: TelegramMessage): Id {
  return message.id.toString()
}
