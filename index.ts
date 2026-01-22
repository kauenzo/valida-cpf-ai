import { validaCpf, validaCpfAI } from './src/index'

// Exemplo 1: validaCpf - retorna boolean
async function exemplo1() {
  const cpf = '365.112.150-08' // cpf gerado no 4devs
  const valido = await validaCpf(cpf)
  console.log(`CPF ${cpf}: ${valido ? 'válido' : 'inválido'}`)
}

// Exemplo 2: validaCpfAI - lança erro se inválido
async function exemplo2() {
  try {
    await validaCpfAI('12345678909')
    console.log('CPF válido!')
  } catch (error) {
    console.error('Erro:', error instanceof Error ? error.message : error)
  }
}

await exemplo1()
await exemplo2()

