import { LegalPage, legalMetadata } from "@/components/shared/legal-page";

export const metadata = legalMetadata("refund-policy");

export default function Page() {
  return <LegalPage slug="refund-policy" />;
}
