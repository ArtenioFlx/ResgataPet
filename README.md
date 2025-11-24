# ResgataPet – Frontend

Projeto frontend da **RESGATAPET**, uma plataforma voltada para o cadastro, visualização e gerenciamento de **ONGs**, **pets resgatados**, além de funcionalidades de login, recuperação de senha e dashboard interativa.

Este repositório contém a interface construída em **Vue 3**, utilizando **Composition API**, **Vue Router**, **TailwindCSS + DaisyUI** e integração com **IndexedDB** para armazenamento local.

---

## Tecnologias Utilizadas

* **Vue 3 (Composition API)**
* **Vue Router**
* **TailwindCSS**
* **DaisyUI**
* **IndexedDB**
* **JavaScript ES Modules**

---

## Estrutura do Projeto

```
src/
├── assets/             # Arquivos estáticos (CSS global, imagens)
├── components/         # Componentes reutilizáveis (NavBar, Footer, PerfilForm)
├── controllers/        # Camada de controle/regras de negócio (ex: petsController)
├── data/               # Camada de persistência (db.js, repositories)
├── layouts/            # Layouts globais (layoutDefault.vue)
├── router/             # Definição das rotas (index.js)
├── services/           # Camada de serviço (API de dados)
├── utils/              # Funções utilitárias e helpers (ex: imageUtils.js)
└── views/              # Páginas da aplicação
    ├── Auth/           # Telas de Autenticação (Login, Cadastro, Recuperação)
    ├── Ongs/           # Módulo de ONGs
    ├── Pet/            # Módulo de Pets
    ├── tutors/         # Módulo de Tutores
    └── MinhaConta.vue  # Perfil do Usuário
```

---

## Instalação e Execução

1. **Instale as dependências**

```bash
npm install
```

2. **Execute o servidor de desenvolvimento**

```bash
npm run dev
```

3. Acesse:

```
http://localhost:5173
```

---

## Banco de Dados (IndexedDB)

O projeto usa IndexedDB para armazenar:

* ONGs
* Pets
* Usuários (opcional dependendo da versão)
* Dados apresentados no Dashboard

Toda a lógica de criação, leitura, atualização e remoção está centralizada em:

```
src/db/indexedDB.js
```

Cada módulo (ONGs e Pets) possui sua camada de **service** e **controller**, mantendo a arquitetura organizada.

---

## Arquitetura

O projeto segue uma estrutura organizada em **3 camadas**:

### **Service**

Regras de negócio e chamadas ao banco.

### **Controller**

Valida dados e expõe funções usadas nas views.

### **Views (Vue Components)**

Interface com o usuário.

---

## Autenticação

O sistema contém:

* Login simples (demonstrativo)
* Recuperação de senha (mock)
* Redirecionamentos configurados via Vue Router

---

## Dashboard

A Dashboard exibe:

* Total de pets cadastrados
* Total de ONGs
* Dados estatísticos lidos via IndexedDB

---

## Estilo

* **TailwindCSS** para utilitários
* **DaisyUI** para componentes prontos (botões, inputs, cards)
* Tema configurado em `tailwind.config.js`

---

## Scripts úteis

| Comando           | Função                                |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Executa o servidor de desenvolvimento |
| `npm run build`   | Gera a versão final para produção     |
| `npm run preview` | Pré-visualiza o build                 |

## Licença

Este projeto é de uso interno para fins educacionais e demonstração.



