interface BrandLogoProps {
  size?: number;
  color?: string;
  className?: string;
}

export function BrandLogoMark({ size = 32, color = "#F5D134", className }: BrandLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Top-left petal */}
      <rect
        x="10" y="32" width="80" height="38" rx="19"
        fill={color}
        transform="rotate(45 50 51)"
      />
      {/* Top-right petal */}
      <rect
        x="110" y="32" width="80" height="38" rx="19"
        fill={color}
        transform="rotate(-45 150 51)"
      />
      {/* Bottom-left petal */}
      <rect
        x="10" y="130" width="80" height="38" rx="19"
        fill={color}
        transform="rotate(-45 50 149)"
      />
      {/* Bottom-right petal */}
      <rect
        x="110" y="130" width="80" height="38" rx="19"
        fill={color}
        transform="rotate(45 150 149)"
      />
      {/* Four accent dots */}
      <circle cx="100" cy="13"  r="11" fill={color} />
      <circle cx="100" cy="187" r="11" fill={color} />
      <circle cx="13"  cy="100" r="11" fill={color} />
      <circle cx="187" cy="100" r="11" fill={color} />
    </svg>
  );
}
