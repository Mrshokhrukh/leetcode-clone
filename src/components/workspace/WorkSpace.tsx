"use client";

import React, { useState } from "react";
import Split from "react-split";
import ProblemDescription from "../problemDescription/ProblemDescription";
import Playground from "../playground/Playground";
import { Problem } from "@/utils/problems/types/types";
import Confetti from "react-confetti";
import useWindowSize from "@/hooks/useWindowSize";

type Props = {
  problem: Problem;
};

const WorkSpace: React.FC<Props> = ({ problem }) => {
  const { width, height } = useWindowSize();
  const [success, setSuccess] = useState(false);

  return (
    <Split className="split">
      <ProblemDescription problem={problem} />
      <div className="bg-dark-fill-2">
        <Playground problem={problem} setSuccess={setSuccess} />
        {success && (
          <Confetti
            gravity={0.3}
            tweenDuration={4000}
            width={width}
            height={height}
          />
        )}
      </div>
    </Split>
  );
};

export default WorkSpace;
