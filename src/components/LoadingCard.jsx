
import React from 'react';

const LoadingCard = () => {
  return (
    <div className="mx-auto w-full max-w-sm rounded-md border h-72 p-4 bg-gray-900">
      <div className="flex animate-pulse space-x-4 flex-col">
        <div className="size-20 w-full rounded-md bg-gray-200 mb-8"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 rounded bg-gray-200"></div>
          <div className="space-y-3">
            <div class="grid grid-cols-3 gap-4">
              <div class="col-span-2 h-2 rounded bg-gray-200"></div>
              <div class="col-span-1 h-2 rounded bg-gray-200"></div>
            </div>
            <div class="h-2 rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingCard;
