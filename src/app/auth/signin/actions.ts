'use server';
import { SigninFormSchema } from '@/lib/definitions';
import { createSession } from '@/utils/sessions';

export async function signin(state: any, formData: FormData): Promise<any> {
    try{
      const username = formData.get('username');
      const password = formData.get('password');
      
      // validate fields
      const validationResult = SigninFormSchema.safeParse({
        username: username,
        password: password,
      })
    
      if (!validationResult.success){
        return {
          errors: validationResult.error.flatten().fieldErrors,
        }
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/signin/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return {
          errors: {fail: data.error || 'Signin failed'}
        }    
      }

      await createSession(data.access, data.username, data.role);
      return { redirectTo: '/books' };

    } catch (error) {
      console.log(error);
      return {
        errors: {fail: (error as Error).message || "An unknown error occurred"},
      }
    }
}