"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

const Navbar = ({ username }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

  const [user] = useAuthState(auth);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [userSession, setUserSession] = useState(null);

  useEffect(() => {
    setIsClient(true);
    setUserSession(sessionStorage.getItem("user"));
  }, []);

  useEffect(() => {
    if (isClient && !user && !userSession) {
      router.push("/signup");
    }
  }, [isClient, user, userSession, router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  return (
    <nav className="w-full fixed top-0 left-0 right-0 z-20 h-[70px] shadow-xl bg-white">
      <div className="flex justify-between items-center h-full w-full px-4 lg:px-20">
        <Link href={"/"}>
          <Image
            src={"/logo.png"}
            width="50"
            height="55"
            className="rounded-sm"
            alt="Logo"
          />
        </Link>
        <div className="hidden sm:flex">
          <ul className="hidden sm:flex font-bold gap-x-8">
            {/* <Link
              href={"/"}
              className="flex hover:text-rose-700 transition ease-in-out duration-200">
              <Image
                src={"/About.png"}
                width={20}
                height={20}
                className="!w-6 !h-6"
                alt="About"
              />
              <li className="ml-2 text-base hover:border-b">About</li>
            </Link> */}
            {/* <Link
              href={"/"}
              className="flex hover:text-rose-700 transition ease-in-out duration-200">
              <Image
                src={"/Contact.png"}
                width={20}
                height={20}
                className="!w-6 !h-6"
                alt="Services"
              />
              <li className="ml-2 text-base hover:border-b">Services</li>
            </Link> */}
            <Link
              href={"/uploadFile"}
              className="flex hover:text-rose-700 text-black transition ease-in-out duration-200">
              <li className="ml-2 text-base hover:border-b text-black">
                {username}
              </li>
            </Link>
            {user ? (
              <Link
                href="/signup"
                className="flex text-rose-700 transition ease-in-out duration-200"
                onClick={handleLogout}>
                <li className="ml-2 text-base hover:border-b">Logout</li>
              </Link>
            ) : (
              <Link
                href="/signup"
                className="flex text-rose-700 transition ease-in-out duration-200">
                <li className="ml-2 text-base hover:border-b">SignUp</li>
              </Link>
            )}
            {/* <Link
              href={"/"}
              className="flex text-rose-700 transition ease-in-out duration-200"
              onClick={handleLogout}>
             
            </Link> */}
            {/* <Link className="p-3 text-rose-700" onClick={handleLogout} href={'/'}>
              Logout
            </Link> */}
          </ul>
        </div>
        <div onClick={handleNav} className="sm:hidden cursor-pointer pl-24">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
      </div>
      <div
        className={
          menuOpen
            ? "fixed left-0 top-0 z-20 w-[65%] sm:hidden h-[200px] bg-white p-10 transition ease-in-out duration-300 rounded-sm shadow-lg"
            : "fixed left-[-100%] z-20 top-0 p-10 ease-in duration-300"
        }>
        <div className="flex w-full items-center justify-end">
          <div onClick={handleNav} className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <div className="flex-col py-4">
          <ul className="font-bold">
            <Link
              href={"/about"}
              className="mb-4 flex hover:bg-zinc-300 hover:rounded-md py-3 px-2 transition ease-in-out duration-200">
              <Image
                src={"/About.png"}
                width={20}
                height={20}
                className="!w-6 !h-6"
                alt="About"
              />
              <li className="ml-10 text-base hover:border-b">About</li>
            </Link>
            <Link
              href={"/services"}
              className="flex hover:bg-zinc-300 hover:rounded-md py-3 px-2 transition ease-in-out duration-200">
              <Image
                src={"/Contact.png"}
                width={20}
                height={20}
                className="!w-6 !h-6"
                alt="Services"
              />
              <li className="ml-10 text-base hover:border-b">Services</li>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
