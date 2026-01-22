import OpenAI from 'openai'

let client: OpenAI

export function getClient(): OpenAI {
  if (!client) {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      throw new Error(
        'OPENAI_API_KEY não encontrada. Configure a variável de ambiente.',
      )
    }
    client = new OpenAI({ apiKey })
  }
  return client
}

