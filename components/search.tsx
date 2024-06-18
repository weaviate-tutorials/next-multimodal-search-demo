'use client'

import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"

export default function Search(
    { placeholder }: { placeholder: string},
    
    ) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (term) {
            params.set("search", term)
        } else {
            params.delete("search")
        }
        replace(pathname + "?" + params)
    }, 300);
    return (
        <div className="pt-20">
            <div className="relative">
                <label htmlFor="search" className="sr-only"> Search </label>
                <input
                    type="search"
                    id="search"
                    placeholder={placeholder}
                    onChange={(e) => handleSearch(e.target.value)}
                    defaultValue={searchParams.get("search")?.toString()}
                    className="w-[400px] h-12 rounded-md bg-gray-200 p-2 shadow-sm sm:text-sm"
                />
            </div>
        </div>
    )
}