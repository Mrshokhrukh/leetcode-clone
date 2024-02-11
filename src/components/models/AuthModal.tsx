import React from "react";
import { IoClose } from "react-icons/io5";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import ResetPassword from "./ResetPassword";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authModalState } from "@/app/recoilContextProvider/RecoilContextProvider";
type Props = {};

function AuthModal({}: Props) {
  const authModal = useRecoilValue(authModalState);
  const setModalState = useSetRecoilState(authModalState);
  const handleClick = () => {
    setModalState((prev) => ({ ...prev, isOpen: false, type: "login" }));
  };
  return (
    <>
      <div
        className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60"
        onClick={handleClick}
      ></div>
      <div className="w-full sm:w-[450px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-center items-center">
        <div className="relative w-full mx-auto flex items-center justify-center">
          <div className="bg-white rounded-lg shadow relative w-full bg-gradient-to-b from-orange-400 to-slate-900 mx-6">
            <div className="flex justify-end p-2">
              <button
                type="button"
                className="bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white text-white"
                onClick={handleClick}
              >
                <IoClose className="h-5 w-5" />
              </button>
            </div>

            {authModal.type === "login" ? (
              <LoginModal />
            ) : authModal.type === "register" ? (
              <RegisterModal />
            ) : (
              <ResetPassword />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthModal;
