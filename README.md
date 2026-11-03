# bloqueo-tarjeta-frontend

Frontend de **Bloqueo / desbloqueo de tarjetas** de crédito y débito, implementado desde un diseño en Figma.

React 19 · Vite · Tailwind CSS v4 · responsive (móvil, tablet y escritorio).

## Funcionalidades

- **Login** con RUT (validación módulo 11) y clave de Internet.
- **Inicio:** tarjetas de crédito (cupo disponible) y débito (saldo disponible).
- **Bloqueo temporal / desbloqueo.** El desbloqueo requiere PassBanco.
- **Administra tus bloqueos:** pagos presenciales, por internet y cajeros.
- **Bloqueo y reemplazo** (bloqueo definitivo):
  - motivo → región y sucursal → confirmación → comprobante descargable en PDF;
  - después del bloqueo se puede volver a ver el comprobante.
- **Sesión** con cookies httpOnly. Se renueva sola con un refresh token.

## Requisitos

- Node.js 20 o superior.
- El backend [bloqueo-tarjetas-backend](../bloqueo-tarjetas-backend) (FastAPI) corriendo en `http://localhost:8000`.

## Puesta en marcha

```bash
npm install
npm run dev        # http://localhost:5173
```

En desarrollo, Vite reenvía `/api` al backend (ver `vite.config.js`).
Para otra URL de API, define `VITE_API_URL` (por ejemplo, `https://mi-api.com/api/v1`).

### Usuarios de prueba (clave `1234`)

| RUT | Caso |
|---|---|
| 11.111.111-1 | Con PassBanco: puede bloquear y desbloquear |
| 22.222.222-2 | Sin PassBanco: puede bloquear, pero no desbloquear |

## Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Sirve el build |
| `npm run lint` | ESLint |

## Estructura

```
src/
  components/   UI (botones, alertas, modal, tarjetas), layout y marca
  pages/        Login, Dashboard, CardList, BlockOptions, TemporaryBlock, ReplaceBlock, ReceiptPage
  services/     api.js (fetch + refresh token), auth, cards, adapters (snake_case → camelCase)
  data/         textos fijos (motivos de bloqueo, tipos de bloqueo)
  utils/        RUT, fechas, moneda CLP, generador de PDF
```
