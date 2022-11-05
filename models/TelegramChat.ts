import { z } from 'zod'
import { TelegramIdSchema } from './TelegramId'
import { Id } from '../../generic/models/Id'

/**
 * https://core.telegram.org/tdlib/docs/classtd_1_1td__api_1_1chat.html
 */
export const TelegramChatSchema = z.object({
  id: TelegramIdSchema,
  title: z.string(),
})

export type TelegramChat = z.infer<typeof TelegramChatSchema>

export function validateTelegramChat(telegramChat: TelegramChat) {
  return TelegramChatSchema.parse(telegramChat)
}

export function getTelegramChatUid(chat: TelegramChat): Id {
  return chat.title
}
