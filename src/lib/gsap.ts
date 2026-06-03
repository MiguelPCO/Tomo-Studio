import type { gsap as GsapType } from 'gsap'
let gsapInstance: typeof GsapType | null = null
export async function loadGsap(): Promise<typeof GsapType> {
  if (gsapInstance) return gsapInstance
  const mod = await import('gsap')
  gsapInstance = mod.gsap
  return mod.gsap
}
