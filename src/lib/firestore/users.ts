import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore';
import { type User, type UserWithPassword } from '@/types/user';
import type { UserCreateFormData, UserUpdateFormData } from '@/configs/schemas';
import { firestore } from '@/configs/firebase';
import { firestoreToUser } from '@/utils';

export async function findAllUsers(): Promise<User[]> {
  const usersRef = collection(firestore, 'users');
  const querySnapshot = await getDocs(usersRef);

  const users: User[] = [];

  querySnapshot.forEach(docSnapshot => {
    users.push(firestoreToUser(docSnapshot.id, docSnapshot.data()));
  });

  return users;
}

export async function findUserById(id: number): Promise<User | null> {
  const usersRef = collection(firestore, 'users');
  const userRef = doc(usersRef, id.toString());
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    return null;
  }

  const user = firestoreToUser(userSnap.id, userSnap.data());

  return user;
}

export async function findUserByEmail(
  email: string,
  withPassword: true,
): Promise<UserWithPassword | null>;
export async function findUserByEmail(email: string, withPassword?: false): Promise<User | null>;
export async function findUserByEmail(
  email: string,
  withPassword: boolean = false,
): Promise<User | UserWithPassword | null> {
  const usersRef = collection(firestore, 'users');
  const q = query(usersRef, where('email', '==', email));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return null;
  }

  const docSnapshot = querySnapshot.docs[0];
  return firestoreToUser(docSnapshot.id, docSnapshot.data(), withPassword);
}

export async function findUserByUsername(username: string): Promise<User | null> {
  const usersRef = collection(firestore, 'users');
  const q = query(usersRef, where('username', '==', username));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return null;
  }

  const docSnapshot = querySnapshot.docs[0];
  return firestoreToUser(docSnapshot.id, docSnapshot.data(), false) as User;
}

export async function createUser(data: UserCreateFormData): Promise<User> {
  const usersRef = collection(firestore, 'users');

  const id = Date.now();

  const userData = {
    id,
    username: data.username,
    email: data.email,
    password: data.password,
    role: data.role || 'USER',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const userRef = doc(usersRef, id.toString());
  await setDoc(userRef, userData);

  const newUser = await findUserById(id);
  if (!newUser) {
    throw new Error('Failed to retrieve created user');
  }

  return newUser;
}

export async function updateUserById(id: number, data: Partial<UserUpdateFormData>): Promise<User> {
  const usersRef = collection(firestore, 'users');
  const userRef = doc(usersRef, id.toString());
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    throw new Error(`User with id ${id} not found`);
  }

  const updateData: any = {
    ...data,
    updatedAt: new Date(),
  };

  if (!updateData.password || updateData.password === '') {
    delete updateData.password;
  }

  await updateDoc(userRef, updateData);

  const updatedUser = await findUserById(id);
  if (!updatedUser) {
    throw new Error('Failed to retrieve updated user');
  }

  return updatedUser;
}

export async function deleteUserById(id: number): Promise<User> {
  const usersRef = collection(firestore, 'users');
  const userRef = doc(usersRef, id.toString());
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    throw new Error(`User with id ${id} not found`);
  }

  const userData = userSnap.data();
  await deleteDoc(userRef);

  return firestoreToUser(userSnap.id, userData, false) as User;
}
