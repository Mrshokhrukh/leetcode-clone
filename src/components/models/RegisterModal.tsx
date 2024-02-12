import { authModalState } from "@/app/recoilContextProvider/RecoilContextProvider";
import { set } from "firebase/database";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { auth } from "@/firebase/firebase";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
type Props = {};

function RegisterModal({}: Props) {
  const setModalState = useSetRecoilState(authModalState);
  const [inputs, setInputs] = useState({ email: "", name: "", password: "" });
  let router = useRouter();
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleClick = (type: "login" | "register" | "resetPassword") => {
    setModalState((prev) => ({ ...prev, type }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.email && !inputs.password && !inputs.name)
      return alert("please fill");
    try {
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!newUser) {
        return;
      }
      toast.success("Registered successfully", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      router.push("/");
      setInputs({ email: "", name: "", password: "" });
    } catch (error: any) {
      console.log(error);
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
      <h3 className="text-xl font-medium text-white">SignUp to leetCode</h3>
      <div>
        <label
          htmlFor="name"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Your Name
        </label>
        <input
          type="name"
          name="name"
          id="name"
          value={inputs.name}
          onChange={handleChange}
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder:text-gray-400 text-white"
          placeholder="John Doe"
        />
      </div>
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
          value={inputs.email}
          onChange={handleChange}
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
          value={inputs.password}
          onChange={handleChange}
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder:text-gray-400 text-white"
          placeholder="*****"
        />
      </div>
      <button
        className="w-full text-white focus:ring-blue-300 font-medium rounded-lg 
                    text-sm px-5 py-2.5 text-center bg-orange-500 hover:bg-orange-400
      "
      >
        {loading ? "Loading..." : "Register"}
      </button>

      <div className="text-sm font-medium text-gray-300">
        Already have an account ?{" "}
        <Link
          href={""}
          className="text-blue-700 hover:underline"
          onClick={() => handleClick("login")}
        >
          Sign in
        </Link>
      </div>
    </form>
  );
}

export default RegisterModal;
