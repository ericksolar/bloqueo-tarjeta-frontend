import { useId, useState } from "react";
import { BrandLogo } from "../components/brand/BrandMark";
import Alert from "../components/ui/Alert";
import { LoadingOverlay } from "../components/ui/Loader";
import { getErrorMessage } from "../services/api";
import { login } from "../services/auth";
import { formatRut, isValidRut } from "../utils/rut";

const PASSWORD_MAX = 8;
const PASSWORD_MIN = 4;

function EyeIcon({ open }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
      {!open && <path d="M4 20 20 4" />}
    </svg>
  );
}

function Field({ id, label, error, helper, counter, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="text-[14px] font-medium leading-5 text-label"
      >
        {label}
      </label>
      {children}
      <div className="flex min-h-[18px] justify-between gap-2 text-[12px] leading-[18px]">
        <span
          id={`${id}-msg`}
          className={error ? "text-red-darker" : "text-label-secondary"}
        >
          {error || helper}
        </span>
        {counter && <span className="text-label-secondary">{counter}</span>}
      </div>
    </div>
  );
}

const inputBase =
  "h-12 w-full rounded-[4px] border bg-white px-4 text-[16px] leading-[22px] text-label outline-none transition-colors placeholder:text-disabled focus:border-brand-secondary focus:ring-2 focus:ring-brand-secondary/20";

export default function Login({ onLogin }) {
  const rutId = useId();
  const passId = useId();
  const [rut, setRut] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({ rut: false, password: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const rutValid = isValidRut(rut);
  const passwordValid = password.length >= PASSWORD_MIN;
  const rutError = touched.rut && rut && !rutValid ? "RUT inválido" : "";
  const passwordError =
    touched.password && password && !passwordValid
      ? `Debe tener entre ${PASSWORD_MIN} y ${PASSWORD_MAX} caracteres`
      : "";

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({ rut: true, password: true });
    if (!rutValid || !passwordValid) return;

    setLoading(true);
    setError("");
    try {
      const user = await login(rut, password);
      onLogin(user);
    } catch (err) {
      // 401 credenciales, 429 demasiados intentos, 422 RUT inválido: el backend envía el mensaje.
      setError(getErrorMessage(err, "El servicio no está disponible. Inténtalo nuevamente."));
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <header className="flex h-[60px] shrink-0 items-center bg-brand px-4 text-white sm:h-[72px] sm:px-8 lg:px-[92px]">
        <BrandLogo />
      </header>

      <main className="flex flex-1 items-start justify-center px-4 py-8 sm:items-center sm:py-12">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex w-full max-w-[400px] flex-col gap-6 rounded-[5px] border border-border bg-white p-5 shadow-card sm:p-8"
        >
          <div className="flex flex-col gap-1">
            <h1 className="text-[24px] font-bold leading-[30px] text-label">
              Bienvenido
            </h1>
            <p className="text-[14px] leading-5 text-label-secondary">
              Ingresa a tu Banco en línea
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Field id={rutId} label="Ingresa tu RUT" error={rutError}>
              <input
                id={rutId}
                type="text"
                inputMode="text"
                autoComplete="username"
                placeholder="Ej: 12345678-k"
                value={rut}
                onChange={(e) => setRut(formatRut(e.target.value))}
                onBlur={() => setTouched((t) => ({ ...t, rut: true }))}
                aria-invalid={Boolean(rutError)}
                aria-describedby={`${rutId}-msg`}
                className={`${inputBase} ${rutError ? "border-red-darker" : "border-border"}`}
              />
            </Field>

            <Field
              id={passId}
              label="Ingresa tu clave de Internet"
              error={passwordError}
              helper="Cantidad de caracteres"
              counter={`${password.length}/${PASSWORD_MAX}`}
            >
              <div className="relative">
                <input
                  id={passId}
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="•••••••"
                  maxLength={PASSWORD_MAX}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                  aria-invalid={Boolean(passwordError)}
                  aria-describedby={`${passId}-msg`}
                  className={`${inputBase} pr-12 ${passwordError ? "border-red-darker" : "border-border"}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Ocultar clave" : "Mostrar clave"}
                  className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-label-secondary hover:text-label"
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
            </Field>
          </div>

          {error && <Alert variant="error">{error}</Alert>}

          <button
            type="submit"
            disabled={!rutValid || !passwordValid || loading}
            className="flex h-12 w-full items-center justify-center rounded-[4px] bg-brand text-[14px] font-medium leading-5 text-white shadow-button transition-colors enabled:hover:bg-red-darker disabled:cursor-not-allowed disabled:bg-disabled-fill disabled:shadow-none"
          >
            Ingresar
          </button>
        </form>
      </main>

      {loading && <LoadingOverlay />}
    </div>
  );
}
