import { renderHook, act } from '@testing-library/react'
import { useSubjects } from '@/hooks/useSubjects'

describe('useSubjects', () => {
  it('returns a subjects tuple with initial data', () => {
    const { result } = renderHook(() => useSubjects())
    expect(Array.isArray(result.current[0])).toBe(true)
    expect(typeof result.current[1]).toBe('function')
    expect(result.current[0].length).toBeGreaterThan(0)
  })
})
