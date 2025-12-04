import { RoleEnum, User, UserWithPassword } from '@/types/user';

export function userInitials(username: string) {
  return username
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function firestoreToUser(
  id: string,
  data: any,
  includePassword: boolean = false,
): User | UserWithPassword {
  const baseUser = {
    id: parseInt(id, 10) || 0,
    username: data.username || '',
    email: data.email || '',
    role: data.role || RoleEnum.USER,
  };

  if (includePassword) {
    return {
      ...baseUser,
      password: data.password || '',
    };
  }

  return baseUser;
}
