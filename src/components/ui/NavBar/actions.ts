'use server';
import { getCookie, deleteCookie } from '@/utils/sessions';

export const getSession = async () => {
  const session = await getCookie('session');
  const user = await getCookie('username');
  const userRole = await getCookie('userRole');
  return { session, user, userRole };
};

export const deleteSession = async () => {
  console.log('Deleting cookies...');
  await deleteCookie('session');
  await deleteCookie('username');
  await deleteCookie('userRole');
  console.log('Cookies deleted.');
};
