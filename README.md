# C. Leopolski — Site de Imóveis

SPA Vite + React com painel **Decap CMS** para a cliente editar imóveis sem tocar no código.

## Rodar localmente

**Pré-requisitos:** Node.js

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o site:
   ```bash
   npm run dev
   ```
3. Abra [http://localhost:3000](http://localhost:3000).

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
- Fotos enviadas pelo CMS ficam em [`public/uploads/`](public/uploads/)
- O site carrega os JSONs no build (`src/data/loadProperties.ts`)

Após publicar no painel em produção, a Netlify faz rebuild e o site atualiza em cerca de 1–2 minutos.

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
"# cleopolski" 
