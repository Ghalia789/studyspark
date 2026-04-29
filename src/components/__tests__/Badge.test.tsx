import React from 'react'
import { render, screen } from '@testing-library/react'
import { Badge } from '@/components/Badge'

describe('Badge Component', () => {
  it('renders badge with text', () => {
    render(<Badge>New</Badge>)
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('supports variant prop', () => {
    render(<Badge variant="success">Complete</Badge>)
    expect(screen.getByText('Complete')).toBeInTheDocument()
  })

  it('supports color prop', () => {
    const { container } = render(<Badge color="blue">Tag</Badge>)
    const badge = container.firstChild
    expect(badge).toBeInTheDocument()
  })

  it('applies correct styling', () => {
    const { container } = render(<Badge>Label</Badge>)
    const badge = container.firstChild
    expect(badge).toHaveClass('inline-block')
  })
})
