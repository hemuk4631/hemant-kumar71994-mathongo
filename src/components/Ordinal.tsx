import React from 'react';

type OrdinalProps = {
  value: number;
  className?: string;
};

function getOrdinalSuffix(n: number): string {
  if (n % 100 >= 11 && n % 100 <= 13) return 'th';
  switch (n % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

export const Ordinal: React.FC<OrdinalProps> = ({ value, className }) => {
  const suffix = getOrdinalSuffix(value);

  return (
    <span className={`inline-flex items-baseline ${className}`}>
      <span className="text-md font-medium">{value}</span>
      <span className="relative -top-0.5 text-md font-medium">{suffix}</span>
    </span>
  );
};
