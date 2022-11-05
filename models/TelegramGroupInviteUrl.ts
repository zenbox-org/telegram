import { z } from 'zod'

export const TelegramGroupInviteUrlSchema = z.string().min(1).regex(
  /^https:\/\/t.me\/(?:joinchat\/|\+)[A-Za-z0-9_]+/,
  'Invalid Telegram invite link'
)

export type TelegramGroupInviteUrl = z.infer<typeof TelegramGroupInviteUrlSchema>
