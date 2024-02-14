import Navbar from "@/components/navbar/Navbar";
import WorkSpace from "@/components/workspace/WorkSpace";
import React from "react";

type Props = {};

const ProblemPage = ({ params }: { params: any }) => {
  // const { id } = ;
  return (
    <div>
      <Navbar problemPage />
      <WorkSpace />
    </div>
  );
};

export default ProblemPage;
