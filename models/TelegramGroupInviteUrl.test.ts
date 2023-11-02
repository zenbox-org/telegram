import { expect, test } from '@jest/globals'
import { TelegramGroupInviteUrlSchema } from './TelegramGroupInviteUrl'

// Note: these are not real invite links, but they should pass the validation
export const TelegramGroupInviteUrlValidSamples = [
  'https://t.me/joinchat/_A5f_HSNi4A1BTEy',
  'https://t.me/joinchat/73aubwC2wmVhNjdB',
  'https://t.me/+pUKs7spYvnCI0ODJh',
  // NOTE: "+" is a special character that replaces "joinchat/"
]

export const TelegramGroupInviteUrlInvalidSamples = [
  'https://example.com/_A5f_HSNi4A1BTEy',
  'https://t.me/abracadabra_1990',
  '@_abracadabra_1990',
  '',
]

test.each(TelegramGroupInviteUrlValidSamples)('TelegramGroupInviteUrl valid sample matches schema', async function (sample) {
  const result = await TelegramGroupInviteUrlSchema.safeParseAsync(sample)
  if (result.success === false) console.info(sample, result)
  expect(result.success).toBe(true)
})

test.each(TelegramGroupInviteUrlInvalidSamples)('TelegramGroupInviteUrl invalid sample does not match schema', async function (sample) {
  const result = await TelegramGroupInviteUrlSchema.safeParseAsync(sample)
  if (result.success === true) console.info(sample, result)
  expect(result.success).toBe(false)
})
