import { renderHook } from '@testing-library/react'
import { useSettings } from '@/hooks/useSettings'

describe('useSettings', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should initialize with default settings', () => {
    const { result } = renderHook(() => useSettings())
    expect(result.current.settings).toBeDefined()
  })

  it('should return settings object with theme property', () => {
    const { result } = renderHook(() => useSettings())
    expect(result.current.settings).toHaveProperty('theme')
  })

  it('should have updateSettings function', () => {
    const { result } = renderHook(() => useSettings())
    expect(typeof result.current.updateSettings).toBe('function')
  })
})
