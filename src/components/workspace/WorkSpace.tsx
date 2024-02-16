"use client";

import React from "react";
import Split from "react-split";
import ProblemDescription from "../problemDescription/ProblemDescription";
import Playground from "../playground/Playground";
import { Problem } from "@/utils/problems/types/types";

type Props = {
  problem: Problem;
};

const WorkSpace: React.FC<Props> = ({ problem }) => {
  return (
    <Split className="split">
      <ProblemDescription problem={problem} />
      <Playground problem={problem} />
    </Split>
  );
};

export default WorkSpace;
