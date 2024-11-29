import { ReactNode } from "react";
import SettingsProviders from "../_components/Providers/SettingsProviders";

function Layout({ children }: { children: ReactNode }) {
  return <SettingsProviders>{children}</SettingsProviders>;
}

export default Layout;
