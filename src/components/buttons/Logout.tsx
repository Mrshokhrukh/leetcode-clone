import React from "react";
import { FiLogOut } from "react-icons/fi";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
type LogOutProps = {};

const Logout = (props: LogOutProps) => {
  const [signOut, loading, error] = useSignOut(auth);
  const handleLogOut = () => {
    signOut();
  };

  return (
    <button
      className="bg-dark-fill-3 py-1.5
     px-2 cursor-pointer rounded text-brand-orange"
      onClick={handleLogOut}
    >
      <FiLogOut />
    </button>
  );
};

export default Logout;
