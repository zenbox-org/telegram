import { Cage } from 'libs/utils/cage'
import { ensureFind } from 'libs/utils/ensure'
import { Contact, parseContact } from '../../../generic/models/Contact'
import { Person } from '../../../generic/models/Person'
import { TelegramUsernameSchema } from '../TelegramUsername'

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
