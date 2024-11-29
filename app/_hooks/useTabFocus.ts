import { useEffect, useState } from "react";

export const useTabFocus = () => {
  const [visible, setVisible] = useState(false);
  const [tabFocusCounter, setTabFocusCounter] = useState(0);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setVisible(true);
        setTabFocusCounter(tabFocusCounter + 1);
      } else {
        setVisible(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  });

  return { visible, tabFocusCounter };
};
