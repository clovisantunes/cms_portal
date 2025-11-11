#Git

## Folder Structure (general) ##

```bash
    src/
    │
    ├── assets/                 # Imagens, ícones, fontes
    │   └── logo.svg
    │
    ├── components/             # Componentes reutilizáveis
    │   ├── Navbar/
    │   │   ├── Navbar.tsx
    │   │   └── Navbar.scss
    │   ├── Footer/
    │   │   ├── Footer.tsx
    │   │   └── Footer.scss
    │   ├── Button/
    │   │   ├── Button.tsx
    │   │   └── Button.scss
    │   └── ...
    │
    ├── pages/                  # Páginas principais do portal
    │   ├── Home/
    │   │   ├── Home.tsx
    │   │   └── Home.scss
    │   ├── Agendamentos/
    │   │   ├── Agendamentos.tsx
    │   │   └── Agendamentos.scss
    │   ├── Pacientes/
    │   │   ├── Pacientes.tsx
    │   │   └── Pacientes.scss
    │   ├── Login/
    │   │   ├── Login.tsx
    │   │   └── Login.scss
    │   └── NotFound/
    │       ├── NotFound.tsx
    │       └── NotFound.scss
    │
    ├── context/                # Contextos globais (auth, tema, etc.)
    │   ├── AuthContext.tsx
    │   └── PatientContext.tsx
    │
    ├── hooks/                  # Hooks customizados
    │   ├── useAuth.ts
    │   ├── useFetch.ts
    │   └── usePatients.ts
    │
    ├── services/               # Integração com API / Firebase
    │   ├── api.ts              # Configuração base do Axios
    │   ├── patientService.ts   # Métodos para pacientes
    │   ├── appointmentService.ts
    │   └── authService.ts
    │
    ├── utils/                  # Funções auxiliares e validações
    │   ├── formatDate.ts
    │   ├── validateEmail.ts
    │   └── constants.ts
    │
    ├── styles/                 # Estilos globais
    │   ├── variables.scss
    │   ├── mixins.scss
    │   └── global.scss
    │
    ├── router/                 # Rotas do aplicativo
    │   └── AppRouter.tsx
    │
    ├── types/                  # Tipagens e interfaces globais
    │   ├── patient.d.ts
    │   ├── appointment.d.ts
    │   └── auth.d.ts
    │
    ├── App.tsx
    ├── main.tsx
    └── index.css
```