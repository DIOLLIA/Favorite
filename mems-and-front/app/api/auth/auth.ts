import NextAuth from 'next-auth';
import {authConfig} from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import z from 'zod'

class User {
    email: string;
    pwd: string;

    constructor(email: string, pwd: string) {
        this.email = email
        this.pwd = pwd
    }
}

const admin = new User("admin@mail.com", "adminZZz")

async function getUser(email: string): Promise<User | undefined> {
    if (admin.email == email) {
        return admin
    } else {
        throw new Error("Failed to log in")
    }
//todo 1) get user from database 2) compare passwords that encrypted
    /*
 try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
  */
    return
}

export const {auth, signIn, signOut} = NextAuth({
    ...authConfig,
    providers: [Credentials({
        async authorize(credentials) {
            const parsedCredentials = z
                .object({email: z.string().email(), password: z.string().min(5)})
                .safeParse(credentials);

            if (parsedCredentials.success) {
                const {email, password} = parsedCredentials.data;
                const user = await getUser(email);
                if (!user) return null;

                if (admin.pwd == password) {
                    return user;
                }
            }
            return null

        }
    })],
});