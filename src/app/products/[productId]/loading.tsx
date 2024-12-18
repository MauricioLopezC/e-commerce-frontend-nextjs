import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 mg:px-16 lg:px-24 mb-16">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Images Section */}
        <div className="space-y-4">
          <Skeleton className="w-full aspect-square" /> {/* Main image */}
          <div className="flex gap-2">
            <Skeleton className="w-20 h-20" /> {/* Thumbnail */}
            <Skeleton className="w-20 h-20" /> {/* Thumbnail */}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="space-y-6">
          {/* Title and Price */}
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" /> {/* Product title */}
            <Skeleton className="h-6 w-1/4" /> {/* Price */}
          </div>

          {/* Rating */}
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-5 w-5" /> /* Star rating */
            ))}
          </div>

          {/* Size Selection */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" /> {/* "Talle" label */}
            <div className="flex gap-2">
              <Skeleton className="h-10 w-20" /> {/* Size button */}
              <Skeleton className="h-10 w-20" /> {/* Size button */}
            </div>
          </div>

          {/* Color Selection */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" /> {/* "Color" label */}
            <Skeleton className="h-10 w-24" /> {/* Color button */}
          </div>

          {/* Stock Status */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" /> {/* "Stock" label */}
            <Skeleton className="h-12 w-full" /> {/* Availability button */}
          </div>

          {/* Shipping Info */}
          <Skeleton className="h-4 w-3/4" /> {/* Shipping text */}

          {/* Description */}
          <div className="space-y-2">
            <Skeleton className="h-6 w-32" /> {/* "Descripción" heading */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
