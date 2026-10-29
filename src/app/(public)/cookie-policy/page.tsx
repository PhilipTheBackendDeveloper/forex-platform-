import { LegalPage, legalMetadata } from "@/components/shared/legal-page";

export const metadata = legalMetadata("cookie-policy");

export default function Page() {
  return <LegalPage slug="cookie-policy" />;
}
