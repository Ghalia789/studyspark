import React from 'react'
import { render, screen } from '@testing-library/react'
import { Input } from '@/components/Input'

describe('Input Component', () => {
  it('renders input element', () => {
    render(<Input placeholder="Enter text" />)
    const input = screen.getByPlaceholderText('Enter text') as HTMLInputElement
    expect(input).toBeInTheDocument()
  })

  it('handles value changes', () => {
    const { container } = render(<Input placeholder="Enter text" />)
    const input = container.querySelector('input') as HTMLInputElement
    expect(input.value).toBe('')
  })

  it('supports disabled state', () => {
    render(<Input placeholder="Disabled" disabled />)
    const input = screen.getByPlaceholderText('Disabled') as HTMLInputElement
    expect(input.disabled).toBe(true)
  })

  it('supports different types', () => {
    render(<Input type="email" placeholder="Email" />)
    const input = screen.getByPlaceholderText('Email') as HTMLInputElement
    expect(input.type).toBe('email')
  })
})
