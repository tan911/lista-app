import { Lucia } from 'lucia'
import { beforeEach } from 'vitest'
import { mockDeep, mockReset } from 'vitest-mock-extended'

beforeEach(() => {
    mockReset(lucia)
})

const lucia = mockDeep<Lucia>()
export default lucia
