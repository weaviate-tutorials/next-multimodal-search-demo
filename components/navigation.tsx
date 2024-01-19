'use client'

import Link from "next/link"

export default function Navigation() {
  const scrolled = false;

    return (
      <div
      className={`fixed top-0 w-full ${scrolled
        ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
        : "bg-white/0"
        } z-30 transition-all`}
    >
      <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
        <Link href="/" className="flex items-center font-display text-2xl">
          <p>multimodal search</p>
        </Link>
        <div className="flex items-center space-x-4">
          <a
            href="https://vercel.com/templates/next.js/spirals"
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-3 py-1.5 text-sm text-white transition-colors hover:bg-white hover:text-black sm:flex"
          >
            <p>read more in our docs</p>
          </a>
          <a
            href="https://vercel.com/templates/next.js/spirals"
            target="_blank"
            rel="noopener noreferrer"
            className="sm:hidden"
          >
            <svg
              width="1155"
              height="1000"
              viewBox="0 0 1155 1000"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
            >
              <path d="M577.344 0L1154.69 1000H0L577.344 0Z" fill="black" />
            </svg>
          </a>
          <a
            href="https://github.com/malgamves"
            target="_blank"
            rel="noopener noreferrer"
          >
          </a>
        </div>
      </div>
    </div>
    )
}