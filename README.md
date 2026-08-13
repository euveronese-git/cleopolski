# C. Leopolski — Site de Imóveis

SPA Vite + React com painel **Decap CMS** para a cliente editar imóveis sem tocar no código.

## Rodar localmente

**Pré-requisitos:** Node.js

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Copie [`.env.example`](.env.example) para `.env` e preencha as chaves (incluindo Cloudinary, se for testar o painel).
3. Inicie o site:
   ```bash
   npm run dev
   ```
4. Abra [http://localhost:3000](http://localhost:3000).

### Painel CMS em desenvolvimento (opcional)

Para editar imóveis localmente com o Decap (sem Identity):

1. Em um terminal, rode o proxy local do Decap:
   ```bash
   npx decap-server
   ```
2. Em outro, `npm run dev`
3. Abra [http://localhost:3000/admin/](http://localhost:3000/admin/)

O `config.yml` já tem `local_backend: true` para esse fluxo.

## Conteúdo dos imóveis

- Cada imóvel é um JSON em [`content/properties/`](content/properties/)
- Fotos **antigas** (já no Git) ficam em [`public/uploads/`](public/uploads/)
- Fotos **novas** pelo painel vão para o **Cloudinary** (várias de uma vez no seletor do Windows)
- O site carrega os JSONs no build (`src/data/loadProperties.ts`)

Após publicar no painel em produção, a Netlify faz rebuild e o site atualiza em cerca de 1–2 minutos.

## Upload de várias fotos (Cloudinary)

O Decap com Git Gateway só envia **um arquivo por vez**. Para a cliente selecionar 20 fotos de uma vez, o campo Fotos usa a biblioteca Cloudinary.

### 1. Criar a conta

1. Cadastre-se em [cloudinary.com](https://cloudinary.com/users/register/free)
2. No console, canto superior esquerdo: anote **Cloud name** e **API Key**
3. Convide a cliente para essa conta Cloudinary (o widget pede login nela ao abrir a biblioteca)

A API Key não é o `api_secret` — o secret **não** vai no site.

### 2. Variáveis na Netlify

**Site settings → Environment variables:**

| Nome | Valor |
|------|--------|
| `CLOUDINARY_CLOUD_NAME` | Cloud name do console |
| `CLOUDINARY_API_KEY` | API Key do console |

O build injeta esses valores em `/admin/config.yml`. Sem elas, o seletor de várias fotos não abre.

Depois de salvar as variáveis, faça **Deploys → Trigger deploy** (ou um push) para o painel em produção atualizar. Mudança de código **não** aparece no `/admin` até o próximo build.

### 3. Como a cliente usa

1. Entra em `/admin` (Netlify Identity)
2. Abre um imóvel → **Fotos**
3. Abre a biblioteca Cloudinary (pode pedir login na conta Cloudinary)
4. Seleciona várias imagens de uma vez no Windows → confirma
5. Clica em **Publicar** e espera o deploy (~1–2 min)

## Deploy na Netlify

O arquivo [`netlify.toml`](netlify.toml) já define build (`npm run build`), pasta `dist` e redirects do SPA/`/admin`.

1. Suba o repositório no GitHub e conecte-o à [Netlify](https://app.netlify.com).
2. Faça o primeiro deploy.

### Ativar o CMS (Identity + Git Gateway)

Passos no painel da Netlify (uma vez):

1. **Site settings → Identity → Enable Identity**
2. Em **Registration**: escolha **Invite only**
3. Em **Services → Git Gateway → Enable Git Gateway**
4. **Identity → Invite users**: convide o e-mail da cliente
5. A cliente aceita o convite (link no e-mail), define a senha e acessa:
   `https://SEU-SITE.netlify.app/admin/`

Pronto: ela pode criar, editar e apagar imóveis, enviar fotos e publicar. Cada publicação gera um commit no Git e um novo deploy.

### Branch do Git

O Decap está configurado para a branch `main` em [`public/admin/config.yml`](public/admin/config.yml). Se o repositório usar `master`, altere o campo `backend.branch` nesse arquivo.
