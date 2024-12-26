'use client';
//TODO Review this draft login page
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '@/app/css/movies.css'
import RedirectButton from "@/app/ui/movies/RedirectButton";

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); //todo delete password storage
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/movies/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ username: username, password }),
                credentials: 'include', // Для передачи сессионных данных // todo check with SS
            });

            if (response.ok) {
                router.push('/movies/upload'); // Редирект на форму загрузки
            } else {
                setError('Invalid credentials');
            }
        } catch (err) {
            console.error('Error during login:', err);
            setError('An error occurred while logging in');
        }
    };

    return (
        <div> <RedirectButton/>
        <form onSubmit={handleSubmit} className="login-form">
            <h1>Login</h1>
            {error && <p className="error">{error}</p>}
            <label htmlFor="email">Username</label>
            <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <label htmlFor="password">Password</label>
            <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Login</button>
        </form>
        </div>
    );
}
