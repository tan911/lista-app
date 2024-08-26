import { expect, it, vi, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import Submit from './submit'

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

describe('Submit Button', () => {
    it('should display submit button', () => {
        render(<Submit message="continue" classname="font-bold" />)
        expect(screen.getByRole('button')).toBeDefined()
    })
})
