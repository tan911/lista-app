import { useFormStatus } from 'react-dom'
import { LoaderCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Submit({ message, classname }: { message: string; classname: string }) {
    const { pending } = useFormStatus()
    return (
        <Button
            type="submit"
            variant={'default'}
            className={`w-full rounded-lg font-bold text-md tracking-wide bg-gradient-to-r from-neutral-700 to-neutral-800 transition-hover ease-in-out delay-150 hover:from-neutral-600 hover:to-neutral-900 focus-visible:outline-none focus-visible:ring-0 md:h-11 ${classname}`}
        >
            {pending ? <LoaderCircle size={24} className="text-gray-300 animate-spin" /> : message}
        </Button>
    )
}
