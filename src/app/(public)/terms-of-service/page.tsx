import { LegalPage, legalMetadata } from "@/components/shared/legal-page";

export const metadata = legalMetadata("terms-of-service");

export default function Page() {
  return <LegalPage slug="terms-of-service" />;
}
