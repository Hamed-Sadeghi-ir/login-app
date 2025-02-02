'use client'

import { Box, Button, Flex, Text, TextField } from '@radix-ui/themes'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const LoginPage = () => {
    const router = useRouter()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoading(false);

        const formData = new FormData(e.currentTarget);
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;

        try {
            setLoading(true);

            const result = await signIn('credentials', {
                redirect: false,
                username,
                password,
            });

            if (result?.error) {
                setError('Invalid username or password');
            } else {
                router.push("/dashboard");
            }
        } catch (error) {
            setError('Inavlaid username or password')
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <Flex
            justify="center"
            className="min-h-screen items-center bg-gray-50">
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div className="space-y-2">
                    <Text>Username</Text>
                    <TextField.Root
                        id="username"
                        name="username"
                        type="text"
                        required
                        placeholder='Enter your username' />
                </div>
                <div className="space-y-2">
                    <Text>Username</Text>
                    <TextField.Root
                        id="password"
                        name="password"
                        type="password"
                        required
                        placeholder='Enter your password' />
                </div>
                {error &&
                    <Box mt="5" className="text-center">
                        <Text color="red">{error}</Text>
                    </Box>
                }

                <Button
                    type="submit"
                    className="w-full"
                    disabled={loading}>
                    {loading ? "Loading..." : "Login"}
                </Button>

                <p className="text-center text-sm">
                    Don&apos;t have an account?{' '}
                    <Link href="/signup" className="text-blue-600 hover:underline">
                        Sign up
                    </Link>
                </p>

            </form>
        </Flex >
    )
}

export default LoginPage