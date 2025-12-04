'use server';

import { hashPassword, verifyPassword } from '@/utils/auth';
import { createSession, getCurrentUser, destroySession } from '@/utils/session';
import { createUser, findUserByEmail } from '@/lib/firestore/users';
import { validateRegister, validateLogin } from '@/lib/validations';
import { type User, RoleEnum } from '@/types/user';

export async function getCurrentUserAction(): Promise<User | null> {
  try {
    return await getCurrentUser();
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function registerUserAction(data: unknown) {
  try {
    const validated = await validateRegister(data);

    const hashedPassword = await hashPassword(validated.password);

    const user = await createUser({
      username: validated.username,
      email: validated.email,
      password: hashedPassword,
      role: RoleEnum.USER,
    });

    await createSession(user);

    return {
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    };
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function loginAction(data: unknown) {
  try {
    const validated = await validateLogin(data);

    const user = await findUserByEmail(validated.email, true);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isValid = await verifyPassword(validated.password, user.password);

    if (!isValid) {
      throw new Error('Invalid email or password');
    }

    await createSession(user);
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function logoutAction() {
  try {
    await destroySession();
  } catch (error) {
    throw new Error(String(error));
  }
}
