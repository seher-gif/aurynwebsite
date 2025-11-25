"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    name: z.string().min(2, "İsim en az 2 karakter olmalıdır."),
    email: z.string().email("Geçerli bir e-posta adresi giriniz."),
    phone: z.string().min(10, "Geçerli bir telefon numarası giriniz."),
    company: z.string().optional(),
    subject: z.string().min(5, "Konu en az 5 karakter olmalıdır."),
    message: z.string().min(10, "Mesaj en az 10 karakter olmalıdır."),
});

type FormData = z.infer<typeof formSchema>;

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setIsSuccess(true);
                reset();
            } else {
                alert('Mesajınız gönderilemedi. Lütfen tekrar deneyin.');
            }
        } catch (error) {
            alert('Bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {isSuccess ? (
                <div className="text-center py-12">
                    <h3 className="text-2xl font-bold text-auryn-magenta">Mesajınız Gönderildi!</h3>
                    <p className="mt-4 text-gray-400">En kısa sürede sizinle iletişime geçeceğiz.</p>
                    <Button onClick={() => setIsSuccess(false)} className="mt-8 bg-white/10 hover:bg-white/20 text-white border-0">
                        Yeni Mesaj Gönder
                    </Button>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-200">
                                Ad Soyad
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    id="name"
                                    {...register("name")}
                                    className="block w-full rounded-xl border-0 bg-gray-900/50 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-auryn-magenta/30 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-auryn-magenta sm:text-sm sm:leading-6 transition-all"
                                    placeholder="Adınız Soyadınız"
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-200">
                                E-posta
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="email"
                                    id="email"
                                    {...register("email")}
                                    className="block w-full rounded-xl border-0 bg-gray-900/50 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-auryn-magenta/30 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-auryn-magenta sm:text-sm sm:leading-6 transition-all"
                                    placeholder="ornek@sirket.com"
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-gray-200">
                                Telefon
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="tel"
                                    id="phone"
                                    {...register("phone")}
                                    className="block w-full rounded-xl border-0 bg-gray-900/50 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-auryn-magenta/30 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-auryn-magenta sm:text-sm sm:leading-6 transition-all"
                                    placeholder="05XX XXX XX XX"
                                />
                                {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-200">
                                Şirket (Opsiyonel)
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    id="company"
                                    {...register("company")}
                                    className="block w-full rounded-xl border-0 bg-gray-900/50 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-auryn-magenta/30 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-auryn-magenta sm:text-sm sm:leading-6 transition-all"
                                    placeholder="Şirket Adı"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="subject" className="block text-sm font-semibold leading-6 text-gray-200">
                                Konu
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    id="subject"
                                    {...register("subject")}
                                    className="block w-full rounded-xl border-0 bg-gray-900/50 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-auryn-magenta/30 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-auryn-magenta sm:text-sm sm:leading-6 transition-all"
                                    placeholder="Mesajınızın konusu"
                                />
                                {errors.subject && <p className="mt-1 text-sm text-red-400">{errors.subject.message}</p>}
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-200">
                                Mesajınız
                            </label>
                            <div className="mt-2.5">
                                <textarea
                                    id="message"
                                    rows={4}
                                    {...register("message")}
                                    className="block w-full rounded-xl border-0 bg-gray-900/50 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-auryn-magenta/30 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-auryn-magenta sm:text-sm sm:leading-6 transition-all resize-none"
                                    placeholder="Bize iletmek istediğiniz mesaj..."
                                />
                                {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <Button type="submit" className="w-full bg-gradient-to-r from-auryn-magenta to-auryn-purple hover:opacity-90 text-white border-0 h-12 rounded-xl text-base font-semibold transition-transform hover:scale-[1.02]" disabled={isSubmitting}>
                            {isSubmitting ? "Gönderiliyor..." : "Gönder"}
                        </Button>
                    </div>
                </form>
            )}
        </>
    );
}
