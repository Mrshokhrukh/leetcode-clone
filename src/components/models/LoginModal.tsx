import { authModalState } from "@/app/recoilContextProvider/RecoilContextProvider";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
type Props = {};

function LoginModal({}: Props) {
  const setModalState = useSetRecoilState(authModalState);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [inputs, setInputs] = useState({ email: "", password: "" });
  let router = useRouter();

  const handleClick = (type: "login" | "register" | "resetPassword") => {
    setModalState((prev) => ({ ...prev, type }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.email && !inputs.password) return toast.error("please fill");
    try {
      const newUser = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!newUser) {
        return;
      }
      toast.success("Login successfull", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      router.push("/");
      setInputs({ email: "", password: "" });
    } catch (error: any) {
      toast.error(error.message, {
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
      <h3 className="text-xl font-medium text-white">Sign in to leetCode</h3>
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
          onChange={handleChange}
          value={inputs.email}
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder:text-gray-400 text-white"
          placeholder="name@company.com"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Your Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          value={inputs.password}
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder:text-gray-400 text-white"
          placeholder="*****"
        />
      </div>
      <button
        className="w-full text-white focus:ring-blue-300 font-medium rounded-lg 
                    text-sm px-5 py-2.5 text-center bg-orange-500 hover:bg-orange-400
      "
      >
        {loading ? "Loading..." : "Login"}
      </button>
      <button
        className="flex w-full justify-end"
        onClick={() => handleClick("resetPassword")}
      >
        <Link
          href=""
          className="text-sm block text-orange-400 hover:underline w-full text-right"
        >
          Forgot Password ?
        </Link>
      </button>

      <div className="text-sm font-medium text-gray-300">
        Not Registered ?{" "}
        <Link
          href={""}
          className="text-blue-700 hover:underline"
          onClick={() => handleClick("register")}
        >
          Create Account
        </Link>
      </div>
    </form>
  );
}

export default LoginModal;
