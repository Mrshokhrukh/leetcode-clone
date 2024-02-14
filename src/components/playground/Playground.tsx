import React from "react";
import CodeNavbar from "./CodeNavbar";
import ReactCodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import Split from "react-split";
type Props = {};

const Playground = (props: Props) => {
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
            value="/* try code here */"
            theme={vscodeDark}
            extensions={[javascript()]}
            style={{ fontSize: 16 }}
          />
        </div>

        <div >

        </div>
      </Split>
    </div>
  );
};

export default Playground;
