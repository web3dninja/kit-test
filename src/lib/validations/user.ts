import {
  userCreateSchema,
  userUpdateSchema,
  type UserCreateFormData,
  type UserUpdateFormData,
} from '@/configs/schemas';
import { findUserByEmail, findUserByUsername } from '@/lib/firestore/users';

async function validateUniqueUser(
  email: string,
  username: string,
  excludeUserId?: number,
): Promise<void> {
  const existingUserByEmail = await findUserByEmail(email);
  if (existingUserByEmail && existingUserByEmail.id !== excludeUserId) {
    throw new Error('User with this email already exists');
  }

  const existingUserByUsername = await findUserByUsername(username);
  if (existingUserByUsername && existingUserByUsername.id !== excludeUserId) {
    throw new Error('User with this username already exists');
  }
}

export async function validateUserCreate(data: unknown): Promise<UserCreateFormData> {
  const validated = await userCreateSchema.parseAsync(data);
  await validateUniqueUser(validated.email, validated.username);
  return validated;
}

export async function validateUserUpdate(
  data: unknown,
  currentUserId?: number,
): Promise<UserUpdateFormData> {
  const validated = await userUpdateSchema.parseAsync(data);

  if (validated.email) {
    const existingUserByEmail = await findUserByEmail(validated.email);
    if (existingUserByEmail && existingUserByEmail.id !== currentUserId) {
      throw new Error('User with this email already exists');
    }
  }

  if (validated.username) {
    const existingUserByUsername = await findUserByUsername(validated.username);
    if (existingUserByUsername && existingUserByUsername.id !== currentUserId) {
      throw new Error('User with this username already exists');
    }
  }

  return validated;
}
