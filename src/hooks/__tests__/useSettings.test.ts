import { renderHook } from '@testing-library/react'
import { useSettings } from '@/hooks/useSettings'

describe('useSettings', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns a settings tuple with theme data', () => {
    const { result } = renderHook(() => useSettings())
    expect(result.current[0]).toHaveProperty('theme')
    expect(typeof result.current[1]).toBe('function')
  })
})
