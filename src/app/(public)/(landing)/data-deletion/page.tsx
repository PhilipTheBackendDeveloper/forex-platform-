import { LegalPage, legalMetadata } from "@/components/shared/legal-page";

export const metadata = legalMetadata("data-deletion");

export default function Page() {
  return <LegalPage slug="data-deletion" />;
}
