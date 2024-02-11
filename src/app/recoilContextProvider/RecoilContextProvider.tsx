"use client";

import { RecoilRoot, atom } from "recoil";

type AuthModalState = {
  isOpen: boolean;
  type: "login" | "register" | "resetPassword";
};

const initialModalState: AuthModalState = {
  isOpen: false,
  type: "login",
};

export const authModalState = atom<AuthModalState>({
  key: "authModalState",
  default: initialModalState,
});

export default function RecoilContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
