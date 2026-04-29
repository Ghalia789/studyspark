import React from 'react'
import { render, screen } from '@testing-library/react'
import { Card } from '@/components/Card'

describe('Card Component', () => {
  it('renders children content', () => {
    render(<Card>Test content</Card>)
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('applies correct styling classes', () => {
    const { container } = render(<Card>Content</Card>)
    const card = container.firstChild
    expect(card).toHaveClass('rounded-lg')
  })

  it('supports custom className', () => {
    const { container } = render(<Card className="custom-class">Content</Card>)
    const card = container.firstChild
    expect(card).toHaveClass('custom-class')
  })
})
