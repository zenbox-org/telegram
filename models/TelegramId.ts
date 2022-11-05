import { z } from 'zod'

export const TelegramIdSchema = z.number().int()

export type TelegramId = z.infer<typeof TelegramIdSchema>
