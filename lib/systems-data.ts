export type SystemId = 'powertrain' | 'aerodynamics' | 'electronics'

export type SystemData = {
  id: SystemId
  index: '01' | '02' | '03'
  category: string
  headline: string
  description: string
  primaryImage: string
  secondaryImage: string
}

export const systems: SystemData[] = [
  {
    id: 'powertrain',
    index: '01',
    category: 'Powertrain',
    headline: 'Engine & Drivetrain',
    description:
      'High-output powertrain engineered for consistent delivery across all circuit conditions. Every component tuned for efficiency and peak torque response.',
    primaryImage: '/images/powertrain/primary.png',
    secondaryImage: '/images/powertrain/secondary.png',
  },
  {
    id: 'aerodynamics',
    index: '02',
    category: 'Aerodynamics',
    headline: 'Downforce Architecture',
    description:
      'Computational fluid dynamics validated aero package. Front wing, undertray, and diffuser operating as a unified system to maximize grip at speed.',
    primaryImage: '/images/aerodynamics/primary.png',
    secondaryImage: '/images/aerodynamics/secondary.png',
  },
  {
    id: 'electronics',
    index: '03',
    category: 'Electronics',
    headline: 'Control & Data Systems',
    description:
      'Integrated ECU, sensor array, and telemetry stack. Real-time data acquisition feeds iteration — every lap refines every parameter.',
    primaryImage: '/images/electronics/primary.png',
    secondaryImage: '/images/electronics/secondary.png',
  },
]
