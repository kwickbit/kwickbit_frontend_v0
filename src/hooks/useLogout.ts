import { toast } from "react-toastify";
import { useMutationLogout } from "./auth";
import { UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

interface ReturnProps {
  handleLogout: () => void;
  logout: UseMutationResult<any, Error, void, unknown>;
}

const useLogout = (): ReturnProps => {
  const logout = useMutationLogout();
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = (): void => {
    logout.mutate(undefined, {
      onSuccess: () => {
        toast.success("Logged out successfully");
        queryClient.clear();
        router.push("/login");
      },
    });
  };

  return { handleLogout, logout };
};

export default useLogout;
