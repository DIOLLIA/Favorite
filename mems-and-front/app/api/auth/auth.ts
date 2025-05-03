import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';

const adminUser = {
    email: "admin@mail.com",
    password: "adminZZz"
};

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({
                        email: z.string().email(),
                        password: z.string().min(5)
                    })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;

                    if (email === adminUser.email && password === adminUser.password) {
                        return {
                            id: '1',
                            email: adminUser.email,
                            name: 'Admin'
                        };
                    }
                }
                return null;
            },
        }),
    ],
});