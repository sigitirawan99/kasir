import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user?: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  };
}

export function useLogin() {
  const router = useRouter();
  const { setToken, setUser } = useAuthStore();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await api.post<LoginResponse>(
        "/auth/sign-in/email",
        credentials,
        {
          fetchOptions: { credentials: "omit" },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      setToken(data.token);
      if (data.user) {
        setUser(data.user);
      }
      router.push("/organizations");
    },
  });
}
