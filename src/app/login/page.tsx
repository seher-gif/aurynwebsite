"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authenticate } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default function LoginPage() {
    const [errorMessage, dispatch] = useActionState(authenticate, undefined);
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectedRef = useRef(false);

    useEffect(() => {
        // Only redirect if login was successful (errorMessage is null)
        // and we haven't already attempted a redirect
        if (errorMessage === null && !redirectedRef.current) {
            redirectedRef.current = true;

            // Get the callback URL from query params, default to /admin
            const callbackUrl = searchParams.get('callbackUrl') || '/admin';

            console.log('[Login Success] Redirecting to:', callbackUrl);

            // Wait a bit for the session to be fully established
            // then redirect to the callback URL
            setTimeout(() => {
                router.push(callbackUrl);
            }, 200);
        }
    }, [errorMessage, router, searchParams]);

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-50 h-screen">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Yönetim Paneline Giriş Yap
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form action={dispatch} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            E-posta Adresi
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-auryn-magenta sm:text-sm sm:leading-6 px-3"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Şifre
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-auryn-magenta sm:text-sm sm:leading-6 px-3"
                            />
                        </div>
                    </div>

                    <div>
                        <LoginButton />
                    </div>
                    <div
                        className="flex h-8 items-end space-x-1"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        {errorMessage && (
                            <p className="text-sm text-red-500">{errorMessage}</p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <Button aria-disabled={pending} type="submit" className="w-full bg-auryn-magenta hover:bg-auryn-dark">
            {pending ? "Giriş yapılıyor..." : "Giriş Yap"}
        </Button>
    );
}
