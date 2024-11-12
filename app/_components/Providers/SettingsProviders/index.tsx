import { CarbonFairProvider } from "carbonfair-ui";
import { ReactNode } from "react";

function SettingsProviders({ children }: { children: ReactNode }) {
  return <CarbonFairProvider>{children}</CarbonFairProvider>;
}

export default SettingsProviders;
