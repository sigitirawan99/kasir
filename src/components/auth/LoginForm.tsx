"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const LoginFormSchema = z.object({
  email: z.string().email("Masukan email yang valid"),
  password: z.string().min(6, "Kata sandi minimal 6 karakter"),
});

type LoginFormSchema = z.infer<typeof LoginFormSchema>;

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const form = useForm<LoginFormSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginFormSchema),
  });

  const { handleSubmit, control } = form;
  const { push } = useRouter();

  const onSubmit = handleSubmit((data) => {
    setError(false);
    setLoading(true);
    api
      .post("/auth/sign-in/email", data, {
        fetchOptions: { credentials: "omit" },
      })
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("token", token);
        push("/organizations");
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
        console.error(err);
      });
  });

  return (
    <Form {...form}>
      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Masukan email anda"
                  className="rounded-xs"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kata Sandi</FormLabel>
              <FormControl>
                <Input
                  placeholder="Masukan kata sandi anda"
                  className="rounded-xs"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Link href="/reset-password">
          <p className="text-end text-sm text-black hover:text-gray-700 mb-5">
            Lupa kata sandi?
          </p>
        </Link>
        {error && (
          <p className="text-sm bg-red-50 rounded-md p-3 text-red-500">
            Username atau password salah
          </p>
        )}
        <Button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer"
        >
          {loading ? "Loading..." : "Masuk"}
        </Button>
      </form>
    </Form>
  );
};
