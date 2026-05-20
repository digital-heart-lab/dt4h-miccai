import type { FunctionalComponent } from 'vue'
import {
  BookMarked,
  FlaskConical,
  Github,
  Globe,
  GraduationCap,
  Library,
  Linkedin,
  Mail,
  Twitter,
} from 'lucide-vue-next'

type IconComponent = FunctionalComponent

export interface LinkIcon {
  icon: IconComponent
  label: string
}

export function hostnameOf(href: string): string {
  try {
    return new URL(href).hostname.replace(/^www\./, '')
  } catch {
    if (href.startsWith('mailto:')) return href.replace(/^mailto:/, '')
    return href
  }
}

const HONORIFICS = /^(prof\.?|dr\.?|mr\.?|mrs\.?|ms\.?)$/i

export function keynoteSlug(name: string): string {
  const tokens = name
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^A-Za-z\s.-]/g, '')
    .split(/\s+/)
    .filter(tok => tok && !HONORIFICS.test(tok))
  const surname = tokens[tokens.length - 1] ?? name
  return surname.toLowerCase().replace(/[^a-z0-9]/g, '')
}

export function iconForUrl(href: string): LinkIcon {
  if (href.startsWith('mailto:')) {
    return { icon: Mail as IconComponent, label: 'Email' }
  }

  const host = hostnameOf(href).toLowerCase()

  if (host.includes('linkedin.com')) return { icon: Linkedin as IconComponent, label: 'LinkedIn' }
  if (host.includes('github.com')) return { icon: Github as IconComponent, label: 'GitHub' }
  if (host.includes('twitter.com') || host.includes('x.com')) return { icon: Twitter as IconComponent, label: host }
  if (host.includes('pubmed') || host.includes('scholar.google') || host.includes('orcid')) {
    return { icon: BookMarked as IconComponent, label: 'Publications' }
  }
  if (host.includes('researchgate') || host.includes('semanticscholar')) {
    return { icon: Library as IconComponent, label: host }
  }

  if (
    host.endsWith('.edu') ||
    host.includes('ethz.ch') ||
    host.includes('uzh.ch') ||
    host.includes('ins-amu.fr') ||
    host.includes('amu.fr') ||
    host.includes('cam.ac.uk') ||
    host.includes('ox.ac.uk') ||
    host.includes('mit.edu')
  ) {
    return { icon: GraduationCap as IconComponent, label: 'University' }
  }

  if (host.startsWith('cmr.') || host.startsWith('lab.') || host.includes('-lab.') || host.includes('.lab.')) {
    return { icon: FlaskConical as IconComponent, label: 'Lab' }
  }

  return { icon: Globe as IconComponent, label: host }
}
