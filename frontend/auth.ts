import NextAuth from 'next-auth';
import {authConfig} from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import {z} from 'zod'
import {sql} from "@/app/seed/route";
import type {User} from '@/app/lib/definitions';
import bcrypt from 'bcrypt';

async function getUser(email: string): Promise<User | undefined> {
    console.log('get user result' + email)
    try {
        const user = await sql<User[]>`SELECT *
                                       FROM users
                                       WHERE email = ${email}`;
        return user[0];
    } catch (error) {
        throw new Error('Failed to fetch user')
    }
}

export const {auth, signIn, signOut} = NextAuth({
    ...authConfig,
    providers: [Credentials({
        async authorize(credentials) {
            const parsedCredentials = z
                .object({email: z.string().email(), password: z.string().min(8)})
                .safeParse(credentials);
            console.log("parsed user\ pwd: " + parsedCredentials.data?.email + parsedCredentials.data?.password)

            if (parsedCredentials.success) {
                const {email, password} = parsedCredentials.data
                const user = await getUser(email);
                if (!user) return null;
                console.log('user pwd db: ' + user.password + 'pwd input: ' + password)
                const passwordsMatch = await bcrypt.compare(password, user.password)
                if (passwordsMatch) return user;
            }
            console.log('Invalid credentials');
            return null;
        },
    }),
    ],
});