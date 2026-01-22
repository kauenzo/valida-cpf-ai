import { getClient } from '.'

export async function obterSolucaoDeErro(
  errorMessage: string,
): Promise<string> {
  try {
    const response = await getClient().chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'Você é um assistente direto e objetivo. Identifique o que o usuário digitou, explique brevemente (1 frase) por que aquilo não é um CPF válido, e peça para ele digitar um CPF válido. NÃO mencione o formato esperado, número de dígitos ou padrões.',
        },
        {
          role: 'user',
          content: errorMessage,
        },
      ],
      temperature: 0.3,
    })

    return (
      response.choices[0]?.message.content?.trim() ||
      'Não foi possível obter uma solução'
    )
  } catch {
    throw new Error(`Erro ao validar CPF com OpenAI: ${errorMessage}`)
  }
}

