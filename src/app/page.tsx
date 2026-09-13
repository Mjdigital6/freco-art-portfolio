import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-6 py-12">
      <Image
        src="/freco-art-logo-4k.png"
        alt="Freco Art LTD logo"
        width={3840}
        height={2096}
        priority
        className="h-auto w-full max-w-5xl"
      />
    </main>
  );
}
