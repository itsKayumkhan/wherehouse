import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {" "}
     
      <section className="pb-28 pt-20 bg-gradient-to-b from-background via-70% via-accent/30">
        <div className="container flex flex-col items-center gap-8 sm:gap-10">
          <div
            className="flex cursor-pointer items-center gap-1 rounded-full bg-secondary hover:bg-secondary/60 text-primary px-4 font-medium py-1"
            style={{ opacity: 1, willChange: "auto", transform: "none" }}
          >
            <span className="text-sm">Introducing</span>
          </div>
          <h1
            className="text-center font-heading text-4xl sm:text-5xl tracking-tight lg:text-6xl text-balance font-bold"
            style={{ opacity: 1, willChange: "auto", transform: "none" }}
          >
            The Admin platform to boost your&nbsp;
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-accent to-primary">
              E-commerce Website
            </span>
          </h1>
          <div
            className="flex"
            style={{
              opacity: 1,
              willChange: "auto",
              transform: "translateY(0.4px)",
            }}
          >
            <Link href='/dashboard' className="cursor-pointer"  >
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8 cursor-pointer sm:h-14 sm:text-base sm:px-10 gap-2 bg-gradient-to-br from-accent to-primary via-primary via-60% hover:scale-95 hover:opacity-90 transition-transform group w-full">
                Get Started
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-right transition-transform group-hover:translate-x-1"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </Link>
          </div>
          <div

            style={{
              opacity: 1,
              willChange: "auto",
              transform: "translateY(0.4px)",
            }}
          >
            <Image
              alt="SaaS Dashboard"
              width={1100}
              height={698}
              decoding="async"
              data-nimg={1}

              src="https://res.cloudinary.com/dslgstzex/image/upload/v1733507126/Desktop---104_67e4fa96-2cdf-4df9-bba9-8040dc701e35_kynylz.png"
              style={{ color: "transparent" }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
