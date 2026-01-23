# 🚀 Configuração na Vercel

## 📧 Configuração do Email (Resend)

### 1. Criar Conta no Resend

1. Acesse: https://resend.com/signup
2. Crie uma conta gratuita (free tier: 3.000 emails/mês)
3. Verifique seu email

### 2. Obter API Key

1. Acesse: https://resend.com/api-keys
2. Clique em "Create API Key"
3. Nome: "Quantify Health - Production"
4. Permissões: "Sending access"
5. Copie a chave (formato: `re_xxxxxxxxxxxx`)

⚠️ **IMPORTANTE**: Guarde esta chave em local seguro. Ela não será exibida novamente.

---

## ⚙️ Variáveis de Ambiente na Vercel

Você **DEVE** configurar as variáveis de ambiente na Vercel antes do deploy funcionar:

### 1. Acesse o Dashboard da Vercel

- URL: https://vercel.com/[seu-usuario]/quantifyhealth/settings/environment-variables

### 2. Adicione as seguintes variáveis:

#### RESEND_API_KEY (Obrigatório)

- **Key**: `RESEND_API_KEY`
- **Value**: `re_xxxxxxxxxxxx` (sua chave do Resend)
- **Environment**: ✅ Production, ✅ Preview, ✅ Development

#### RECIPIENT_EMAIL (Obrigatório)

- **Key**: `RECIPIENT_EMAIL`
- **Value**: `rosacode9@gmail.com`
- **Environment**: ✅ Production, ✅ Preview, ✅ Development

### 3. Após adicionar, faça redeploy

Você pode:

- Fazer push de um novo commit
- Ou ir em "Deployments" → Último deploy → [...] → "Redeploy"

---

## 🔍 Verificando se está configurado

### Logs de Sucesso

Se tudo estiver correto, você verá no log:

```
Resend: Email enviado com sucesso { id: 'xxx-xxx-xxx' }
```

### Logs de Erro

Se a variável não estiver configurada:

```
RESEND_API_KEY não configurada
```

Se o Resend falhar mas o fallback funcionar:

```
Resend error: [detalhes do erro]
Tentando fallback via FormSubmit...
FormSubmit: Email enviado com sucesso (backup)
```

---

## 📊 Dashboard do Resend

Acompanhe os emails enviados:

1. Acesse: https://resend.com/emails
2. Veja:
   - Status de entrega (Delivered/Failed)
   - Opens e clicks (se configurado)
   - Logs detalhados
   - Quota utilizada (X/3000 emails/mês)

---

## 🐛 Troubleshooting

### Email não chega

1. **Verifique Dashboard do Resend**: https://resend.com/emails
   - Veja se o email aparece como "Delivered"
   - Se aparecer como "Failed", clique para ver detalhes

2. **Verifique pasta de spam**
   - Em modo sandbox, emails vêm de `onboarding@resend.dev`
   - Podem ser marcados como spam

3. **Modo Sandbox (importante)**
   - Em modo sandbox, emails vão APENAS para o email verificado na conta Resend
   - Para enviar para qualquer email, é necessário verificar domínio próprio

### Erro 500

**Possível causa**: `RESEND_API_KEY` não configurada

**Solução**:
1. Verifique se a variável está na Vercel: Settings → Environment Variables
2. Verifique se está em todos os ambientes (Production, Preview, Development)
3. Faça redeploy após adicionar

### Erro 403 / 401

**Possível causa**: API Key inválida ou revogada

**Solução**:
1. Gere nova API key no Resend: https://resend.com/api-keys
2. Atualize no Vercel
3. Faça redeploy

### Fallback ativado (FormSubmit)

Se você ver: `"Email enviado via serviço alternativo"`

**Isso significa**:
- Resend falhou (temporariamente)
- FormSubmit enviou o email com sucesso
- Verifique logs para entender por que Resend falhou

**Ações recomendadas**:
1. Verifique dashboard Resend para ver se há problemas
2. Verifique se a API key está correta
3. Verifique se não atingiu a quota (3000/mês)

### Ambos serviços falharam

Se você ver: `"Erro ao enviar email. Por favor, tente novamente mais tarde."`

**Isso significa**:
- Tanto Resend quanto FormSubmit falharam
- Problema pode ser de rede ou configuração

**Solução**:
1. Verifique logs do Vercel: Deployments → [último] → Logs
2. Veja mensagens de erro específicas
3. Verifique se variáveis de ambiente estão corretas
4. Teste localmente primeiro

---

## 🔧 Desenvolvimento Local

### Configurar `.env.local`

Crie o arquivo `.env.local` na raiz do projeto:

```env
RESEND_API_KEY=re_xxxxxxxxxxxx
RECIPIENT_EMAIL=rosacode9@gmail.com
```

⚠️ **IMPORTANTE**: Este arquivo NÃO deve ser commitado (já está no `.gitignore`)

### Testar localmente

```bash
npm install
npm run dev
```

Acesse: http://localhost:5173

Preencha e envie o formulário. Verifique o console do terminal para ver logs do Resend.

---

## 📈 Limites do Free Tier

### Resend
- **3.000 emails/mês** (100/dia)
- Modo sandbox: emails apenas para email verificado
- Com domínio verificado: envio para qualquer email

### FormSubmit (Fallback)
- **Ilimitado** (mas menos confiável)
- Primeira vez: requer confirmação de email
- Após confirmação: funciona automaticamente

### Upgrade

Se precisar de mais de 3.000 emails/mês:
- Plano pago do Resend: $20/mês = 50.000 emails
- Ou considerar verificar domínio próprio (aumenta confiabilidade)

---

## 🔐 Segurança

### Chave Web3Forms Antiga (REVOGADA)

⚠️ **AÇÃO NECESSÁRIA**: Revogar chave antiga

A chave `18524f58-df95-4343-8419-ba73396577bf` estava exposta no repositório.

**Passos**:
1. Acesse: https://web3forms.com/dashboard
2. Revogue a chave antiga (se ainda ativa)
3. Não é mais necessária (migramos para Resend)

### Boas Práticas

- ✅ `.env.local` está no `.gitignore`
- ✅ Nunca commite chaves de API
- ✅ Use variáveis de ambiente do Vercel
- ✅ Regenere chaves se exposta

---

## 📝 Logs em Tempo Real

Para ver os logs:

1. Acesse: https://vercel.com/[seu-usuario]/quantifyhealth
2. Clique em "Logs" ou "Deployments" → [último] → "Logs"
3. Filtre por "api/send-email" para ver apenas logs de email

Você verá:
- ✅ Tentativa de envio via Resend
- ✅ Sucesso ou erro com detalhes
- ✅ Tentativa de fallback (se Resend falhar)
- ✅ Status final retornado ao cliente

---

## 🎯 Modo Sandbox vs Domínio Verificado

### Modo Sandbox (Atual)

- Emails enviados de: `onboarding@resend.dev`
- Emails vão APENAS para: email verificado na conta Resend
- Ideal para: testes e início de produção
- Limitação: não envia para emails arbitrários

### Domínio Verificado (Futuro)

Para enviar para qualquer email:

1. Acesse: https://resend.com/domains
2. Clique em "Add Domain"
3. Adicione seu domínio (ex: `quantifyhealth.com.br`)
4. Configure DNS (TXT, MX, CNAME)
5. Aguarde verificação
6. Atualize código: `from: "Cotações <contato@quantifyhealth.com.br>"`

**Benefícios**:
- Envio para qualquer email
- Maior confiabilidade de entrega
- Branding profissional
- Menos chance de spam

---

## ✅ Checklist de Deploy

Antes de fazer deploy, verifique:

- [ ] Conta no Resend criada
- [ ] API key do Resend obtida
- [ ] `RESEND_API_KEY` configurada no Vercel
- [ ] `RECIPIENT_EMAIL` configurada no Vercel
- [ ] Testado localmente (formulário enviando email)
- [ ] `.env.local` NÃO commitado
- [ ] Chave antiga Web3Forms revogada
- [ ] Código atualizado em `api/send-email.ts`
- [ ] Dependência `resend` instalada (`npm install resend`)
- [ ] Build local funcionando (`npm run build`)

---

## 🆘 Suporte

### Resend
- Documentação: https://resend.com/docs
- Status: https://resend.com/status
- Suporte: https://resend.com/support

### FormSubmit
- Documentação: https://formsubmit.co/help
- FAQ: https://formsubmit.co/faq

### Vercel
- Documentação: https://vercel.com/docs
- Suporte: https://vercel.com/support
