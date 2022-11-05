import { z } from 'zod'
import { Contact, parseContact } from '../../generic/models/Contact'
import { Person } from '../../generic/models/Person'
import { ensureFind } from 'zenbox-util/ensure'
import { Cage } from 'zenbox-util/cage'

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

export function ensureTelegramContact<Err>(person: Person, error?: Cage<Err>): Contact {
  return ensureFind(person.contacts, c => c.startsWith(telegramUrlPrefix), error)
}

export function ensureTelegramUsername<Err>(person: Person, error?: Cage<Err>): string {
  return getTelegramUsernameFromUrl(ensureTelegramContact(person, error))
}

export function getTelegramUsernameFromUrl(url: string) {
  const contactURL = new URL(url)
  const protocol = contactURL.protocol.replace(':', '')
  switch (protocol) {
    case 'telegram':
    case 'tg':
      return contactURL.pathname
    case 'http':
    case 'https':
      return contactURL.pathname.split('/')[1]
    default:
      throw new Error(`Unknown contact protocol: ${protocol} (url: ${url})`)
  }
}

export const telegramUrlPrefix = 'https://t.me'

export function tg(username: string) {
  return parseContact(telegramUrlPrefix + '/' + TelegramUsernameSchema.parse(username))
}
