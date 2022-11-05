import { z } from 'zod'

export const TelegramUsernameSchema = z.string().min(1).regex(
  /^(?:https:\/\/t.me\/)?@?[A-Za-z][A-Za-z0-9_]{4,31}$/, // https://core.telegram.org/method/account.checkUsername (also: username must start with a letter; docs don't mention that)
  'Invalid Telegram username',
).transform(username => {
  return username
    .trim()
    .replace(new RegExp('https://t.me/', 'g'), '')
    .replace(new RegExp('@', 'g'), '')
})

export type TelegramUsername = z.infer<typeof TelegramUsernameSchema>
