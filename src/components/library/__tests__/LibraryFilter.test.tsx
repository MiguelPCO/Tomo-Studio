import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import LibraryFilter from '../LibraryFilter'

const defaultProps = {
  view: 'estanteria' as const,
  onViewChange: vi.fn(),
  category: 'todos' as const,
  onCategoryChange: vi.fn(),
  sort: 'recientes' as const,
  onSortChange: vi.fn(),
  search: '',
  onSearchChange: vi.fn(),
  resultCount: 6,
}

describe('LibraryFilter', () => {
  it('renders view toggle buttons', () => {
    render(<LibraryFilter {...defaultProps} />)
    expect(screen.getByText('Estantería')).toBeTruthy()
    expect(screen.getByText('Portadas')).toBeTruthy()
    expect(screen.getByText('Índice')).toBeTruthy()
  })

  it('view button is aria-pressed when active', () => {
    render(<LibraryFilter {...defaultProps} view="portadas" />)
    const portadasBtn = screen.getByText('Portadas')
    expect(portadasBtn.getAttribute('aria-pressed')).toBe('true')
  })

  it('calls onViewChange when view button clicked', () => {
    const onViewChange = vi.fn()
    render(<LibraryFilter {...defaultProps} onViewChange={onViewChange} />)
    fireEvent.click(screen.getByText('Portadas'))
    expect(onViewChange).toHaveBeenCalledWith('portadas')
  })

  it('calls onCategoryChange when category pill clicked', () => {
    const onCategoryChange = vi.fn()
    render(<LibraryFilter {...defaultProps} onCategoryChange={onCategoryChange} />)
    fireEvent.click(screen.getByText('Residencial'))
    expect(onCategoryChange).toHaveBeenCalledWith('residencial')
  })

  it('calls onSearchChange when search input changes', () => {
    const onSearchChange = vi.fn()
    render(<LibraryFilter {...defaultProps} onSearchChange={onSearchChange} />)
    const input = screen.getByRole('searchbox')
    fireEvent.change(input, { target: { value: 'Madrid' } })
    expect(onSearchChange).toHaveBeenCalledWith('Madrid')
  })

  it('shows empty state message when resultCount is 0', () => {
    render(<LibraryFilter {...defaultProps} resultCount={0} />)
    expect(screen.getByText('No hay volúmenes en esta categoría todavía.')).toBeTruthy()
  })

  it('shows count when results > 0', () => {
    render(<LibraryFilter {...defaultProps} resultCount={3} />)
    expect(screen.getByText('3 volúmenes')).toBeTruthy()
  })
})
