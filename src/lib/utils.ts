type ClassValue = string | undefined | null | false | ClassValue[]

export function cn(...inputs: ClassValue[]): string {
  return (inputs as unknown[])
    .flat(Infinity)
    .filter(Boolean)
    .join(' ')
}
