import React from 'react'
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail, User } from "lucide-react";
import { useAuth } from '../context/auth';
import { useToast } from "@/hooks/use-toast.js";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "../components/ui/input/input";
import { Checkbox } from "@/components/ui/checkbox/checkbox.jsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { signupSchema } from "@/schemas/auth.schema.js";

const Signup = () => {

    const apiUrl = 'https://v54-tier3-team-36.onrender.com'
    const localApiUrl = 'http://localhost:5000'

    const backendUrl = process.env.NODE_ENV === 'production' ? apiUrl : localApiUrl

    const navigate = useNavigate();
    const { login } = useAuth();
    const { toast } = useToast();

    const form = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            age: "",
            consent: false,
        },
    });

    const age = form.watch("age");

    const onSubmit = async (data) => {
        try {
            const res = await fetch(`${backendUrl}/api/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const result = await res.json();

            if (!result?.success) {
                toast({
                    variant: "destructive",
                    title: "Signup failed",
                    description: result.message,
                });
            } else {
                sessionStorage.setItem("token", result.token);
                login(result.token);
                toast({ title: "Welcome!", description: "Account created." });
                navigate("/");
            }
        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Something went wrong during signup.",
            });
        }
    };

    return (
        <div className="flex h-[80vh] items-center justify-center bg-emerald-700 bg-opacity-75 px-4 rounded-2xl">
            <div
                className="w-full max-w-md bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6 sm:p-8 space-y-6">
                <h2 className="text-2xl font-semibold text-white text-center">
                    Sign Up
                </h2>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col gap-6"
                    >
                        {/* Name */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                placeholder="Name"
                                                className="w-full rounded-full py-3 px-4 pr-10 placeholder-white/70 text-white bg-transparent border border-transparent ring-1 ring-white/50 hover:ring-white focus:ring-2 focus:ring-teal-800 focus:outline-none transition"
                                                {...field}
                                            />
                                        </FormControl>
                                        <User
                                            size={18}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70"
                                        />
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Email */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="email@example.com"
                                                className="w-full rounded-full py-3 px-4 pr-10 placeholder-white/70 text-white bg-transparent border border-transparent ring-1 ring-white/50 hover:ring-white focus:ring-2 focus:ring-teal-800 focus:outline-none transition"
                                                {...field}
                                            />
                                        </FormControl>
                                        <Mail
                                            size={18}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70"
                                        />
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Create a password"
                                                className="w-full rounded-full py-3 px-4 pr-10 placeholder-white/70 text-white bg-transparent border border-transparent ring-1 ring-white/50 hover:ring-white focus:ring-2 focus:ring-teal-800 focus:outline-none transition"
                                                {...field}
                                            />
                                        </FormControl>
                                        <Lock
                                            size={18}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70"
                                        />
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="age"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <SelectTrigger
                                                className="w-full rounded-full py-3 px-4 pr-10 placeholder-white/70 text-white bg-transparent border border-transparent ring-1 ring-white/50 hover:ring-white focus:ring-2 focus:ring-teal-800 focus:outline-none transition">
                                                <SelectValue placeholder="Select your age" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="<5">Less than 5</SelectItem>
                                                <SelectItem value="5-8">5–8</SelectItem>
                                                <SelectItem value="9-12">9–12</SelectItem>
                                                <SelectItem value="13-17">13–17</SelectItem>
                                                <SelectItem value="18+">18+</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {age !== "18+" && age !== "" && (
                            <FormField
                                control={form.control}
                                name="consent"
                                render={({ field }) => (
                                    <FormItem className="flex items-center space-x-2">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormLabel htmlFor="consent" className="m-0 p-0 text-white">
                                            I have permission from a parent or guardian.
                                        </FormLabel>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        <Button
                            type="submit"
                            className="w-full mt-4 rounded-full py-3 bg-teal-800 text-white transition hover:bg-teal-700"
                        >
                            Sign Up
                        </Button>

                        <p className="text-center text-white text-sm">
                            Already have an account?{' '}
                            <a
                                href="#"
                                onClick={e => {
                                    e.preventDefault()
                                    navigate('/login')
                                }}
                                className="text-white underline hover:text-teal-800 transition"
                            >
                                Log In
                            </a>
                        </p>
                    </form>
                </Form>
            </div>
        </div>
    );
};
export default Signup