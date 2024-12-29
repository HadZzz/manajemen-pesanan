// Radix Components Library

import { Card, CardContent } from "@/components/ui/card";

// Komponen Skeleton untuk loading state
export const OrderSkeleton = () => (
  <div className="space-y-6">
    {[1, 2, 3].map((index) => (
      <Card key={index} className="w-full">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded w-full"></div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);