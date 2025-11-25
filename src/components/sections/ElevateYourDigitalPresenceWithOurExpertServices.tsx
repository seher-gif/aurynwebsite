"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/common/Link";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

export default function ElevateYourDigitalPresenceWithOurExpertServices() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isReady, setIsReady] = useState(false);
    const animationFrameRef = useRef<number | null>(null);

    const { ref: headlineRef, isVisible: headlineVisible } = useRevealOnScroll<HTMLDivElement>({
        once: true,
        threshold: 0.3,
    });

    const { ref: paragraphRef, isVisible: paragraphVisible } = useRevealOnScroll<HTMLParagraphElement>({
        once: true,
        threshold: 0.3,
    });

    const { ref: buttonRef, isVisible: buttonVisible } = useRevealOnScroll<HTMLDivElement>({
        once: true,
        threshold: 0.3,
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            setIsReady(true);
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        let hue = 330;
        let time = 0;

        const animate = () => {
            if (!isReady || canvas.width === 0 || canvas.height === 0) {
                animationFrameRef.current = requestAnimationFrame(animate);
                return;
            }

            ctx.fillStyle = "#0e0e0e";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            time += 0.005;
            hue = 330 + Math.sin(time) * 15;

            const gradient = ctx.createRadialGradient(
                canvas.width / 2,
                canvas.height / 2,
                100,
                canvas.width / 2,
                canvas.height / 2,
                canvas.width * 0.8
            );

            gradient.addColorStop(0, `hsla(${hue}, 80%, 50%, 0.3)`);
            gradient.addColorStop(0.5, `hsla(${hue}, 80%, 40%, 0.15)`);
            gradient.addColorStop(1, `hsla(${hue}, 80%, 30%, 0)`);

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [isReady]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section className="relative w-full min-h-screen overflow-hidden bg-background">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ pointerEvents: "none" }}
            />

            <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <div ref={headlineRef}>
                        <h1
                            className={`font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 transition-all duration-700 ${headlineVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                                }`}
                        >
                            Elevate Your Digital Presence with Our Expert Services
                        </h1>
                        <div
                            className={`mx-auto h-0.5 bg-primary transition-all duration-1000 delay-300 ${headlineVisible ? "w-32 opacity-100" : "w-0 opacity-0"
                                }`}
                        />
                    </div>

                    <p
                        ref={paragraphRef}
                        className={`mt-8 text-lg sm:text-xl text-foreground-muted max-w-2xl mx-auto transition-all duration-700 delay-200 ${paragraphVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                            }`}
                    >
                        Transform your business with cutting-edge digital marketing strategies,
                        SEO expertise, and data-driven solutions tailored to your success.
                    </p>

                    <div
                        ref={buttonRef}
                        className={`mt-10 transition-all duration-700 delay-500 ${buttonVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                            }`}
                    >
                        <Button
                            asChild
                            size="lg"
                            className="btn-primary group relative overflow-hidden"
                            style={{
                                transform: buttonVisible
                                    ? `translate(${(mousePos.x - window.innerWidth / 2) * 0.02}px, ${(mousePos.y - window.innerHeight / 2) * 0.02
                                    }px)`
                                    : "none",
                                transition: "transform 0.1s ease-out, background-color var(--duration-fast) var(--ease-spring), box-shadow var(--duration-fast) var(--ease-spring)",
                            }}
                        >
                            <Link href="/iletisim">
                                Get Started Today
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            <div
                className="absolute w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border-2 border-primary/30 pointer-events-none"
                style={{
                    top: "20%",
                    right: "10%",
                    transform: `translateY(${typeof window !== "undefined" ? window.scrollY * 0.3 : 0}px)`,
                    transition: "transform 0.1s ease-out",
                    boxShadow: "0 0 40px rgba(229, 30, 81, 0.2)",
                }}
            />
        </section>
    );
}
