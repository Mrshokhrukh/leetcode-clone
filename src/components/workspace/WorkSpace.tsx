"use client";

import React from "react";
import Split from "react-split";
import ProblemDescription from "../problemDescription/ProblemDescription";
import Playground from "../playground/Playground";

type Props = {};

const WorkSpace = (props: Props) => {
  return (
    <Split className="split">
      <ProblemDescription />
      <Playground />
    </Split>
  );
};

export default WorkSpace;
