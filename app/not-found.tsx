import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#020712] text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white/80 mb-4">Page Not Found</h2>
        <p className="text-white/60 mb-8">The page you're looking for doesn't exist.</p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-[#2563eb] px-8 py-3 text-base font-semibold text-white shadow-[0_20px_50px_rgba(37,99,235,0.5)] transition-all duration-300 ease-in-out hover:brightness-110 hover:scale-105"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}



