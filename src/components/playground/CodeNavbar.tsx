import React from "react";
import { AiOutlineFullscreen, AiOutlineSetting } from "react-icons/ai";

type Props = {};

const CodeNavbar = (props: Props) => {
  return (
    <div className="flex items-center justify-between bg-dark-layer-2 h-11 w-full">
      <div className="flex items-center text-white">
        <button className="flex items-center text-white rounded text-left focus:outline-none bg-dark-fill-3 text-dark-label-2 hover:bg-dark-fill-2 px-2 py-1.5 font-medium">
          <div className="flex items-center px-1">
            <div className="text-xs text-label-2 dark:text-dark-label-2">
              Javascript
            </div>
          </div>
        </button>
      </div>

      <div className="flex items-center m-2">
        <button className={"codeNavBtns group"}>
          <div className="h-4 w-4 text-dark-gray-6 font-bold text-lg">
            <AiOutlineSetting />
          </div>
          <div className={"codeNavTooltip"}>Settings</div>
        </button>

        <button className={"codeNavBtns group"}>
          <div className="h-4 w-4 text-dark-gray-6 font-bold text-lg">
            <AiOutlineFullscreen />
          </div>
          <div className={"codeNavTooltip"}>Full Screen</div>
        </button>
      </div>
    </div>
  );
};

export default CodeNavbar;
