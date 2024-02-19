"use client";
import React from "react";
import Navbar from "@/components/navbar/Navbar";
import WorkSpace from "@/components/workspace/WorkSpace";
import { problems } from "@/utils/problems";
import { Problem } from "@/utils/problems/types/types";
import { useEffect, useState } from "react";

type Props = {
  params: { problemId: string };
};

const ProblemPage: React.FC<Props> = ({ params }) => {
  const [currentProblem, setProblem] = useState<Problem | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { problemId } = params;
      const problemData = problems[problemId];
      if (!problemData) {
        return;
      }

      problemData.handlerFunction = problemData.handlerFunction.toString();
      setProblem(problemData);
    };

    fetchData();
  }, [currentProblem]);

  return (
    <div>
      <Navbar problemPage />
      <WorkSpace problem={currentProblem} />
    </div>
  );
};

// export async function getStaticProps({
//   params,
// }: {
//   params: { problemId: string };
// }) {
//   const { problemId } = params;

//   const problem = problems[problemId];

//   if (!problem) {
//     return { notFound: true };
//   }

//   problem.handlerFunction = problem.handlerFunction.toString();

//   return {
//     props: {
//       problem,
//     },
//   };
// }

export default ProblemPage;
