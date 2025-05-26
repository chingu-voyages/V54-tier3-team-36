import React from 'react';
import {useNavigate} from 'react-router';
import {useForm} from 'react-hook-form';
import {zodResolver} from "@hookform/resolvers/zod";
import {Lock, Mail} from 'lucide-react';
import {loginSchema} from "../schemas/auth.schema";
import {useAuth} from '../context/auth';
import {useToast} from "@/hooks/use-toast.js";
import {Form, FormControl, FormField, FormItem, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";


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
        <div className="flex h-[80vh] items-center justify-center bg-emerald-700 bg-opacity-75 px-4 rounded-2xl">
            <div
                className="w-full max-w-md bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6 sm:p-8 space-y-6">
                <h2 className="text-2xl font-semibold text-white text-center">Login</h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                          className="flex flex-col gap-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="email@example.com"
                                                className="w-full rounded-full py-3 px-4 pr-10 placeholder-white/70 text-white bg-transparent border border-transparent ring-1 ring-white/50 hover:ring-white focus:ring-2 focus:ring-teal-800 focus:outline-none transition"
                                                {...field} />
                                        </FormControl>
                                        <Mail
                                            size={18}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70"
                                        />
                                    </div>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="password"
                                                className="w-full rounded-full py-3 px-4 pr-10 placeholder-white/70 text-white border border-transparent ring-1 ring-white/50 hover:ring-white focus:ring-2 focus:ring-teal-800 focus:outline-none transition"
                                                {...field}
                                            />
                                        </FormControl>
                                        <Lock
                                            size={18}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70"
                                        />
                                    </div>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button type="submit"
                                className="w-full mt-8 rounded-full py-5 text-white bg-teal-800 shadow-md shadow-teal-500/50 border-none transition-opacity  hover:bg-teal-700">Submit</Button>

                        <p className="text-center text-white text-sm">
                            Don’t have an account?{' '}
                            <a
                                href="#"
                                onClick={e => {
                                    e.preventDefault()
                                    navigate('/signup')
                                }}
                                className="text-white underline hover:text-teal-800 transition"
                            >
                                Register
                            </a>
                        </p>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Login