import React from "react";

type Props = {};

const ProblemPage = ({ params }: { params: any }) => {
  return <div> {params.problemId}</div>;
};

export default ProblemPage;
