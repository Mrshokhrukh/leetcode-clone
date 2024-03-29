"use client";
import { auth } from "@/firebase/firebase";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Logout from "../buttons/Logout";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/app/recoilContextProvider/RecoilContextProvider";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import Timer from "../Timer/Timer";
import { useRouter, usePathname } from "next/navigation";
import { problems } from "@/utils/problems";
import { Problem } from "@/utils/problems/types/types";

type Props = {
  problemPage?: boolean;
};

function Navbar({ problemPage }: Props) {
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);
  const router = useRouter();
  const pathname = usePathname();
  const handleClick = () => {
    setAuthModalState((prev) => ({ ...prev, isOpen: true, type: "login" }));
  };

  const handleProblemChange = (isForward: boolean) => {
    let id = pathname.slice(10, pathname.length);
    const { order } = problems[id as string] as Problem;
    const diraction = isForward ? 1 : -1;
    const nextProb = order + diraction;
    const nextProbKey = Object.keys(problems).find((key) => {
      return problems[key].order === nextProb;
    });
    
    if (isForward && !nextProbKey) {
      const firstProbKey = Object.keys(problems).find((key) => {
        return problems[key].order === 1;
      });
      router.push(`/problems/${firstProbKey}`);
    } else if (!isForward && !nextProbKey) {
      const lastProbKey = Object.keys(problems).find((key) => {
        return problems[key].order === Object.keys(problems).length;
      });
      router.push(`/problems/${lastProbKey}`);
    } else {
      router.push(`/problems/${nextProbKey}`);
    }
  };

  return (
    <nav className="relative flex h-[50px] w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7 ">
      <div
        className={`flex w-full items-center justify-between ${
          problemPage ? "max-w-[1200px] mx-auto" : "px-[25px]"
        }`}
      >
        <Link href="/" className="h-[22px] flex-1">
          <img src="/logo-full.png" alt="" className="h-full" />
        </Link>

        {problemPage && (
          <div className="flex item-center gap-4 flex-1 justify center">
            <div
              className="flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer"
              onClick={() => handleProblemChange(false)}
            >
              <FaChevronLeft />
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 font medium max-w-[170px] text-dark-gray-8 cursor-pointer"
            >
              <div>
                <BsList />
              </div>
              <p>ProblemList</p>
            </Link>

            <div
              className="flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer"
              onClick={() => handleProblemChange(true)}
            >
              <FaChevronRight />
            </div>
          </div>
        )}

        <div className="flex items-center space-x-4 flex-1 justify-end">
          <div>
            <a
              href=""
              target="_blank"
              rel="noreferrer"
              className="bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange hover:bg-dark-fill-2"
            >
              Premium
            </a>
          </div>
          {user && problemPage && <Timer />}
          {!user ? (
            <Link href="/auth" onClick={handleClick}>
              <button className="bg-dark-fill-3 py-1 px-2 cursor-pointer rounded">
                Sign In
              </button>
            </Link>
          ) : (
            <div className="cursor-pointer group relative">
              <img src="/avatar.png" alt="" className="h-8 w-8 rounded-full" />
              <div className="absolute top-10 left-2/4 -translate-x-2/4 mx-auto bg-dark-layer-1 text-brand-orange p-2 rounded shadow-lg z-40 group-hover:scale-100 scale-0 transition-all duration-300 ease-in-out">
                <p className="text-sm">{user.email}</p>
              </div>
            </div>
          )}
          {user && <Logout />}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
