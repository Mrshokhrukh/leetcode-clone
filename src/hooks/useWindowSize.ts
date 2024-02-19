import React, { useEffect, useState } from "react";

const useWindowSize = () => {
  const [windowResize, setWindowResize] = useState({
    width: 1200,
    height: 800,
  });

  function changeSize() {
    setWindowResize({ width: window.innerWidth, height: window.innerHeight });
  }

  useEffect(() => {
    changeSize();
    window.addEventListener("resize", changeSize);

    return () => {
      window.removeEventListener("resize", changeSize);
    };
  }, []);

  return windowResize;
};
export default useWindowSize;
