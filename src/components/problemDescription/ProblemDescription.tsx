import { Problem } from "@/utils/problems/types/types";
import React from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";

type Props = {
  problem: Problem;
};

const ProblemDescription: React.FC<Props> = ({ problem }) => {
  return (
    <div className="bg-dark-layer-1">
      <div className="flex h-11 w-full items-center pt-2 bg-dark-layer-2 text-white overflow-x-hidden">
        <div
          className={`bg-dark-layer-1 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer`}
        >
          Description
        </div>
      </div>

      <div className="flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto overflow-x-hidden">
        <div className="px-5">
          <div className="w-full">
            <div className="flex space-x-4">
              <div className="flex-1 mr-2 text-lg text-white font-medium">
                {problem?.title}
              </div>
            </div>

            <div className="flex items-center mt-3">
              <div
                className={`text-olive bg-olive inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize`}
              >
                Easy
              </div>
              <div className="rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s">
                <BsCheck2Circle />
              </div>
              <div className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-dark-gray-6">
                <AiFillLike />
                <span className="text-xs">120</span>
              </div>
              <div className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-gray-6">
                <AiFillDislike />
                <span className="text-xs">2</span>
              </div>
              <div className="cursor-pointer hover:bg-dark-fill-3 rounded p-[3px] ml-4 text-xl transition-colors duration-200 text-green-s text-dark-gray-6">
                <TiStarOutline />
              </div>
            </div>
            {/* {'problem title para'} */}
            <div className="text-white text-sm">
              <div
                dangerouslySetInnerHTML={{
                  __html: problem?.problemStatement,
                }}
              />
            </div>
            {/* {'examples'} */}

            <div className="mt-4">
              {problem?.examples.map((ex, i) => {
                return (
                  <div key={i}>
                    <p className="font-medium text-white">Example {i + 1}: </p>
                    {ex.img && (
                      <img src={ex.img} alt="" className="mt-3 rounded" />
                    )}
                    <div className="example-card">
                      <pre>
                        <strong className="text-white">Input:</strong>{" "}
                        {ex.inputText} <br />
                        <strong>Output: </strong>
                        {ex.outputText} <br />
                        {ex.explanation && (
                          <>
                            <strong>Explanation:</strong> {ex.explanation}
                          </>
                        )}
                      </pre>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* {Constrains} */}

            <div className="my-7">
              <div className="text-white text-sm font-medium">Constrains:</div>
              <ul className="text-white ml-5 list-disc my-4">
                <div
                  dangerouslySetInnerHTML={{
                    __html: problem?.constraints,
                  }}
                />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDescription;
