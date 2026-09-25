"use client";

import { useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    Mail,
} from "lucide-react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import _axios from "@/lib/_axios";

const MANIFEST_ROWS = [
    {
        idx: "01",
        label: "Vehicles active on route",
        value: "128",
        delta: "+12",
    },
    {
        idx: "02",
        label: "On-time delivery rate",
        value: "94.2%",
        delta: "▲ 1.8",
    },
    {
        idx: "03",
        label: "Manifests closed today",
        value: "342",
        delta: "Live",
    },
];

const BARCODE_WIDTHS = [
    2, 3, 2, 5, 2, 3, 4, 2, 2, 5, 3, 2, 4, 2, 3, 2, 5, 2, 3, 4, 2, 3, 2,
    4, 2, 2, 5, 3, 2, 2,
];

/* =========================================================
   GRID OVERLAY
========================================================= */

function GridOverlay() {
    return (
        <div
            className="pointer-events-none absolute inset-0 opacity-[0.16]"
            style={{
                backgroundImage:
                    "linear-gradient(var(--fleet-cyan) 1px, transparent 1px), linear-gradient(90deg, var(--fleet-cyan) 1px, transparent 1px)",
                backgroundSize: "38px 38px",
                maskImage:
                    "radial-gradient(ellipse 80% 70% at 25% 30%, black, transparent 75%)",
                WebkitMaskImage:
                    "radial-gradient(ellipse 80% 70% at 25% 30%, black, transparent 75%)",
            }}
        />
    );
}

/* =========================================================
   BRAND MARK
========================================================= */

function BrandMark({
    variant = "onDark",
    className = "",
}: {
    variant?: "onDark" | "onLight";
    className?: string;
}) {
    const border =
        variant === "onDark"
            ? "border-fleet-amber"
            : "border-fleet-primary";

    const fill =
        variant === "onDark"
            ? "bg-fleet-amber"
            : "bg-fleet-primary";

    return (
        <div
            className={`flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-[4px] border-2 ${border} ${className}`}
        >
            <div
                className={`h-[14px] w-[14px] ${fill}`}
                style={{
                    clipPath:
                        "polygon(0 30%, 60% 30%, 60% 0, 100% 50%, 60% 100%, 60% 70%, 0 70%)",
                }}
            />
        </div>
    );
}

/* =========================================================
   PERFORATION
========================================================= */

function Perforation({
    edge,
}: {
    edge: "top" | "bottom";
}) {
    return (
        <div
            className={`flex justify-evenly px-2.5 ${edge === "top"
                ? "-translate-y-px"
                : "translate-y-px"
                }`}
        >
            {Array.from({ length: 10 }).map((_, index) => (
                <span
                    key={index}
                    className={`h-[9px] w-[9px] rounded-full bg-fleet-base ${edge === "top" ? "-mt-[5px]" : "-mb-[5px]"
                        }`}
                />
            ))}
        </div>
    );
}

/* =========================================================
   BARCODE
========================================================= */

function Barcode() {
    return (
        <div className="flex h-[26px] items-end gap-[2px]">
            {BARCODE_WIDTHS.map((width, index) => (
                <span
                    key={index}
                    className="block bg-fleet-primary"
                    style={{
                        width: `${width}px`,
                        height: `${14 + width * 2}px`,
                    }}
                />
            ))}
        </div>
    );
}

/* =========================================================
   FORGOT PASSWORD PAGE
========================================================= */

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [sent, setSent] = useState(false);

    /* =========================================================
       SUBMIT
    ========================================================= */

    const forgotPass = useMutation({
        mutationFn: async () => {
            const res = await _axios.post('/auth/forgot-password', { email });
            return res.data;
        },
        onSuccess: () => {
            setSent(true);
        },
        onError: (error) => {
            setError(error.message || "Something went wrong");
        }
    })

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const trimmedEmail = email.trim();

        if (!trimmedEmail) {
            setError("Email address is required");
            return;
        }

        if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                trimmedEmail
            )
        ) {
            setError("Enter a valid email address");
            return;
        }

        setError("");
        forgotPass.mutate();
    };

    /* =========================================================
       RESET FORM
    ========================================================= */

    const handleSendAnother = () => {
        setSent(false);
        setEmail("");
        setError("");
    };

    return (
        <main className="min-h-screen bg-fleet-base font-sans text-fleet-primary">
            <div className="relative min-h-screen overflow-hidden lg:flex">

                {/* =====================================================
            LEFT POLYGON PANEL
        ====================================================== */}

                <section
                    className="
            relative
            hidden
            min-h-screen
            overflow-hidden
            bg-fleet-primary
            lg:flex
            lg:w-[55%]
            lg:flex-col
            lg:px-16
            lg:py-14
          "
                    style={{
                        clipPath:
                            "polygon(0 0, 100% 0, 92% 50%, 100% 100%, 0 100%)",
                        zIndex: 2,
                    }}
                >
                    {/* Grid */}

                    <GridOverlay />

                    {/* Top amber glow */}

                    <div
                        className="
              pointer-events-none
              absolute
              inset-0
              bg-[radial-gradient(ellipse_900px_600px_at_15%_15%,color-mix(in_srgb,var(--fleet-amber)_14%,transparent),transparent_60%)]
            "
                    />

                    {/* Bottom glow */}

                    <div
                        className="
              pointer-events-none
              absolute
              -bottom-24
              -right-24
              h-[420px]
              w-[420px]
              rounded-full
              bg-fleet-amber/10
              blur-3xl
            "
                    />

                    {/* Center cyan glow */}

                    <div
                        className="
              pointer-events-none
              absolute
              left-[45%]
              top-[45%]
              h-[300px]
              w-[300px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-fleet-cyan/5
              blur-3xl
            "
                    />

                    {/* ===================================================
              BRAND
          ==================================================== */}

                    <div className="relative z-10 flex items-center gap-3">
                        <BrandMark variant="onDark" />

                        <div>
                            <div className="text-xl font-semibold tracking-wide text-fleet-base">
                                FLEETOPS
                            </div>

                            <div className="mt-px text-[10px] uppercase tracking-[0.22em] text-fleet-secondary">
                                Dispatch Network
                            </div>
                        </div>

                        {/* System status */}

                        <div
                            className="
                ml-auto
                flex
                items-center
                gap-[7px]
                rounded-full
                border
                border-fleet-border
                bg-fleet-base/5
                px-3
                py-1.5
              "
                        >
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fleet-green opacity-50" />

                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-fleet-green" />
                            </span>

                            <span className="text-[10px] uppercase tracking-wider text-fleet-secondary">
                                All systems nominal
                            </span>
                        </div>
                    </div>

                    {/* ===================================================
              HERO
          ==================================================== */}

                    <div className="relative z-10 mt-auto max-w-[520px]">

                        {/* Label */}

                        <div className="mb-[18px] flex items-center gap-2.5">
                            <span className="h-px w-7 bg-fleet-amber" />

                            <span className="text-[11px] uppercase tracking-[0.24em] text-fleet-amber">
                                Access Recovery
                            </span>
                        </div>

                        {/* Heading */}

                        <h1
                            className="
                font-heading
                text-[clamp(2.6rem,4.3vw,4.1rem)]
                font-semibold
                leading-[0.98]
                tracking-tight
                text-fleet-base
              "
                        >
                            Locked out?
                            <br />

                            <span className="text-fleet-secondary">
                                We&apos;ll get you back.
                            </span>
                        </h1>

                        {/* Description */}

                        <p className="mt-5 max-w-[420px] text-[14.5px] leading-7 text-fleet-secondary">
                            Enter the email associated with your dispatcher
                            account and we&apos;ll send you a one time password.
                        </p>

                        {/* =================================================
                MANIFEST
            ================================================== */}

                        <div className="mt-[34px] border-t border-fleet-border font-mono">
                            {MANIFEST_ROWS.map((row) => (
                                <div
                                    key={row.idx}
                                    className="
                    flex
                    items-center
                    border-b
                    border-fleet-border
                    py-[11px]
                    text-[12.5px]
                  "
                                >
                                    <span className="w-[34px] flex-shrink-0 text-fleet-muted">
                                        {row.idx}
                                    </span>

                                    <span className="flex-1 text-fleet-secondary">
                                        {row.label}
                                    </span>

                                    <span className="mr-2.5 font-semibold text-fleet-base">
                                        {row.value}
                                    </span>

                                    <span className="text-[11px] text-fleet-green">
                                        {row.delta}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ===================================================
              FOOTER
          ==================================================== */}

                    <div
                        className="
              relative
              z-10
              mt-10
              flex
              justify-between
              border-t
              border-fleet-border
              pt-[18px]
              text-[10px]
              uppercase
              tracking-[0.14em]
              text-fleet-muted
            "
                    >
                        <span>FleetOps Platform</span>

                        <span>Build 4.2.1</span>
                    </div>
                </section>

                {/* =====================================================
            RIGHT POLYGON PANEL
        ====================================================== */}

                <section
                    className="
            relative
            flex
            min-h-screen
            flex-1
            items-center
            justify-center
            overflow-hidden
            bg-fleet-base
            px-6
            py-10
            lg:-ml-[6%]
            lg:w-[51%]
            lg:flex-none
            lg:pl-[8%]
          "
                    style={{
                        clipPath:
                            "polygon(8% 0, 100% 0, 100% 100%, 8% 100%, 0 50%)",
                        zIndex: 1,
                    }}
                >
                    {/* Ambient gradient */}

                    <div
                        className="
              pointer-events-none
              absolute
              inset-0
              bg-[radial-gradient(ellipse_700px_520px_at_60%_35%,color-mix(in_srgb,var(--fleet-amber)_6%,transparent),transparent_70%)]
            "
                    />

                    {/* Cyan glow */}

                    <div
                        className="
              pointer-events-none
              absolute
              -right-32
              top-1/4
              h-[420px]
              w-[420px]
              rounded-full
              bg-fleet-cyan/5
              blur-3xl
            "
                    />

                    {/* ===================================================
              CONTENT
          ==================================================== */}

                    <div className="relative z-10 w-full max-w-[420px]">

                        {/* Mobile brand */}

                        <div className="mb-7 flex items-center justify-center gap-2.5 lg:hidden">
                            <BrandMark variant="onLight" />

                            <span className="text-xl font-semibold text-fleet-primary">
                                FLEETOPS
                            </span>
                        </div>

                        {/* =================================================
                RECOVERY CARD
            ================================================== */}

                        <div
                            className="
                relative
                rounded-[2px]
                bg-fleet-panel
                text-fleet-primary
                shadow-[0_24px_60px_color-mix(in_srgb,var(--fleet-primary)_14%,transparent),0_1px_0_color-mix(in_srgb,var(--fleet-primary)_6%,transparent)]
              "
                        >
                            {/* Top perforation */}

                            <Perforation edge="top" />

                            {/* Accent line */}

                            <div className="h-[3px] w-full bg-gradient-to-r from-fleet-primary via-fleet-cyan to-fleet-amber" />

                            <div className="px-[34px] pb-[30px] pt-[32px]">

                                {/* =================================================
                    MANIFEST HEADER
                ================================================== */}

                                <div
                                    className="
                    flex
                    items-start
                    justify-between
                    border-b-[1.5px]
                    border-dashed
                    border-fleet-border
                    pb-[18px]
                    font-mono
                  "
                                >
                                    <div className="text-[10px] tracking-wide text-fleet-muted">
                                        RECOVERY MANIFEST

                                        <strong className="mt-0.5 block text-[12.5px] text-fleet-primary">
                                            NO. FL-9921-R
                                        </strong>
                                    </div>

                                    <div
                                        className="
                      flex
                      items-center
                      gap-1.5
                      rounded-[3px]
                      border
                      border-fleet-amber
                      px-[9px]
                      py-1
                      text-[9.5px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-fleet-amber
                    "
                                    >
                                        Secure
                                    </div>
                                </div>

                                {/* =================================================
                    TITLE
                ================================================== */}

                                <div className="mb-[26px] mt-[22px]">

                                    <div className="text-[10px] uppercase tracking-[0.18em] text-fleet-muted">
                                        Password Recovery
                                    </div>

                                    <h1
                                        className="
                      font-heading
                      mt-1.5
                      text-[27px]
                      font-semibold
                      tracking-tight
                      text-fleet-primary
                    "
                                    >
                                        {sent
                                            ? "Check your inbox."
                                            : "Forgot password?"}
                                    </h1>

                                </div>

                                {/* =================================================
                    SUCCESS STATE
                ================================================== */}

                                {sent ? (
                                    <div className="flex flex-col gap-5">

                                        {/* Success message */}

                                        <div
                                            className="
                        flex
                        items-start
                        gap-3
                        rounded-[2px]
                        border
                        border-fleet-border
                        bg-fleet-panel-raised
                        px-4
                        py-3.5
                      "
                                        >
                                            {/* Mail icon */}

                                            <div
                                                className="
                          mt-0.5
                          flex
                          h-8
                          w-8
                          flex-shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-fleet-green/15
                        "
                                            >
                                                <Mail
                                                    size={16}
                                                    className="text-fleet-green"
                                                />
                                            </div>

                                            {/* Message */}

                                            <div>
                                                <p className="text-[13.5px] leading-6 text-fleet-primary">
                                                    If an account exists for{" "}
                                                    <strong className="font-semibold">
                                                        {email}
                                                    </strong>
                                                    , we&apos;ve sent a secure password
                                                    reset link.
                                                </p>

                                                <p className="mt-1.5 text-[12px] text-fleet-muted">
                                                    The link will expire in 30 minutes.
                                                    Check your spam folder if you don&apos;t
                                                    see it.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Send another */}

                                        <button
                                            type="button"
                                            onClick={handleSendAnother}
                                            className="
                        font-heading
                        flex
                        h-[50px]
                        items-center
                        justify-center
                        gap-2.5
                        rounded-[2px]
                        border
                        border-fleet-border
                        bg-transparent
                        text-sm
                        font-semibold
                        uppercase
                        tracking-[0.1em]
                        text-fleet-primary
                        transition-all
                        hover:bg-fleet-panel-raised
                      "
                                        >
                                            Send another link

                                            <ArrowRight size={16} />
                                        </button>

                                        {/* Back */}

                                        <Link
                                            href="/login"
                                            className="
                        flex
                        items-center
                        justify-center
                        gap-1.5
                        text-xs
                        font-semibold
                        text-fleet-amber
                        hover:underline
                      "
                                        >
                                            <ArrowLeft size={14} />

                                            Back to sign-in
                                        </Link>
                                    </div>
                                ) : (

                                    /* =================================================
                                        RECOVERY FORM
                                    ================================================== */

                                    <form
                                        onSubmit={handleSubmit}
                                        className="flex flex-col gap-[18px]"
                                        noValidate
                                    >

                                        {/* EMAIL */}

                                        <div>

                                            <label
                                                htmlFor="email"
                                                className="
                          mb-[7px]
                          block
                          text-[11px]
                          font-semibold
                          uppercase
                          tracking-wide
                          text-fleet-muted
                        "
                                            >
                                                Email address
                                            </label>

                                            <input
                                                id="email"
                                                type="email"
                                                autoComplete="email"
                                                value={email}
                                                onChange={(e) => {
                                                    setEmail(e.target.value);

                                                    if (error) {
                                                        setError("");
                                                    }
                                                }}
                                                placeholder="Enter your email"
                                                className={`
                          w-full
                          border-b-[1.5px]
                          bg-transparent
                          px-0.5
                          py-2
                          text-[15px]
                          text-fleet-primary
                          outline-none
                          transition-colors
                          placeholder:text-fleet-muted
                          focus:border-fleet-cyan
                          ${error
                                                        ? "border-fleet-error"
                                                        : "border-fleet-border"
                                                    }
                        `}
                                            />

                                            {error && (
                                                <p className="mt-1.5 text-[11.5px] text-fleet-error-text">
                                                    {error}
                                                </p>
                                            )}

                                        </div>

                                        {/* DESCRIPTION */}

                                        <p className="text-[12.5px] leading-5 text-fleet-muted">
                                            Enter the email associated with your dispatcher account. We&apos;ll send a secure one-time password.
                                        </p>

                                        {/* SUBMIT */}

                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="
                        font-heading
                        mt-1.5
                        flex
                        h-[50px]
                        items-center
                        justify-center
                        gap-2.5
                        rounded-[2px]
                        bg-fleet-primary
                        text-sm
                        font-semibold
                        uppercase
                        tracking-[0.1em]
                        text-fleet-base
                        transition-all
                        hover:-translate-y-px
                        hover:bg-fleet-primary/90
                        hover:shadow-[0_10px_24px_color-mix(in_srgb,var(--fleet-primary)_30%,transparent)]
                        active:translate-y-0
                        disabled:cursor-default
                        disabled:opacity-75
                      "
                                        >
                                            {submitting ? (
                                                <>
                                                    <span
                                                        className="
                              h-[15px]
                              w-[15px]
                              animate-spin
                              rounded-full
                              border-2
                              border-white/25
                              border-t-fleet-base
                            "
                                                    />

                                                    Sending…
                                                </>
                                            ) : (
                                                <>
                                                    Send OTP

                                                    <ArrowRight size={16} />
                                                </>
                                            )}
                                        </button>

                                        {/* BACK TO LOGIN */}

                                        <Link
                                            href="/login"
                                            className="
                        flex
                        items-center
                        justify-center
                        gap-1.5
                        text-xs
                        font-semibold
                        text-fleet-amber
                        hover:underline
                      "
                                        >
                                            <ArrowLeft size={14} />

                                            Back to sign-in
                                        </Link>

                                    </form>
                                )}

                                {/* =================================================
                    BARCODE
                ================================================== */}

                                <div
                                    className="
                    mt-[26px]
                    flex
                    items-center
                    justify-between
                    border-t-[1.5px]
                    border-dashed
                    border-fleet-border
                    pt-4
                  "
                                >
                                    <Barcode />

                                    <div
                                        className="
                      text-right
                      font-mono
                      text-[10px]
                      leading-[1.5]
                      tracking-wide
                      text-fleet-muted
                    "
                                    >
                                        TRACKING

                                        <br />

                                        <strong className="text-[11.5px] text-fleet-primary">
                                            9921-8834-R
                                        </strong>
                                    </div>
                                </div>

                            </div>

                            {/* Bottom perforation */}

                            <Perforation edge="bottom" />
                        </div>

                        {/* =================================================
                SECURITY STATUS
            ================================================== */}

                        <div
                            className="
                mt-[22px]
                flex
                items-center
                justify-center
                gap-2
                text-[10px]
                uppercase
                tracking-[0.16em]
                text-fleet-muted
              "
                        >
                            <span className="h-1 w-1 rounded-full bg-fleet-green" />

                            Session encrypted &amp; logged
                        </div>

                    </div>
                </section>
            </div>
        </main>
    );
}