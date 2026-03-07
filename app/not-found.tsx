"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  const [count, setCount] = useState<number>(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(redirect);
    };
  }, [router]);

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50">
      
      {/* Floating blobs */}
      <div className="absolute w-80 h-80 bg-orange-200/60 blur-3xl rounded-full top-20 left-20 animate-blob"></div>
      <div className="absolute w-80 h-80 bg-amber-200/60 blur-3xl rounded-full bottom-20 right-20 animate-blob delay-2000"></div>
      <div className="absolute w-80 h-80 bg-pink-200/50 blur-3xl rounded-full top-1/2 left-1/2 animate-blob delay-4000"></div>

      {/* Content */}
      <div className="relative text-center max-w-xl px-6">
        <h1 className="text-[120px] font-black text-orange-500 leading-none">
          404
        </h1>

        <h2 className="text-3xl font-bold text-gray-900 mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-600 mt-4">
          Looks like this page got lost somewhere on the internet. Let our
          digital team guide you back.
        </p>

        <p className="mt-4 text-sm text-gray-500">
          Redirecting to homepage in{" "}
          <span className="text-orange-500 font-bold">{count}</span>s
        </p>

        <Link
          href="/"
          className="inline-block mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition shadow-md"
        >
          Back to Home
        </Link>
      </div>

      <style jsx>{`
        .animate-blob {
          animation: blob 9s infinite;
        }

        .delay-2000 {
          animation-delay: 2s;
        }

        .delay-4000 {
          animation-delay: 4s;
        }

        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(40px, -40px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
      `}</style>
    </div>
  );
}