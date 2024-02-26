"use client";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import Loading from "@/components/Loading/page";

const inputStyle = "p-2 border border-black rounded-md text-black";

export default function Login() {
  const { push } = useRouter();
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isPassInvalid, seIsPassInvalid] = useState<boolean>(false);
  const [invalidUser, setInvalidUser] = useState<boolean>(false);
  const [formData, setFormData] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value }: { name: string; value: string } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        username: formData.username,
        password: formData.password,
        redirect: false,
      });

      if (res?.error === "Invalid password") {
        seIsPassInvalid(true);
      } else if (res?.error === "Invalid user") {
        setInvalidUser(true);
      } else {
        setIsLogged(true);
      }
    } catch (error) {
      console.log("signIn had an error", error);
    }
  };

  useEffect(() => {
    if (isPassInvalid) {
      console.log("incalid..");
      setTimeout(() => {
        seIsPassInvalid(false);
      }, 1400);
    }
    if (invalidUser) {
      setTimeout(() => {
        setInvalidUser(false);
      }, 1400);
    }
    if (isLogged) {
      console.log("login..");
      setTimeout(() => {
        push("/Private");
      }, 5400);
    }
  }, [isPassInvalid, invalidUser, isLogged]);

  return (
    <section className="min-h-screen w-full flex justify-center items-center">
      <div
        id="register-box"
        className="bg-slate-100 flex flex-col gap-3 w-fit px-3 py-5 rounded-xl drop-shadow-xl "
      >
        {!isLogged ? (
          <>
            <div className="w-full flex flex-col items-center">
              <h1 className="text-center text-blue-500 font-bold text-3xl">
                RS
              </h1>
              <span className="text-gray-500 text-center">
                login into the system
              </span>
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="w-full relative">
                <input
                  className={`${inputStyle} ${
                    isPassInvalid && "border-orange-600"
                  }`}
                  name="username"
                  type="username"
                  placeholder="Username"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(e)
                  }
                />
                {invalidUser && <UserErrorMessage />}
              </div>

              <div className="w-full relative">
                <input
                  className={`${inputStyle} ${
                    isPassInvalid && "border-orange-600"
                  }`}
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(e)
                  }
                />
                {isPassInvalid && <PasswordErrorMessage />}
              </div>
            </div>
            <button
              className="w-fit py-2 px-3 rounded-md bg-blue-500 self-center text-white hover:opacity-[0.8] cursor-pointer"
              onClick={(e: any) => onSubmit(e)}
            >
              Login
            </button>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </section>
  );
}

const PasswordErrorMessage = () => {
  return (
    <div className="absolute w-full bottom-[-2em] bg-orange-500 text-white text-[12px] p-2 rounded-md rounded-tl-none rounded-tr-none z-50">
      <h1>Wrong password. Try it again</h1>
    </div>
  );
};

const UserErrorMessage = () => {
  return (
    <div className="absolute w-full bottom-[-2em] bg-orange-500 text-white text-[12px] p-2 rounded-md rounded-tl-none rounded-tr-none z-50">
      <h1>Invalid user. Try it again</h1>
    </div>
  );
};
