import { TelegramUsernameSchema } from './TelegramUsername'

export const TelegramUsernameValidSamples = [
  'https://t.me/abracadabra_1990',
  '@abracadabra_1990',
  'abracadabra_1990',
]

export const TelegramUsernameInvalidSamples = [
  'https://example.com/abracadabra_1990',
  '@_abracadabra_1990',
  '@abracadabra-1990',
  '@abracadabra-abracadabra-abracadabra-abracadabra',
  '@syan', // min 5 meaningful symbols
  '',
]

test.each(TelegramUsernameValidSamples)('TelegramUsername valid sample matches schema', async function (sample) {
  const result = await TelegramUsernameSchema.safeParseAsync(sample)
  if (result.success === false) console.info(sample, result)
  expect(result.success).toBe(true)
})

test.each(TelegramUsernameInvalidSamples)('TelegramUsername invalid sample does not match schema', async function (sample) {
  const result = await TelegramUsernameSchema.safeParseAsync(sample)
  if (result.success === true) console.info(sample, result)
  expect(result.success).toBe(false)
})
