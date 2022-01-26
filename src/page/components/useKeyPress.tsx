import { useEffect } from "react";

// Hook
function useKeyPress(targetKey: string, action: () => void): void {
  const pressHandler = ({ key }: KeyboardEvent): void => {
    if (key === targetKey) {
      action();
    }
  };

  useEffect(() => {
    window.addEventListener("keyup", pressHandler, false);

    return () => {
      window.removeEventListener("keyup", pressHandler, false);
    };
  }, []);
}

export default useKeyPress;
