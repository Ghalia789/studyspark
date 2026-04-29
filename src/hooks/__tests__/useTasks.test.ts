import { renderHook} from '@testing-library/react'
import { useTasks } from '@/hooks/useTasks'

describe('useTasks', () => {
  it('returns a tasks tuple with initial data', () => {
    const { result } = renderHook(() => useTasks())
    expect(Array.isArray(result.current[0])).toBe(true)
    expect(typeof result.current[1]).toBe('function')
    expect(result.current[0].length).toBeGreaterThan(0)
  })
})
