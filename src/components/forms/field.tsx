import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

const control =
  "w-full rounded-2xl border border-border-strong bg-white/[0.03] px-4 py-3.5 text-[15px] text-foreground placeholder:text-foreground/35 transition-colors duration-200 hover:border-white/25 focus:border-[var(--ring)] focus:bg-white/[0.05] focus:outline-none aria-[invalid=true]:border-danger/70";

type BaseProps = { label: string; name: string; error?: string; hint?: ReactNode; className?: string };

function Wrapper({ label, name, error, hint, className, children }: BaseProps & { children: ReactNode }) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={name} className="text-[13px] font-medium text-foreground/75">
        {label}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-foreground/45">{hint}</p>}
      {error && (
        <p id={`${name}-error`} role="alert" className="text-[13px] text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextField({ label, name, error, hint, className, ...props }: BaseProps & ComponentProps<"input">) {
  return (
    <Wrapper label={label} name={name} error={error} hint={hint} className={className}>
      <input
        id={name}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={control}
        {...props}
      />
    </Wrapper>
  );
}

export function TextArea({ label, name, error, hint, className, ...props }: BaseProps & ComponentProps<"textarea">) {
  return (
    <Wrapper label={label} name={name} error={error} hint={hint} className={className}>
      <textarea
        id={name}
        name={name}
        rows={5}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(control, "resize-y")}
        {...props}
      />
    </Wrapper>
  );
}

export function SelectField({
  label,
  name,
  error,
  hint,
  className,
  options,
  ...props
}: BaseProps & ComponentProps<"select"> & { options: readonly string[] }) {
  return (
    <Wrapper label={label} name={name} error={error} hint={hint} className={className}>
      <select
        id={name}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(control, "appearance-none bg-surface")}
        {...props}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </Wrapper>
  );
}
