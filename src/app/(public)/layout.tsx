import { HelpLauncher } from "@/components/layout/help-launcher";

/** Every public page gets the assistant launcher; headers/footers are chosen by the nested groups. */
export default function PublicLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      {children}
      <HelpLauncher />
    </>
  );
}
