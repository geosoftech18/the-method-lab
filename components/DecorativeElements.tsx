'use client'

export function BlobShape({ className = '', animated = false }: { className?: string; animated?: boolean }) {
  return (
    <svg
      className={`${className} ${animated ? 'animate-blob' : ''}`}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        d="M45.7,-58.2C58.1,-48.1,66.4,-33.2,70.3,-17.8C74.2,-2.4,73.7,13.5,68.5,27.3C63.3,41.1,53.4,52.8,41.2,60.1C29,67.4,14.5,70.3,0.2,70.1C-14.1,69.9,-28.2,66.6,-39.8,59.8C-51.4,53,-60.5,42.7,-66.1,30.8C-71.7,18.9,-73.8,5.4,-71.2,-7.4C-68.6,-20.2,-61.3,-32.3,-51.2,-42.1C-41.1,-51.9,-28.2,-59.4,-14.8,-62.8C-1.4,-66.2,12.5,-65.5,25.4,-61.8C38.3,-58.1,50.1,-51.4,45.7,-58.2Z"
        transform="translate(100 100)"
      />
    </svg>
  )
}

export function AnimatedBlob({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`${className} animate-blob`}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        d="M45.7,-58.2C58.1,-48.1,66.4,-33.2,70.3,-17.8C74.2,-2.4,73.7,13.5,68.5,27.3C63.3,41.1,53.4,52.8,41.2,60.1C29,67.4,14.5,70.3,0.2,70.1C-14.1,69.9,-28.2,66.6,-39.8,59.8C-51.4,53,-60.5,42.7,-66.1,30.8C-71.7,18.9,-73.8,5.4,-71.2,-7.4C-68.6,-20.2,-61.3,-32.3,-51.2,-42.1C-41.1,-51.9,-28.2,-59.4,-14.8,-62.8C-1.4,-66.2,12.5,-65.5,25.4,-61.8C38.3,-58.1,50.1,-51.4,45.7,-58.2Z"
        transform="translate(100 100)"
      />
    </svg>
  )
}

export function CirclePattern({ className = '', animated = false }: { className?: string; animated?: boolean }) {
  return (
    <svg
      className={`${className} ${animated ? 'animate-pulse' : ''}`}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="20" r="2" fill="currentColor" opacity="0.3" className={animated ? 'animate-ping' : ''} style={animated ? { animationDelay: '0s' } : {}} />
      <circle cx="50" cy="20" r="2" fill="currentColor" opacity="0.3" className={animated ? 'animate-ping' : ''} style={animated ? { animationDelay: '0.2s' } : {}} />
      <circle cx="80" cy="20" r="2" fill="currentColor" opacity="0.3" className={animated ? 'animate-ping' : ''} style={animated ? { animationDelay: '0.4s' } : {}} />
      <circle cx="20" cy="50" r="2" fill="currentColor" opacity="0.3" className={animated ? 'animate-ping' : ''} style={animated ? { animationDelay: '0.6s' } : {}} />
      <circle cx="50" cy="50" r="2" fill="currentColor" opacity="0.3" className={animated ? 'animate-ping' : ''} style={animated ? { animationDelay: '0.8s' } : {}} />
      <circle cx="80" cy="50" r="2" fill="currentColor" opacity="0.3" className={animated ? 'animate-ping' : ''} style={animated ? { animationDelay: '1s' } : {}} />
      <circle cx="20" cy="80" r="2" fill="currentColor" opacity="0.3" className={animated ? 'animate-ping' : ''} style={animated ? { animationDelay: '1.2s' } : {}} />
      <circle cx="50" cy="80" r="2" fill="currentColor" opacity="0.3" className={animated ? 'animate-ping' : ''} style={animated ? { animationDelay: '1.4s' } : {}} />
      <circle cx="80" cy="80" r="2" fill="currentColor" opacity="0.3" className={animated ? 'animate-ping' : ''} style={animated ? { animationDelay: '1.6s' } : {}} />
    </svg>
  )
}

export function AnimatedCirclePattern({ className = '' }: { className?: string }) {
  return <CirclePattern className={className} animated={true} />
}

export function WavePattern({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z"
        fill="currentColor"
        opacity="0.05"
      />
    </svg>
  )
}

export function GeometricShape({ className = '', animated = false }: { className?: string; animated?: boolean }) {
  return (
    <svg
      className={`${className} ${animated ? 'animate-spin-slow' : ''}`}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        points="50,10 90,50 50,90 10,50"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.2"
        className={animated ? 'animate-pulse' : ''}
      />
      <polygon
        points="50,20 70,50 50,80 30,50"
        fill="currentColor"
        opacity="0.1"
      />
    </svg>
  )
}

export function AnimatedGeometricShape({ className = '' }: { className?: string }) {
  return <GeometricShape className={className} animated={true} />
}

export function DotsGrid({ className = '', animated = false }: { className?: string; animated?: boolean }) {
  const patternId = `grid-${Math.random().toString(36).substr(2, 9)}`
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id={patternId} width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="1.5" fill="currentColor" opacity="0.2" className={animated ? 'animate-pulse' : ''} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} className={animated ? 'animate-pulse' : ''} />
    </svg>
  )
}

export function AnimatedDotsGrid({ className = '' }: { className?: string }) {
  return <DotsGrid className={className} animated={true} />
}

export function CurvedLine({ className = '', animated = false }: { className?: string; animated?: boolean }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0,25 Q50,10 100,25 T200,25"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.3"
        className={animated ? 'animate-draw' : ''}
        strokeDasharray={animated ? '200' : 'none'}
        strokeDashoffset={animated ? '200' : '0'}
      />
    </svg>
  )
}

export function AnimatedCurvedLine({ className = '' }: { className?: string }) {
  return <CurvedLine className={className} animated={true} />
}

