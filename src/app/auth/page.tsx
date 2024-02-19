"use client";
import AuthNavbar from "@/components/AuthNavbar/AuthNavbar";
import AuthModal from "@/components/models/AuthModal";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { authModalState } from "../recoilContextProvider/RecoilContextProvider";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/navigation";
type Props = {};

function Authpage({}: Props) {
  let router = useRouter();
  const authModal = useRecoilValue(authModalState);
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (user) router.push("/");
  }, [user]);

  // if (isLoading) {
  //   return null;
  // }

  return (
    <div className="bg-gradient-to-b from-gray-600 to-black h-screen relative">
      <div className="max-w-7xl mx-auto">
        <AuthNavbar />
        <div className="flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none">
          <img src="/hero.png" alt="" />
        </div>

        {authModal.isOpen && <AuthModal />}
      </div>
    </div>
  );
}

export default Authpage;
