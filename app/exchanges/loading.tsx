import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Skeleton className="h-10 w-80 mb-2" />
        <Skeleton className="h-5 w-full max-w-2xl" />
      </div>

      <Card className="mb-8">
        <CardHeader className="pb-3">
          <Skeleton className="h-6 w-60 mb-2" />
          <Skeleton className="h-4 w-full" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>

      <div className="rounded-lg border overflow-hidden">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-6 w-full max-w-[800px]" />
          </div>

          {Array(10)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="flex items-center justify-between py-4 border-t">
                <div className="flex items-center">
                  <Skeleton className="h-10 w-10 rounded-full mr-3" />
                  <Skeleton className="h-6 w-40" />
                </div>
                <Skeleton className="h-6 w-20" />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

