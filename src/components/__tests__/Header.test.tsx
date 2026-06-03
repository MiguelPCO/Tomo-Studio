import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Header from '../layout/Header'

vi.mock('next/navigation', () => ({
  usePathname: () => '/proyectos',
}))

describe('Header', () => {
  it('renders logo link', () => {
    render(<Header />)
    const logoLink = screen.getByRole('link', { name: /Tomo Studio/i })
    expect(logoLink).toBeTruthy()
  })

  it('renders all 6 nav links', () => {
    render(<Header />)
    expect(screen.getAllByText('Proyectos').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Estudio').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Contacto').length).toBeGreaterThan(0)
  })
})
