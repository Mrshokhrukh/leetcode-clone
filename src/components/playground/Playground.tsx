import React, { useState } from "react";
import CodeNavbar from "./CodeNavbar";
import ReactCodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import Split from "react-split";
import EditorFooter from "./EditorFooter";
import { Problem } from "@/utils/problems/types/types";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { toast } from "react-toastify";
import { problems } from "@/utils/problems";
import { usePathname } from "next/navigation";

interface Props {
  problem: Problem;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const Playground: React.FC<Props> = ({ problem, setSuccess }) => {
  const [activeTestCase, setActiveTestCase] = useState<number>(0);
  const [userCode, setUserCode] = useState<string>(problem?.starterCode);
  const [user] = useAuthState(auth);
  let pathname = usePathname();
  const boilerPlate = `function twoSum(nums, target){
   // write your code here
};`;

  const handleSubmit = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 4000);
    if (!user) {
      alert("please login");
      return;
    }
    // try {
    //   const cb = new Function(`return ${userCode}`);
    //   let pid = pathname.slice(10, pathname.length);

    //   const success = problems[pid].handlerFunction(cb);

    //   if (success) {
    //     alert("all tests passed");
    //     setSuccess(true);
    //     setTimeout(() => {
    //       setSuccess(false);
    //     }, 4000);
    //   }
    // } catch (error) {
    //   alert("error");
    // }
  };
  const handleChange = (value: string) => {
    setUserCode(value);
  };

  return (
    <div className="flex flex-col bg-dark-layer-1 relative">
      <CodeNavbar />

      <Split
        className="h-[calc(100vh-94px)]"
        direction="vertical"
        sizes={[60, 40]}
        minSize={60}
      >
        <div className="w-full overflow-auto">
          <ReactCodeMirror
            value={boilerPlate}
            theme={vscodeDark}
            onChange={handleChange}
            extensions={[javascript()]}
            style={{ fontSize: 16 }}
          />
        </div>

        <div className="w-full px-5 overflow-auto">
          <div className="flex h-10 items-center space-x-6">
            <div className="relative flex h-full flex-col justify-center cursor-pointer">
              <div className="text-sm font-medium leading-5 text-white">
                Testcases
              </div>
              <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white" />
            </div>
          </div>

          <div className="flex">
            {problem?.examples.map((ex, i) => {
              return (
                <div
                  className="mr-2 item-start mt-2 text-white"
                  key={i}
                  onClick={() => setActiveTestCase(i)}
                >
                  <div className="flex flex-wrap items-center gap-y-4">
                    <div
                      className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
                        ${
                          activeTestCase === i ? "text-white" : "text-gray-400"
                        } 
                        `}
                    >
                      Case {i + 1}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="font-semibold my-4">
            <p className="text-sm font-medium mt-4 text-white">Input:</p>
            <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
              {problem?.examples[activeTestCase].inputText}
            </div>
            <p className="text-sm font-medium mt-4 text-white">Output:</p>
            <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
              {problem?.examples[activeTestCase].outputText}
            </div>
          </div>
        </div>
      </Split>

      <EditorFooter handleSubmit={handleSubmit} />
    </div>
  );
};

export default Playground;
