"use server";

import { Provider } from "@supabase/supabase-js";
import { createClient } from "./supabase/server";
import { redirect } from "next/navigation";

const signInWith = (provider: Provider) => async () => {
  const supabase = await createClient();
  const auth_callback_url = `${process.env.NEXT_PUBLIC_SITEURL}/auth/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: auth_callback_url,
    },
  });

  if(error){
    console.log(error);
    
  }

  redirect(data?.url!)
};

const signInWithGoogle = signInWith("google");

export { signInWithGoogle };
