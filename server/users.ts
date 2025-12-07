"use server";

import { auth } from "@/lib/auth";

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

export const signUp = async () => {
  await auth.api.signUpEmail({
    body: {
      email: "lutung@email.com",
      password: "password",
      name: "Lutung",
    },
  });
};
