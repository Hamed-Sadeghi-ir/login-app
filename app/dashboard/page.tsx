'use client'

import { Box, Button, Card, Flex, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardPage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [password, setPassword] = useState('');

    useEffect(() => {
        // اگر هنوز وضعیت session بارگذاری نشده است یا کاربر وارد نشده باشد
        if (status === 'loading') return; // در حال بارگذاری

        if (!session) {
            router.push('/login'); // اگر کاربر لاگین نکرده باشد، به صفحه‌ی لاگین هدایت شود
        }
    }, [status, session, router]); // به تغییرات status و session وابسته است

    if (status === 'loading') return <div>Loading...</div>; // نمایش وضعیت بارگذاری

    const handleSignout = () => {
        signOut({ redirect: false });
        router.push('/');
    }

    //--- Change password

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value); // ذخیره‌ی رمز عبور وارد شده
    };

    const submitPassword = async () => {
        try {
            const response = await axios.patch('/api/auth/change-password/' + session?.user.id, {
                password
            });

            alert('Password changed')
            console.log(response)
        }
        catch (error) {
            console.log(error)
        }
    }

    //---

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <Button
                        variant="ghost"
                        onClick={handleSignout}
                    >
                        Sign Out
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <Card>
                    <Box>
                        <Text>Account Information</Text>
                    </Box>

                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-500">Full Name</p>
                            <p className="font-medium">
                                {session?.user.firstName} {session?.user.lastName}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Username</p>
                            <p className="font-medium">{session?.user.username}</p>
                        </div>
                    </div>

                    <Flex gap="2" mt="5">
                        <TextField.Root
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Enter your new password"
                        />
                        <Button onClick={submitPassword}>
                            Change password
                        </Button>
                    </Flex>
                </Card>
            </main>
        </div>
    );
}

export default DashboardPage