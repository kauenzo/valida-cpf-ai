# valida-cpf-ai

Uma biblioteca moderna e inovadora para validação de CPF brasileiro utilizando inteligência artificial.

## Por que usar?

Esta biblioteca oferece uma abordagem única para validação de CPF, aproveitando o poder da inteligência artificial da OpenAI para garantir validações precisas e confiáveis. Além da validação tradicional, fornece mensagens de erro contextualizadas e inteligentes quando a validação falha.

## Instalação

```bash
npm install valida-cpf-ai
# ou
yarn add valida-cpf-ai
# ou
bun add valida-cpf-ai
```

## Configuração

Esta biblioteca requer uma chave de API da OpenAI. Você precisa configurá-la no **seu projeto** (não na lib):

### 1. Obtenha sua chave da OpenAI

[Crie ou acesse sua chave aqui](https://platform.openai.com/api-keys)

### 2. Configure a variável de ambiente

Crie um arquivo `.env` **na raiz do seu projeto** (onde você instalou a lib):

```env
OPENAI_API_KEY=sk-sua-chave-aqui
```

### 3. Carregue as variáveis de ambiente

**Node.js:**

```bash
# Instale o dotenv para carregar o .env
npm install dotenv
```

```typescript
// No início do seu arquivo (antes de importar a lib)
import 'dotenv/config'
import { validaCpf } from 'valida-cpf-ai'

// Agora pode usar
const resultado = await validaCpf('123.456.789-09')
```

**Bun:**

```typescript
// Bun carrega .env automaticamente, não precisa de nada extra
import { validaCpf } from 'valida-cpf-ai'

const resultado = await validaCpf('123.456.789-09')
```

**Produção:**

Em produção, configure a variável de ambiente `OPENAI_API_KEY` no seu servidor/plataforma:

- Vercel: Settings → Environment Variables
- Heroku: Config Vars
- AWS/GCP: Variáveis de ambiente do serviço
- Docker: `-e OPENAI_API_KEY=sua-chave`

## Uso

A biblioteca oferece duas funções para diferentes casos de uso:

### validaCpf(cpf)

Valida um CPF e retorna `true` ou `false`.

```typescript
import { validaCpf } from 'valida-cpf-ai'

const valido = await validaCpf('123.456.789-09')
console.log(valido) // true ou false
```

**Retorno:** `Promise<boolean>`

### validaCpfAI(cpf)

Valida um CPF de forma rigorosa. Retorna `true` se válido, lança erro com explicação da IA se inválido.

```typescript
import { validaCpfAI } from 'valida-cpf-ai'

try {
  await validaCpfAI('123.456.789-09')
  console.log('CPF válido!')
} catch (error) {
  console.error(error.message)
}
```

**Retorno:** `Promise<true>` ou lança erro

**Exemplo de erro:**

```text
❌ CPF Inválido:
abacate123

💡 Solução sugerida pela IA:
"abacate123" contém letras e não pode ser um CPF válido.
Por favor, digite um CPF válido.
```

## API

### validaCpf(cpf: string \| number): Promise\<boolean\>

Valida um CPF e retorna verdadeiro ou falso.

**Parâmetros:**

- `cpf` - CPF como string ou número, com ou sem formatação

**Retorna:** Promise que resolve para `boolean`

**Exceções:** Lança erro apenas em caso de falha na comunicação com a API

---

### validaCpfAI(cpf: string \| number): Promise\<true\>

Valida um CPF de forma rigorosa com feedback inteligente.

**Parâmetros:**

- `cpf` - CPF como string ou número, com ou sem formatação

**Retorna:** Promise que resolve para `true` se válido

**Exceções:** Lança erro com explicação detalhada se o CPF for inválido ou houver problemas na validação

## Desenvolvimento

```bash
# Instalar dependências
npm install

# Executar exemplo
npm run dev

# Build da biblioteca
npm run build
```

## Requisitos

- Node.js 18+
- Chave de API da OpenAI
- Conexão com internet

## Observações

- A validação utiliza a API da OpenAI, portanto requer conexão com internet
- Cada validação consome créditos da API da OpenAI
- A função `validaCpfAI` pode fazer múltiplas chamadas à API quando o CPF é inválido (uma para validar, outra para gerar a explicação do erro)

## Licença

MIT

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

