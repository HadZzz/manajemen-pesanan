// components/skeletons/OrderSkeleton.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const OrderSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Skeleton untuk 3 order */}
      {[1, 2, 3].map((index) => (
        <Card key={index} className="w-full overflow-hidden">
          <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                {/* Skeleton untuk nama customer */}
                <div className="h-7 w-48 bg-gray-200 animate-pulse rounded" />
                {/* Skeleton untuk nama produk */}
                <div className="h-5 w-36 bg-gray-200 animate-pulse rounded" />
              </div>
              {/* Skeleton untuk status */}
              <div className="h-8 w-32 bg-gray-200 animate-pulse rounded-full" />
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              {/* Skeleton untuk info boxes */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="h-5 w-24 bg-gray-200 animate-pulse rounded" />
                </div>
              ))}
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Skeleton untuk components */}
              {[1, 2].map((i) => (
                <div key={i} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <div className="space-y-2">
                      <div className="h-5 w-32 bg-gray-200 animate-pulse rounded" />
                      <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
                    </div>
                    <div className="h-5 w-16 bg-gray-200 animate-pulse rounded" />
                  </div>
                  {/* Skeleton untuk progress bar */}
                  <div className="h-2 bg-gray-200 rounded-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};