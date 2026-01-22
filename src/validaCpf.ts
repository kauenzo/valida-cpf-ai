import { getClient } from '.'
import { obterSolucaoDeErro } from '.'

/**
 * Valida um CPF brasileiro utilizando inteligência artificial.
 *
 * Esta função envia o CPF para a API da OpenAI que realiza a validação
 * considerando formato, algoritmo dos dígitos verificadores e CPFs inválidos conhecidos.
 *
 * @param cpf - CPF a ser validado (aceita string ou número, com ou sem formatação)
 * @returns Promise que resolve para `true` se o CPF for válido, `false` caso contrário
 * @throws Lança erro apenas em caso de falha na comunicação com a API da OpenAI
 *
 * @example
 * ```typescript
 * const valido = await validaCpf('123.456.789-09')
 * console.log(valido) // true ou false
 *
 * // Também aceita sem formatação
 * const resultado = await validaCpf('12345678909')
 * ```
 */
export async function validaCpf(cpf: string | number): Promise<boolean> {
  try {
    const response = await getClient().chat.completions.create({
      model: 'gpt-4.1-nano',
      messages: [
        {
          role: 'system',
          content:
            'Você é um especialista em validação de CPF brasileiro. Valide o CPF fornecido considerando: formato (11 dígitos com ou sem formatação), algoritmo dos dígitos verificadores e CPFs inválidos conhecidos (111.111.111-11, etc). Responda APENAS "true" ou "false".',
        },
        {
          role: 'user',
          content: `Valide este CPF: ${cpf}`,
        },
      ],
      temperature: 0,
    })

    return response.choices[0]?.message.content?.trim().toLowerCase() === 'true'
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    const solution = await obterSolucaoDeErro(errorMessage)

    throw new Error(`${solution}`)
  }
}

