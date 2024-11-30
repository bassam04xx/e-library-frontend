'use server'; 
import { SignupFormSchema } from '@/lib/definitions';
import { createSession } from '@/utils/sessions';

export async function signup(state: any, formData: FormData): Promise<any> {
    try{

      const username = formData.get('username');
      const fullName = formData.get('fullName');
      const password = formData.get('password');
      // validate fields
      const validationResult = SignupFormSchema.safeParse({
        username: username,
        fullName: fullName,
        password: password,
    })
    
    if (!validationResult.success){
      return {
        errors: validationResult.error.flatten().fieldErrors,
      }
    }
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/signup/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      
      body: JSON.stringify({username, full_name:fullName, password})
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return {
        errors:{fail: data.error || 'Signup failed'}
      }    
    }

    await createSession(data.access,data.user.username, data.user.role);
    return { redirectTo :'/books'};

  } catch (error) {
    console.log(error);
    return {
      errors: {fail: (error as Error).message || "an unknown error occured"},
    }
  }
}

