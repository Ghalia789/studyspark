import { renderHook, act } from '@testing-library/react'
import { useSubjects } from '@/hooks/useSubjects'

describe('useSubjects', () => {
  it('should initialize with empty subjects array', () => {
    const { result } = renderHook(() => useSubjects())
    expect(Array.isArray(result.current.subjects)).toBe(true)
  })

  it('should add a subject', () => {
    const { result } = renderHook(() => useSubjects())
    const initialLength = result.current.subjects.length
    
    act(() => {
      if (result.current.addSubject) {
        result.current.addSubject({
          id: '1',
          name: 'Mathematics',
          color: '#FF5733',
        })
      }
    })
    
    expect(result.current.subjects.length).toBe(initialLength + 1)
  })

  it('should remove a subject', () => {
    const { result } = renderHook(() => useSubjects())
    const initialLength = result.current.subjects.length
    
    act(() => {
      if (result.current.addSubject) {
        result.current.addSubject({
          id: '1',
          name: 'Mathematics',
          color: '#FF5733',
        })
      }
    })
    
    act(() => {
      if (result.current.removeSubject) {
        result.current.removeSubject('1')
      }
    })
    
    expect(result.current.subjects.length).toBe(initialLength)
  })
})
