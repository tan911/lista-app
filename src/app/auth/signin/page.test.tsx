import { expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { describe } from 'node:test'
import Page from './page'

vi.mock('react', async (importOriginal) => {
    const testCache = <T extends (...args: Array<unknown>) => unknown>(func: T) => func
    const originalModule = await importOriginal<typeof import('react')>()
    return {
        ...originalModule,
        cache: testCache,
    }
})

vi.mock('next/font/google', () => ({
    Archivo: () => ({
        style: {
            fontFamily: 'mocked',
        },
    }),
}))

vi.mock('react-dom', async (importOriginal) => {
    const testUseFormStatus = vi.fn(() => {
        return {
            pending: false,
            data: null,
            method: null,
            action: null,
        }
    })
    const originalModule = await importOriginal<typeof import('react-dom')>()
    return {
        ...originalModule,
        useFormStatus: testUseFormStatus,
    }
})

describe('SignIn Page', () => {
    it('Display UI', () => {
        render(<Page />)
        expect(screen.getByRole('heading', { level: 1, name: 'Log in account' })).toBeDefined()
        expect(screen.getByText('Dont have an account?')).toBeDefined()
        expect(screen.getByRole('textbox')).toBeDefined()
        expect(screen.getByRole('button')).toBeDefined()

        expect(screen.getAllByLabelText('Email')).toBeDefined()
        expect(screen.getAllByLabelText('Password')).toBeDefined()

        expect(screen.getByPlaceholderText('your@email.com')).toBeDefined()
        expect(screen.getByPlaceholderText('••••••••••••')).toBeDefined()
    })
})
