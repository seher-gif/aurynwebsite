"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n/routes";

const MESSAGES = {
    tr: {
        name: "İsim en az 2 karakter olmalıdır.",
        email: "Geçerli bir e-posta adresi giriniz.",
        phone: "Geçerli bir telefon numarası giriniz.",
        subject: "Konu en az 5 karakter olmalıdır.",
        message: "Mesaj en az 10 karakter olmalıdır.",
        consent: "Devam etmek için KVKK Aydınlatma Metni'ni onaylamalısınız.",
    },
    en: {
        name: "Name must be at least 2 characters.",
        email: "Please enter a valid email address.",
        phone: "Please enter a valid phone number.",
        subject: "Subject must be at least 5 characters.",
        message: "Message must be at least 10 characters.",
        consent: "You must accept the Privacy Notice to continue.",
    },
};

function buildSchema(locale: Locale) {
    const m = MESSAGES[locale];
    return z.object({
        name: z.string().min(2, m.name),
        email: z.string().email(m.email),
        phone: z.string().min(10, m.phone),
        company: z.string().optional(),
        subject: z.string().min(5, m.subject),
        message: z.string().min(10, m.message),
        kvkkConsent: z.literal(true, { message: m.consent }),
        // Honeypot field - hidden from users, filled in only by bots.
        website: z.string().max(0).optional(),
    });
}

type FormData = z.infer<ReturnType<typeof buildSchema>>;

const STRINGS = {
    tr: {
        labels: { name: "Ad Soyad", email: "E-posta", phone: "Telefon", company: "Şirket (Opsiyonel)", subject: "Konu", message: "Mesajınız" },
        placeholders: { name: "Adınız Soyadınız", email: "ornek@sirket.com", phone: "05XX XXX XX XX", company: "Şirket Adı", subject: "Mesajınızın konusu", message: "Bize iletmek istediğiniz mesaj..." },
        consentPrefix: "",
        consentLinkLabel: "KVKK Aydınlatma Metni",
        consentSuffix: "'ni okudum ve kişisel verilerimin işlenmesini kabul ediyorum.",
        consentHref: "/kvkk-aydinlatma-metni",
        submitting: "Gönderiliyor...",
        submit: "Gönder",
        successTitle: "Mesajınız Gönderildi!",
        successBody: "En kısa sürede sizinle iletişime geçeceğiz.",
        successCta: "Yeni Mesaj Gönder",
        errorSubmit: "Mesajınız gönderilemedi. Lütfen tekrar deneyin.",
        errorGeneric: "Bir hata oluştu. Lütfen tekrar deneyin.",
    },
    en: {
        labels: { name: "Full Name", email: "Email", phone: "Phone", company: "Company (Optional)", subject: "Subject", message: "Your Message" },
        placeholders: { name: "Your full name", email: "you@company.com", phone: "+1 234 567 8900", company: "Company name", subject: "What is this about?", message: "Tell us what you need..." },
        consentPrefix: "I have read the ",
        consentLinkLabel: "Privacy Notice (KVKK)",
        consentSuffix: " and consent to the processing of my personal data.",
        consentHref: "/kvkk-aydinlatma-metni",
        submitting: "Sending...",
        submit: "Send",
        successTitle: "Message Sent!",
        successBody: "We'll get back to you as soon as possible.",
        successCta: "Send Another Message",
        errorSubmit: "Your message could not be sent. Please try again.",
        errorGeneric: "Something went wrong. Please try again.",
    },
};

export function ContactForm({ locale = "tr" }: { locale?: Locale }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const t = STRINGS[locale];

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(buildSchema(locale)),
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
                alert(t.errorSubmit);
            }
        } catch (error) {
            alert(t.errorGeneric);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {isSuccess ? (
                <div className="text-center py-12">
                    <h3 className="text-2xl font-bold text-auryn-magenta">{t.successTitle}</h3>
                    <p className="mt-4 text-gray-400">{t.successBody}</p>
                    <Button onClick={() => setIsSuccess(false)} className="mt-8 bg-white/10 hover:bg-white/20 text-white border-0">
                        {t.successCta}
                    </Button>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Honeypot: invisible to real users, catches bots */}
                    <input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        {...register("website")}
                        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
                        aria-hidden="true"
                    />
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-200">
                                {t.labels.name}
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    id="name"
                                    {...register("name")}
                                    className="block w-full rounded-xl border-0 bg-gray-900/50 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-auryn-magenta/30 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-auryn-magenta sm:text-sm sm:leading-6 transition-all"
                                    placeholder={t.placeholders.name}
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-200">
                                {t.labels.email}
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="email"
                                    id="email"
                                    {...register("email")}
                                    className="block w-full rounded-xl border-0 bg-gray-900/50 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-auryn-magenta/30 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-auryn-magenta sm:text-sm sm:leading-6 transition-all"
                                    placeholder={t.placeholders.email}
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-gray-200">
                                {t.labels.phone}
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="tel"
                                    id="phone"
                                    {...register("phone")}
                                    className="block w-full rounded-xl border-0 bg-gray-900/50 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-auryn-magenta/30 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-auryn-magenta sm:text-sm sm:leading-6 transition-all"
                                    placeholder={t.placeholders.phone}
                                />
                                {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-200">
                                {t.labels.company}
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    id="company"
                                    {...register("company")}
                                    className="block w-full rounded-xl border-0 bg-gray-900/50 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-auryn-magenta/30 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-auryn-magenta sm:text-sm sm:leading-6 transition-all"
                                    placeholder={t.placeholders.company}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="subject" className="block text-sm font-semibold leading-6 text-gray-200">
                                {t.labels.subject}
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    id="subject"
                                    {...register("subject")}
                                    className="block w-full rounded-xl border-0 bg-gray-900/50 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-auryn-magenta/30 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-auryn-magenta sm:text-sm sm:leading-6 transition-all"
                                    placeholder={t.placeholders.subject}
                                />
                                {errors.subject && <p className="mt-1 text-sm text-red-400">{errors.subject.message}</p>}
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-200">
                                {t.labels.message}
                            </label>
                            <div className="mt-2.5">
                                <textarea
                                    id="message"
                                    rows={4}
                                    {...register("message")}
                                    className="block w-full rounded-xl border-0 bg-gray-900/50 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-auryn-magenta/30 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-auryn-magenta sm:text-sm sm:leading-6 transition-all resize-none"
                                    placeholder={t.placeholders.message}
                                />
                                {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 flex items-start gap-3">
                        <input
                            type="checkbox"
                            id="kvkkConsent"
                            {...register("kvkkConsent")}
                            className="mt-1 h-4 w-4 rounded border-gray-500 bg-gray-900/50 text-auryn-magenta focus:ring-auryn-magenta"
                        />
                        <label htmlFor="kvkkConsent" className="text-sm text-gray-400">
                            {t.consentPrefix}
                            <a href={t.consentHref} target="_blank" rel="noopener noreferrer" className="text-auryn-magenta hover:underline">
                                {t.consentLinkLabel}
                            </a>
                            {t.consentSuffix}
                        </label>
                    </div>
                    {errors.kvkkConsent && <p className="text-sm text-red-400">{errors.kvkkConsent.message}</p>}
                    <div className="mt-10">
                        <Button type="submit" className="w-full bg-gradient-to-r from-auryn-magenta to-auryn-purple hover:opacity-90 text-white border-0 h-12 rounded-xl text-base font-semibold transition-transform hover:scale-[1.02]" disabled={isSubmitting}>
                            {isSubmitting ? t.submitting : t.submit}
                        </Button>
                    </div>
                </form>
            )}
        </>
    );
}
