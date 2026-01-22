import { validaCpf } from '.'
import { obterSolucaoDeErro } from '.'

/**
 * Valida um CPF de forma rigorosa, lançando erro com explicação da IA se inválido.
 *
 * Esta função utiliza validaCpf() internamente e, caso o CPF seja inválido,
 * faz uma segunda chamada à API da OpenAI para obter uma explicação detalhada
 * do motivo da invalidez. Ideal para casos onde você precisa garantir que o CPF
 * é válido ou obter feedback detalhado do erro.
 *
 * @param cpf - CPF a ser validado (aceita string ou número, com ou sem formatação)
 * @returns Promise que resolve para `true` se o CPF for válido
 * @throws Error com explicação gerada pela IA se o CPF for inválido ou houver falha na comunicação
 *
 * @example
 * ```typescript
 * try {
 *   await validaCpfAI('123.456.789-09')
 *   console.log('CPF válido!')
 * } catch (error) {
 *   console.error(error.message) // Explicação da IA sobre o erro
 * }
 * ```
 */
export async function validaCpfAI(cpf: string | number): Promise<true> {
  const valido = await validaCpf(cpf)

  if (!valido) {
    const errorMessage = `O valor "${cpf}" é um CPF inválido. Explique de forma breve e técnica (máximo 2-3 linhas) por que está incorreto.`
    const solution = await obterSolucaoDeErro(errorMessage)

    throw new Error(`${solution}`)
  }

  return true
}

