import React, { useEffect, useState } from "react";

const useWindowSize = () => {
  const [windowResize, setWindowResize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  function changeSize() {
    setWindowResize({ width: window.innerWidth, height: window.innerHeight });
  }

  useEffect(() => {
    window.addEventListener("resize", changeSize);

    return () => {
      window.removeEventListener("resize", changeSize);
    };
  }, []);

  return windowResize;
};
export default useWindowSize;
