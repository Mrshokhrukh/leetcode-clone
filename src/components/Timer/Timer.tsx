import React, { useEffect, useState } from "react";
import { PiTimerBold } from "react-icons/pi";
import { FiRefreshCcw } from "react-icons/fi";

type Props = {};

const Timer = (props: Props) => {
  const [showTimer, setShowTimer] = useState(false);
  const [time, setTime] = useState(0);

  const formatTime = (time: number): string => {
    const h = Math.floor(time / 3600);
    const m = Math.floor((time % 3600) / 60);
    const s = time % 60;
    return `${h < 10 ? "0" + h : h}:${m < 10 ? "0" + m : m}:${
      s < 10 ? "0" + s : s
    }`;
  };
  const handleClick = () => {
    setShowTimer(true);
  };

  useEffect(() => {
    let inv: NodeJS.Timeout;
    if (showTimer) {
      inv = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    }
    return () => clearInterval(inv);
  }, [showTimer]);

  return (
    <div>
      {showTimer ? (
        <div className="flex items-center space-x-2 bg-dark-fill-3 p-1.5 cursor-pointer rounded hover:bg-dark-fill-2">
          <div>{formatTime(time)}</div>
          <FiRefreshCcw
            onClick={() => {
              setTime(0);
              setShowTimer(false);
            }}
          />
        </div>
      ) : (
        <div
          className="flex items-center p-1 h-8 hover:bg-dark-fill-3 rounded cursor-pointer"
          onClick={handleClick}
        >
          <PiTimerBold fontSize={28} />
        </div>
      )}
    </div>
  );
};

export default Timer;
