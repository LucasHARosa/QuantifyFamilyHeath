# 🚀 Configuração na Vercel

## ⚠️ IMPORTANTE: Variáveis de Ambiente

Você **DEVE** configurar as variáveis de ambiente na Vercel antes do deploy funcionar:

### 1. Acesse o Dashboard da Vercel
- URL: https://vercel.com/seu-usuario/quantifyhealth/settings/environment-variables

### 2. Adicione as seguintes variáveis:

#### WEB3FORMS_ACCESS_KEY
- **Key**: `WEB3FORMS_ACCESS_KEY`
- **Value**: `18524f58-df95-4343-8419-ba73396577bf`
- **Environment**: ✅ Production, ✅ Preview, ✅ Development

#### RECIPIENT_EMAIL (opcional)
- **Key**: `RECIPIENT_EMAIL`
- **Value**: `rosacode9@gmail.com`
- **Environment**: ✅ Production, ✅ Preview, ✅ Development

### 3. Após adicionar, faça redeploy

Você pode:
- Fazer push de um novo commit
- Ou ir em "Deployments" → Últi deploy → "Redeploy"

---

## 🔍 Verificando se está configurado

Se a variável não estiver configurada, você verá no log:
```
WEB3FORMS_ACCESS_KEY não configurada
```

## 📝 Logs de Debug

Os logs agora mostram:
- ✅ Status do Web3Forms (sucesso/erro)
- ✅ Status do FormSubmit (secundário)
- ✅ Resposta completa da API
- ✅ Headers enviados

Para ver os logs:
1. Acesse: https://vercel.com/seu-usuario/quantifyhealth/logs
2. Veja os logs em tempo real ou histórico

---

## 🐛 Problemas Comuns

### Erro 403 do Cloudflare
Se você ver "Just a moment..." no erro:
- ✅ **CORRIGIDO**: Adicionamos User-Agent e headers de navegador

### Email não chega
- Verifique o painel do Web3Forms: https://web3forms.com/dashboard
- Confirme que o email está configurado corretamente
- Verifique a pasta de spam

### Timeout / Loading eterno
- ✅ **CORRIGIDO**: Ajustamos o formato da função serverless
- ✅ **CORRIGIDO**: Configuramos timeout de 10 segundos no vercel.json
