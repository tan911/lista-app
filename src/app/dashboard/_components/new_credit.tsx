'use client'

import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

const NewCreditSchema = z.object({
    name: z.string().min(1, {
        message: 'Name is a required field',
    }),
})

export default function NewCredit() {
    const form = useForm<z.infer<typeof NewCreditSchema>>({
        resolver: zodResolver(NewCreditSchema),
        defaultValues: {
            name: '',
        },
    })
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary">
                    <Plus className="h-5 w-5" />
                    <span className="ml-1 hidden md:block">New credit</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="mb-3">
                    <DialogTitle className="text-2xl text-neutral-600">New credit</DialogTitle>
                    <DialogDescription className="sr-only">
                        This action will add customer credit
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <Form {...form}>
                        <form>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="rounded-lg p-1.5 focus-within:bg-neutral-200/60">
                                        <FormItem className="border space-y-0 px-3 py-2 rounded-lg bg-white focus-within:border-neutral-800">
                                            <FormLabel htmlFor="name" className="text-neutral-400">
                                                Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="border-none outline-none text-md text-neutral-600 p-0 h-6 font-bold placeholder:text-neutral-400/70 focus-visible:ring-none focus-visible:ring-0"
                                                    id="name"
                                                    type="text"
                                                    placeholder="customer's name"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    </FormItem>
                                )}
                            />
                            <FormItem className="mt-2 rounded-lg p-1.5 focus-within:bg-neutral-200/80 md:mt-5">
                                <Button
                                    type="submit"
                                    variant={'default'}
                                    className="w-full rounded-lg font-bold text-md tracking-wide bg-gradient-to-r from-neutral-700 to-neutral-800 transition-hover ease-in-out delay-150 hover:from-neutral-600 hover:to-neutral-900 focus-visible:outline-none focus-visible:ring-0 md:h-11"
                                >
                                    Add credit
                                </Button>
                            </FormItem>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
