import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { loginAction, registerUserAction, logoutAction } from '@/actions/user';
import { useAuthStore } from '@/store/auth-store';
import type { RegisterFormData } from '@/configs/schemas/auth';
import { RoleEnum } from '@/types/user';

export function useLoginMutation() {
  const queryClient = useQueryClient();
  const fetchUser = useAuthStore(state => state.fetchUser);

  return useMutation({
    mutationFn: loginAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('Successfully logged in!');

      fetchUser();
    },
    onError: error => {
      toast.error(error.message);
    },
  });
}

export function useRegisterMutation() {
  const queryClient = useQueryClient();
  const fetchUser = useAuthStore(state => state.fetchUser);

  return useMutation({
    mutationFn: (data: RegisterFormData) => registerUserAction({ ...data, role: RoleEnum.USER }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('Successfully registered!');

      fetchUser();
    },
    onError: error => {
      toast.error(String(error));
    },
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();
  const logout = useAuthStore(state => state.logout);

  return useMutation({
    mutationFn: logoutAction,
    onSuccess: () => {
      logout();
      toast.success('You have been logged out!');
      queryClient.clear();
    },
    onError: error => {
      toast.error(String(error));
    },
  });
}
