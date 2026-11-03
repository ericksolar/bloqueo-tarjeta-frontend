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

Los datos los carga el backend con `py -m app.seed` (ver `app/seed.py`). Todos son ficticios.

Usuarios base: tienen las 4 tarjetas (9911, 9712, 1719, 3020), todas activas.

| RUT | Nombre | PassBanco | Uso |
|---|---|---|---|
| 9.935.747-9 | Andrea Bustos | Sí | Flujo 1: puede bloquear y desbloquear |
| 8.954.597-8 | Bruno Castro | No | Flujo 2: puede bloquear, pero no desbloquear |

Usuarios con escenarios: tarjetas en distintos estados, con historial y comprobantes.

| RUT | Nombre | PassBanco | Tarjetas |
|---|---|---|---|
| 16.021.673-5 | Camila Rojas Fuentes | Sí | 4532 activa, sin compras por internet · 7781 bloqueada temporalmente · 2290 bloqueo definitivo (robo, op. 40217733) · 6158 adicional |
| 5.649.759-5 | Diego Muñoz Soto | No | 6604 bloqueada temporalmente (no puede desbloquear) · 1185 sin cajeros ni pagos presenciales · 3347 adicional con bloqueo definitivo (deterioro, op. 71590264) |
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
