export async function sendMessage(options: SendMessageOptions) {
  throw new Error('Implement sendMessage')
}

export interface SendMessageOptions {
  from: string
  to: string
  text: string
  // TODO: add options from documentation
}
