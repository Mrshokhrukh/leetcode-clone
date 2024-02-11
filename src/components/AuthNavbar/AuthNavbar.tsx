import { authModalState } from "@/app/recoilContextProvider/RecoilContextProvider";
import Link from "next/link";
import React from "react";
import { useSetRecoilState } from "recoil";
type Props = {};

function AuthNavbar({}: Props) {
  const setModalState = useSetRecoilState(authModalState);
  const handleClick = () => {
    setModalState((prev) => ({ ...prev, isOpen: true }));
  };

  return (
    <div className="flex items-center justify-between sm:px-12 px:2 md:px-24">
      <Link href="/" className="flex items-center justify-center h-20">
        <img src="/logo.png" alt="404" className="h-full" />
      </Link>
      <div className="flex items-center">
        <button
          className="bg-white rounded-lg px-6 py-1 hover:bg-slate-900 hover:text-cyan-300 transition duration-200 ease-linear"
          onClick={handleClick}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default AuthNavbar;
