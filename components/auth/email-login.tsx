"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
});

export default function LoginWithEmail() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function signInWithEmail(data: z.infer<typeof formSchema>) {
    const signInResult = await signIn("email", {
      email: data.email,
      callbackUrl: `${window.location.origin}`,
      redirect: false,
    });

    if (!signInResult?.ok) {
      return toast({
        title: "Well this did not work...",
        description: "Something went wrong, please try again",
        variant: "destructive",
      });
    }

    return toast({
      title: "Check your email",
      description: "A magic link has been sent to you",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(signInWithEmail)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" placeholder="name@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Login with Email
        </Button>
      </form>
    </Form>
  );
}
