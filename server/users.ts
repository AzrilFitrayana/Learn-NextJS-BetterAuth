"use server";

import { auth } from "@/lib/auth";

// email and password
export const signIn = async (email: string, password: string) => {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return {
      success: true,
      message: "Login Success",
    };
  } catch (error) {
    console.log(error);
    const e = error as Error;

    return {
      success: false,
      message: e.message || "Invalid email or password",
    };
  }
};

export const signUp = async (email: string, password: string, name: string) => {
  try {
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
        callbackURL: "/login", // The redirect URL after verification
      },
    });

    return {
      success: true,
      message: "Sign up success",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Something went wrong",
    };
  }
};
