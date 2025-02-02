import { Flex, Text, TextField } from '@radix-ui/themes'
import React from 'react'

const LoginPage = () => {
    return (
        <Flex
            justify={"center"}
            className='min-h-screen items-center bg-gray-50'>
            <form className='space-y-4'>
                <div className='space-y-2'>
                    <Text>Username</Text>
                    <TextField.Root 
                        id='username' 
                        name='username' 
                        type='text'
                        placeholder='Enter your username'>
                    </TextField.Root>
                </div>   
                <div className='space-y-2'>
                    <Text>Password</Text>
                    <TextField.Root 
                        id='password' 
                        name='password' 
                        type='text'
                        placeholder='Enter your password'>
                    </TextField.Root>
                </div>              
            </form>
        </Flex>
    )
}

export default LoginPage