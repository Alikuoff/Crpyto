import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Skeleton className="h-10 w-80 mx-auto mb-4" />
          <Skeleton className="h-6 w-full max-w-lg mx-auto" />
        </div>

        <Skeleton className="h-12 w-full mb-6" />

        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-full max-w-md" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-8">
              <Skeleton className="h-40 w-40 rounded-full mx-auto" />
              <div className="space-y-4 flex-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-40 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>

        <Skeleton className="h-40 w-full mt-12" />
      </div>
    </div>
  )
}

