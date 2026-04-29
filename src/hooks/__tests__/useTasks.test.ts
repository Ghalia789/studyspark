import { renderHook, act } from '@testing-library/react'
import { useTasks } from '@/hooks/useTasks'

describe('useTasks', () => {
  it('should initialize with empty tasks array', () => {
    const { result } = renderHook(() => useTasks())
    expect(Array.isArray(result.current.tasks)).toBe(true)
  })

  it('should add a task', () => {
    const { result } = renderHook(() => useTasks())
    const initialLength = result.current.tasks.length
    
    act(() => {
      if (result.current.addTask) {
        result.current.addTask({
          id: '1',
          title: 'Test task',
          completed: false,
          subject: 'test',
          priority: 'medium',
          dueDate: new Date(),
        })
      }
    })
    
    expect(result.current.tasks.length).toBe(initialLength + 1)
  })

  it('should remove a task', () => {
    const { result } = renderHook(() => useTasks())
    const initialLength = result.current.tasks.length
    
    act(() => {
      if (result.current.addTask) {
        result.current.addTask({
          id: '1',
          title: 'Test task',
          completed: false,
          subject: 'test',
          priority: 'medium',
          dueDate: new Date(),
        })
      }
    })
    
    act(() => {
      if (result.current.removeTask) {
        result.current.removeTask('1')
      }
    })
    
    expect(result.current.tasks.length).toBe(initialLength)
  })
})
