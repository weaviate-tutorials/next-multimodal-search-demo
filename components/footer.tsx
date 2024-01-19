'use client'

export default function Footer() {
    return (
        <div className="absolute w-full py-5 text-center">
        <p className="text-gray-500">
          Built with {" "}
          <a
            className="font-semibold text-gray-600 underline-offset-4 transition-colors hover:underline"
            href="https://weaviate.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            Weaviate
          </a>
        </p>
      </div>
    )
}