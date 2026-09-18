"use client";

import { useId, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { ButtonEl } from "@/components/ui/Button";
import { MESSAGE_MAX, validateQuote, type QuoteErrors, type QuoteInput } from "@/lib/quote";
import { email as businessEmail, projectTypeOptions } from "@/lib/site";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "unconfigured" | "error";

const empty: QuoteInput = {
  name: "",
  phone: "",
  email: "",
  projectType: "",
  message: "",
  company: "",
};

const fieldClass =
  "min-h-12 w-full border bg-white px-4 py-3 text-[0.95rem] text-ink placeholder:text-mute/70 transition-colors focus:border-charcoal focus:outline-none";

export function QuoteForm() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("service") ?? "";
  const uid = useId();

  const [values, setValues] = useState<QuoteInput>({
    ...empty,
    projectType: projectTypeOptions.includes(preselected as never) ? preselected : "",
  });
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<Status>("idle");

  const set = (key: keyof QuoteInput, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (touched[key]) {
      setErrors(validateQuote({ ...values, [key]: value }));
    }
  };

  const blur = (key: keyof QuoteInput) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors(validateQuote(values));
  };

  const mailtoFallback = () => {
    const lines = [
      `Name: ${values.name}`,
      `Phone: ${values.phone}`,
      `Email: ${values.email}`,
      `Project type: ${values.projectType}`,
      "",
      values.message,
    ].join("\n");
    return `mailto:${businessEmail}?subject=${encodeURIComponent(
      `Quote request — ${values.projectType || "Aluminium project"}`,
    )}&body=${encodeURIComponent(lines)}`;
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found = validateQuote(values);
    setErrors(found);
    setTouched({
      name: true,
      phone: true,
      email: true,
      projectType: true,
      message: true,
    });

    if (Object.keys(found).length > 0) {
      const first = document.getElementById(`${uid}-${Object.keys(found)[0]}`);
      first?.focus();
      first?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        code?: string;
        errors?: QuoteErrors;
      };

      if (response.ok && data.ok) {
        setStatus("sent");
        setValues(empty);
        setTouched({});
        return;
      }

      if (response.status === 400 && data.errors) {
        setErrors(data.errors);
        setStatus("idle");
        return;
      }

      // 503 means the endpoint is fine but no mail provider is wired up yet.
      setStatus(data.code === "not_configured" ? "unconfigured" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="border border-line bg-shell p-8 sm:p-10">
        <CheckCircle2 size={28} className="text-red" aria-hidden />
        <h3 className="mt-5 text-xl font-bold tracking-tight text-ink">
          Thank you — your enquiry is on its way.
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-slate">
          We have your project details and will be in touch on the number and
          email you gave us.
        </p>
        <ButtonEl variant="outline" className="mt-7" onClick={() => setStatus("idle")}>
          Send Another Enquiry
        </ButtonEl>
      </div>
    );
  }

  const invalid = (key: QuoteField) => Boolean(touched[key] && errors[key]);

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="border border-line bg-white p-6 sm:p-8 lg:p-10"
    >
      <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
        Request a quote
      </h2>
      <span aria-hidden className="rule-brand mt-4 block" />
      <p className="mt-5 text-sm leading-relaxed text-slate">
        Tell us about the space and the work you need, and we will come back to
        you with a quote.
      </p>

      {/* Honeypot — visually hidden, never announced, never tabbable. */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-company`}>Company</label>
        <input
          id={`${uid}-company`}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(e) => set("company", e.target.value)}
        />
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field
          id={`${uid}-name`}
          label="Name"
          error={invalid("name") ? errors.name : undefined}
        >
          <input
            id={`${uid}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            onBlur={() => blur("name")}
            aria-invalid={invalid("name") || undefined}
            aria-describedby={invalid("name") ? `${uid}-name-error` : undefined}
            className={cn(fieldClass, invalid("name") ? "border-red" : "border-line")}
            placeholder="Your full name"
          />
        </Field>

        <Field
          id={`${uid}-phone`}
          label="Phone"
          error={invalid("phone") ? errors.phone : undefined}
        >
          <input
            id={`${uid}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            onBlur={() => blur("phone")}
            aria-invalid={invalid("phone") || undefined}
            aria-describedby={invalid("phone") ? `${uid}-phone-error` : undefined}
            className={cn(fieldClass, invalid("phone") ? "border-red" : "border-line")}
            placeholder="+263 …"
          />
        </Field>

        <Field
          id={`${uid}-email`}
          label="Email"
          error={invalid("email") ? errors.email : undefined}
          className="sm:col-span-2"
        >
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            onBlur={() => blur("email")}
            aria-invalid={invalid("email") || undefined}
            aria-describedby={invalid("email") ? `${uid}-email-error` : undefined}
            className={cn(fieldClass, invalid("email") ? "border-red" : "border-line")}
            placeholder="you@example.com"
          />
        </Field>

        <Field
          id={`${uid}-projectType`}
          label="Project Type"
          error={invalid("projectType") ? errors.projectType : undefined}
          className="sm:col-span-2"
        >
          <select
            id={`${uid}-projectType`}
            name="projectType"
            required
            value={values.projectType}
            onChange={(e) => set("projectType", e.target.value)}
            onBlur={() => blur("projectType")}
            aria-invalid={invalid("projectType") || undefined}
            aria-describedby={
              invalid("projectType") ? `${uid}-projectType-error` : undefined
            }
            className={cn(
              fieldClass,
              "appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20fill%3D%22none%22%20stroke%3D%22%235b646d%22%20stroke-width%3D%221.6%22%20d%3D%22m4%206%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px_16px] bg-[position:right_1rem_center] bg-no-repeat pr-11",
              invalid("projectType") ? "border-red" : "border-line",
            )}
          >
            <option value="">Select a project type</option>
            {projectTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field
          id={`${uid}-message`}
          label="Message"
          error={invalid("message") ? errors.message : undefined}
          className="sm:col-span-2"
          hint={`${values.message.length} / ${MESSAGE_MAX}`}
        >
          <textarea
            id={`${uid}-message`}
            name="message"
            rows={5}
            required
            maxLength={MESSAGE_MAX}
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            onBlur={() => blur("message")}
            aria-invalid={invalid("message") || undefined}
            aria-describedby={invalid("message") ? `${uid}-message-error` : undefined}
            className={cn(
              fieldClass,
              "min-h-36 resize-y",
              invalid("message") ? "border-red" : "border-line",
            )}
            placeholder="Tell us about the space, the openings and what you need."
          />
        </Field>
      </div>

      <ButtonEl
        type="submit"
        size="lg"
        className="mt-8 w-full sm:w-auto"
        disabled={status === "sending"}
      >
        {status === "sending" ? (
          <>
            <Loader2 size={16} className="animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          <>
            Request a Quote
            <Send size={15} aria-hidden />
          </>
        )}
      </ButtonEl>

      <div aria-live="polite">
        {status === "unconfigured" || status === "error" ? (
          <div className="mt-6 border border-line bg-shell p-5">
            <p className="flex gap-3 text-sm font-semibold text-ink">
              <AlertCircle size={18} className="mt-px shrink-0 text-red" aria-hidden />
              {status === "unconfigured"
                ? "Automatic sending isn't connected yet."
                : "That didn't send — the connection dropped."}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate">
              Nothing is lost. Send the same details straight to us by email, or
              call one of the numbers listed on this page.
            </p>
            <a
              href={mailtoFallback()}
              className="mt-5 inline-flex min-h-12 items-center justify-center bg-charcoal px-6 text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-ink"
            >
              Email This Enquiry Instead
            </a>
          </div>
        ) : null}
      </div>
    </form>
  );
}

type QuoteField = "name" | "phone" | "email" | "projectType" | "message";

function Field({
  id,
  label,
  error,
  hint,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label
          htmlFor={id}
          className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink"
        >
          {label}
        </label>
        {hint ? <span className="text-[0.68rem] text-mute tabular-nums">{hint}</span> : null}
      </div>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 flex gap-2 text-xs text-red">
          <AlertCircle size={13} className="mt-px shrink-0" aria-hidden />
          {error}
        </p>
      ) : null}
    </div>
  );
}
