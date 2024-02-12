import { auth } from "@/firebase/firebase";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
type Props = {};

function ResetPassword({}: Props) {
  const [email, setEmail] = useState("");
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await sendPasswordResetEmail(email);

    if (success) {
      toast.success("password reset sent email", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    }
  }, [error]);

  return (
    <form className="space-y-6 px-6 py-4" onSubmit={handleSubmit}>
      <h3 className="text-xl font-medium text-white">Reset Password</h3>
      <p className="text-sm text-white">
        Forgot your password ? Enter your email address below, and reset your
        Password !
      </p>
      <div>
        <label
          htmlFor="email"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Your Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder:text-gray-400 text-white"
          placeholder="example@gmail.com"
        />
      </div>
      <button
        className="w-full text-white focus:ring-blue-300 font-medium rounded-lg 
                  text-sm px-5 py-2.5 text-center bg-orange-500 hover:bg-orange-400
    "
      >
        Reset Password
      </button>
    </form>
  );
}

export default ResetPassword;
