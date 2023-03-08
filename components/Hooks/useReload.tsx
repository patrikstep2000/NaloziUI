import { useState } from "react";

export const useReload = () => {
  const [isReload, setReload] = useState(0);
  const reload = () => {
    setReload((val) => val + 1);
  };
  return { isReload, reload };
};
