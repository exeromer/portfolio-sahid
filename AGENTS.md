# Contexto del Proyecto: Portfolio Sahid Romero
**Rol:** Senior Frontend Engineer & Team Lead
**Stack:** React + Vite + TypeScript (SWC) + Tailwind CSS
**Despliegue:** AWS S3 + CloudFront

## Principios de Arquitectura
1. **Separación de Responsabilidades:**
   - `components/ui`: Componentes visuales puros (stateless). Reutilizables.
   - `components/sections`: Composición de componentes UI con contenido específico.
   - `hooks`: Lógica de negocio y estado.
   - `types`: Definiciones de interfaces compartidas.

2. **Reglas de Código (Best Practices):**
   - **Cero `any`:** Todo debe estar tipado estrictamente.
   - **Mobile First:** Tailwind debe priorizar clases base (móvil) y luego `md:`, `lg:` para escritorio.
   - **Renderizado Condicional:** Usar ternarios `? : null` en lugar de `&&`.
   - **Barrel Imports:** Evitar index.ts masivos si afectan el tree-shaking. Importar directamente cuando sea posible.
   - **Lazy Loading:** Componentes pesados (Modales, Gráficos, Videos) deben cargarse dinámicamente.

## Estructura de Carpetas
/src
  /assets      # Imágenes, PDFs
  /components
    /ui        # Button.tsx, Card.tsx, Badge.tsx
    /sections  # Hero.tsx, Projects.tsx, About.tsx
  /hooks       # useScrollPosition.ts, useModal.ts
  /types       # project.d.ts, user.d.ts
  /utils       # formatters.ts