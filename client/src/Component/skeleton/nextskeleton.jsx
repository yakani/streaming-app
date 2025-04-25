import React from 'react'

const Nextskeleton = () => {
    const skeletonContacts = Array(8).fill(null);
  return (
    <div>
            {skeletonContacts.map((_, idx) => (
        <div key={idx} className="w-full p-3 flex items-center gap-3">
          {/* Avatar skeleton */}
          <div className="relative mx-auto lg:mx-0">
            <div className="skeleton size-12 " />
          </div>

          {/* User info skeleton - only visible on larger screens */}
          <div className="hidden lg:block text-left min-w-0 flex-1">
            <div className="skeleton h-4 w-32 mb-2" />
            <div className="skeleton h-3 w-16" />
          </div>
        </div>
      ))}

    </div>
  )
}

export default Nextskeleton
