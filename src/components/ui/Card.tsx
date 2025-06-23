import React from 'react';
import { CardProps } from '@/types/components';
import { cn } from '@/lib/utils';

const Card: React.FC<CardProps> = ({
  children,
  className,
  padding = 'md',
  shadow = true,
  border = true,
}) => {
  const baseClasses = 'bg-white rounded-lg';

  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const shadowClass = shadow ? 'shadow-soft' : '';
  const borderClass = border ? 'border border-gray-200' : '';

  return (
    <div
      className={cn(
        baseClasses,
        paddingClasses[padding],
        shadowClass,
        borderClass,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
