import { projectTypeOptions, type ProjectTypeOption } from "./site";

export type QuoteInput = {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  message: string;
  /** Hidden field. Real visitors leave it empty; bots fill it. */
  company?: string;
};

export type QuoteField = "name" | "phone" | "email" | "projectType" | "message";
export type QuoteErrors = Partial<Record<QuoteField, string>>;

/** Loose on purpose: local and international formats both have to pass. */
const PHONE = /^[+]?[\d\s().-]{7,20}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * One validator, imported by both the form and the API route, so the browser
 * and the server can never disagree about what a valid enquiry looks like.
 */
export function validateQuote(input: Partial<QuoteInput>): QuoteErrors {
  const errors: QuoteErrors = {};
  const name = (input.name ?? "").trim();
  const phone = (input.phone ?? "").trim();
  const email = (input.email ?? "").trim();
  const projectType = (input.projectType ?? "").trim();
  const message = (input.message ?? "").trim();

  if (name.length < 2) errors.name = "Please enter your name.";
  else if (name.length > 80) errors.name = "Please keep your name under 80 characters.";

  if (!phone) errors.phone = "Please enter a phone number we can reach you on.";
  else if (!PHONE.test(phone)) errors.phone = "Please enter a valid phone number.";

  if (!email) errors.email = "Please enter your email address.";
  else if (!EMAIL.test(email)) errors.email = "Please enter a valid email address.";
  else if (email.length > 160) errors.email = "That email address is too long.";

  if (!projectType) errors.projectType = "Please choose a project type.";
  else if (!projectTypeOptions.includes(projectType as ProjectTypeOption))
    errors.projectType = "Please choose one of the listed project types.";

  if (message.length < 10)
    errors.message = "Please tell us a little about the project (10 characters or more).";
  else if (message.length > 2000)
    errors.message = "Please keep the message under 2000 characters.";

  return errors;
}

export const MESSAGE_MAX = 2000;
