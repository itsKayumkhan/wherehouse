"use client";
import { useAuth } from "@/context/authContext";
import API from "@/lib/Api";
import ApiError from "@/lib/ApiError";
import { UserT } from "@/types/user";
import { useGoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const { token, getData } = useAuth();
  const router = useRouter();
  const [user, setUser] = useState<UserT>({
    email: "",
    password: "",
    name: "",
  });
  const handleGoogleLogin = async (authResponse: any) => {
    try {
      if (authResponse.code) {
        const { data } = await API.get(
          `api/googleLogin?code=${authResponse.code}`
        );
        if (data.success) {
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("user", JSON.stringify(data.data.user));
          getData();
          toast.success(data.message);

          router.push("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
        ApiError(error);
    }
  };
  const handelSignup = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/api/signup", user);
      console.log(data);
      if (data.success) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        toast.success(data.message);
        getData();
        router.push("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      ApiError(error);
    }
  };

  const handelUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handelGoogleLogin = useGoogleLogin({
    onSuccess: handleGoogleLogin,
    onError: handleGoogleLogin,
    flow: "auth-code",
  });

  useEffect(() => {
    if (!token) {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        getData();
      }
    } else {
      router.push("/");
    }
  }, [token, router, getData]);
  return (
    <>
      <section className="flex flex-col md:flex-row h-screen items-center">
        <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
          <Image
            src="https://picsum.photos/500/500"
            alt="Login image"
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className="bg-white w-full md:max-w-md lg:max-w-full md:mx-automd:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
      flex items-center justify-center"
        >
          <div className="w-full h-100">
            <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
              Create your account
            </h1>
            <form className="mt-6" onSubmit={handelSignup}>
              <div>
                <label className="block text-gray-700">User Name</label>
                <input
                  name="name"
                  onChange={handelUser}
                  value={user.name}
                  type="text"
                  placeholder="john"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  autoComplete="true"
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">Email Address</label>
                <input
                  name="email"
                  onChange={handelUser}
                  value={user.email}
                  type="email"
                  placeholder="john@abc.xyz"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  autoComplete="true"
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">Password</label>
                <input
                  name="password"
                  onChange={handelUser}
                  value={user.password}
                  type="password"
                  placeholder="******"
                  minLength={6}
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
              focus:bg-white focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
            px-4 py-3 mt-6"
              >
                Sign Up
              </button>
            </form>
            <hr className="my-6 border-gray-300 w-full" />
            <button
              onClick={handelGoogleLogin}
              type="button"
              className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
            >
              <div className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  className="w-6 h-6"
                  viewBox="0 0 48 48"
                >
                  <defs>
                    <path
                      id="a"
                      d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                    />
                  </defs>
                  <clipPath id="b">
                    <use xlinkHref="#a" overflow="visible" />
                  </clipPath>
                  <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
                  <path
                    clipPath="url(#b)"
                    fill="#EA4335"
                    d="M0 11l17 13 7-6.1L48 14V0H0z"
                  />
                  <path
                    clipPath="url(#b)"
                    fill="#34A853"
                    d="M0 37l30-23 7.9 1L48 0v48H0z"
                  />
                  <path
                    clipPath="url(#b)"
                    fill="#4285F4"
                    d="M48 48L17 24l-4-3 35-10z"
                  />
                </svg>
                <span className="ml-4">Log in with Google</span>
              </div>
            </button>

            <p className="mt-8">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Login now
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
