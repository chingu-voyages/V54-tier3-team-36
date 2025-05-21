import React from 'react'
import {useAuth} from '../context/auth'
import {useNavigate} from 'react-router'
import {useForm} from 'react-hook-form';
import {zodResolver} from "@hookform/resolvers/zod";
import {loginSchema} from "../schemas/auth.schema";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useToast} from "@/hooks/use-toast.js";


const Login = () => {
    const apiUrl = 'https://v54-tier3-team-36.onrender.com'
    const localApiUrl = 'http://localhost:5000'

    const backendUrl = process.env.NODE_ENV === 'production' ? apiUrl : localApiUrl

    const navigate = useNavigate()
    const {login} = useAuth();
    const {toast} = useToast();

    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {email: "", password: ""},
    });

    const onSubmit = async (data) => {
        console.log('Form submitted:', data)

        try {
            const response = await fetch(`${backendUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json()

            if (!result?.success) {
                toast({
                    variant: 'destructive',
                    title: 'Login Failed',
                    description: result.message,
                });
            } else {
                console.log("LOGIN SUCCESSFULLY")
                const token = result.token
                sessionStorage.setItem('token', token);
                login(token)
                toast({
                    title: 'Logged In',
                    description: 'Welcome back!'
                });
                navigate("/")
            }

        } catch (error) {
            console.error('Error during login:', error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Something went wrong during login.',
            });
        }
    }

    return (
        <div
            className='w-[95%] h-[70vh] bg-emerald-700 text-lg bg-opacity-75 rounded-[3vw] px-12 md:pt-12 mb-10 mx-auto mt-8'>
            <div className="flex justify-center items-center mt-8 md:mt-12 px-4 sm:px-6 lg:px-0">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                          className="w-full max-w-md space-y-6 bg-emerald-700 bg-opacity-75 p-8 rounded-2xl">
                        <h2 className="text-3xl font-bold text-center">Animal World</h2>
                        <p className="text-center italic">~Let's get back to the fun!~</p>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="email@example.com"
                                            {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="********"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button type="submit"
                                className="w-3/4 mx-auto block bg-teal-800 shadow-md shadow-teal-500/50 hover:opacity-85 rounded-full text-white ml-2 border-none">Log
                            In</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Login