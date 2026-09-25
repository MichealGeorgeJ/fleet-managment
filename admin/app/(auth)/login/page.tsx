"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { DynamicForm } from "@/components/form/DynamicForm";
import { LOGIN_FIELDS } from "@/config/login-fields";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
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
  2, 3, 2, 5, 2, 3, 4, 2, 2, 5,
  3, 2, 4, 2, 3, 2, 5, 2, 3, 4,
  2, 3, 2, 4, 2, 2, 5, 3, 2, 2,
];

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
      {Array.from({ length: 10 }).map(
        (_, index) => (
          <span
            key={index}
            className={`h-[9px] w-[9px] rounded-full bg-fleet-base ${edge === "top"
              ? "-mt-[5px]"
              : "-mb-[5px]"
              }`}
          />
        )
      )}
    </div>
  );
}

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

export default function LoginPage() {

  const router = useRouter();

  const [formState, setFormState] = useState<
    Record<string, string>
  >({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<
    Record<string, string | undefined>
  >({});

  const [submitting, setSubmitting] =
    useState(false);

  const handleFieldChange = (
    name: string,
    value: string
  ) => {
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const signIn = useMutation({
    mutationFn: async () => {
      const res = await _axios.post('/auth/login', formState);
      return res.data;
    },

    onSuccess: () => {
      router.push('/dashboard');
    }
  });

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const nextErrors: Record<
      string,
      string | undefined
    > = {};

    if (!formState.email?.trim()) {
      nextErrors.email =
        "Email address is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formState.email
      )
    ) {
      nextErrors.email =
        "Enter a valid email address";
    }

    if (!formState.password) {
      nextErrors.password =
        "Password is required";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    signIn.mutate();
  };

  return (
    <main className="min-h-screen bg-fleet-base font-sans text-fleet-primary">
      <div className="relative min-h-screen overflow-hidden lg:flex">

        {/* LEFT SIDE */}

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
          <GridOverlay />

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-[radial-gradient(ellipse_900px_600px_at_15%_15%,color-mix(in_srgb,var(--fleet-amber)_14%,transparent),transparent_60%)]
            "
          />

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

          <div className="relative z-10 mt-auto max-w-[520px]">
            <div className="mb-[18px] flex items-center gap-2.5">
              <span className="h-px w-7 bg-fleet-amber" />

              <span className="text-[11px] uppercase tracking-[0.24em] text-fleet-amber">
                Dispatch Control
              </span>
            </div>

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
              Every truck,
              <br />

              <span className="text-fleet-secondary">
                tracked and on time.
              </span>
            </h1>

            <p className="mt-5 max-w-[420px] text-[14.5px] leading-7 text-fleet-secondary">
              Sign in to route vehicles, watch live
              positions, and clear today&apos;s manifest
              before it clears you.
            </p>

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

        {/* RIGHT SIDE */}

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
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-[radial-gradient(ellipse_700px_520px_at_60%_35%,color-mix(in_srgb,var(--fleet-amber)_6%,transparent),transparent_70%)]
            "
          />

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

          <div className="relative z-10 w-full max-w-[420px]">

            <div className="mb-7 flex items-center justify-center gap-2.5 lg:hidden">
              <BrandMark variant="onLight" />

              <span className="text-xl font-semibold text-fleet-primary">
                FLEETOPS
              </span>
            </div>

            <div
              className="
                relative
                rounded-[2px]
                bg-fleet-panel
                text-fleet-primary
              "
            >
              <Perforation edge="top" />

              <div className="h-[3px] w-full bg-gradient-to-r from-fleet-primary via-fleet-cyan to-fleet-amber" />

              <div className="px-[34px] pb-[30px] pt-[32px]">

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
                    ACCESS MANIFEST

                    <strong className="mt-0.5 block text-[12.5px] text-fleet-primary">
                      NO. FL-8823-X
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

                <div className="mb-[26px] mt-[22px]">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-fleet-muted">
                    Dispatcher Sign-In
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
                    Welcome back.
                  </h1>
                </div>

                {/* DYNAMIC FORM */}

                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-[18px]"
                  noValidate
                >
                  <DynamicForm
                    fields={LOGIN_FIELDS}
                    values={formState}
                    errors={errors}
                    onChange={handleFieldChange}
                  />

                  <div className="-mt-1 flex justify-end">
                    <Link
                      href="/forgot-password"
                      className="
                        text-xs
                        font-semibold
                        text-fleet-amber
                        hover:underline
                      "
                    >
                      Forgot password?
                    </Link>
                  </div>

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

                        Verifying…
                      </>
                    ) : (
                      <>
                        Authorize Access
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>

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
                      8823-4471-X
                    </strong>
                  </div>
                </div>
              </div>

              <Perforation edge="bottom" />
            </div>

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