import React from 'react';
import { ProgressBarProps } from '@/types/components';
import { cn } from '@/lib/utils';

const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  className,
}) => {
  const percentage = Math.min(Math.max((current / total) * 100, 0), 100);

  return (
    <div className={cn('w-full', className)}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">
          進捗状況
        </span>
        <span className="text-sm text-gray-500">
          {current} / {total}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-primary-500 h-2.5 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="text-center mt-1">
        <span className="text-xs text-gray-500">
          {Math.round(percentage)}% 完了
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
