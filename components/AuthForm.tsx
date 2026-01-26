"use client";

import Image from "next/image";
import {z} from "zod";
import {Form} from "@/components/ui/form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {toast} from "sonner";
import FormField from "@/components/FormField";
import {useRouter} from "next/navigation";

type FormType = "sign-in" | "sign-up";

const AuthFormSchema = (type: FormType) => {
    return z.object({
        name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(8),
    });
};

const AuthForm = ({ type }: { type: FormType }) => {
    const router = useRouter();

    const formSchema = AuthFormSchema(type);

    type FormValues = z.infer<ReturnType<typeof AuthFormSchema>>;

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    function onSubmit(values : z.infer<typeof formSchema>) {
        try{
            if(type === "sign-up") {
                toast.success("Create Account Successfully");
                router.push("/sign-in");
                console.log('SIGN UP',values);
            }else{
                toast.success("Sign In Successfully");
                router.push("/")
                console.log('SIGN IN',values);
            }
        }catch (error) {
            console.log(error);
            toast.error("Invalid Credentials");
        }
    }

    const isSignIn = type === "sign-in";

    return (
        <div className="card-border lg:min-w-[566px]">
            <div className="flex flex-col gap-6 card py-14 px-10">
                <div className="flex flex-row gap-2 justify-center">
                    <Image src="/logo.svg" alt="logo" height={32} width={38} />
                    <h2 className="text-primary-100">MockMate</h2>
                </div>

                <h3>Practice Job Interview with AI</h3>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full space-y-6 mt-4 form"
                    >
                        {!isSignIn && (
                            <FormField
                                control={form.control}
                                name={"name"}
                                label={'Name'}
                                placeholder={"your name"}
                            />
                        )}
                        <FormField
                            control={form.control}
                            name={"email"}
                            label={'Email'}
                            placeholder={"your Email Address"}
                            type={"email"}
                        />
                        <FormField
                            control={form.control}
                            name={"password"}
                            label={'Password'}
                            placeholder={"Enter your password"}
                        />

                        <Button type="submit" className="cursor-pointer btn">
                            {isSignIn ? "Sign In" : "Create an Account"}
                        </Button>
                    </form>
                </Form>

                <p className="text-center">
                    {isSignIn ? "Don't have an account? " : "Already have an account?"}
                    <Link
                        href={!isSignIn ? "/sign-in" : "/sign-up"}
                        className="text-user-primary ml-1 font-bold"
                    >
                        {!isSignIn ? "Sign In" : "Sign Up"}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default AuthForm;
