import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Skeleton className="h-9 w-32 mb-4" />
        <Skeleton className="h-10 w-80 mb-2" />
        <Skeleton className="h-5 w-full max-w-2xl" />
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-60 mb-2" />
          <Skeleton className="h-4 w-full max-w-md" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-10 w-full max-w-md mb-6" />
          <Skeleton className="h-4 w-full max-w-lg mb-4" />

          <div className="flex justify-between mb-4">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-10 w-32" />
          </div>

          <Skeleton className="h-12 w-full mb-4" />

          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <Skeleton key={i} className="h-16 w-full mb-2" />
          ))}

          <div className="flex justify-between mt-4">
            <Skeleton className="h-5 w-64" />
            <Skeleton className="h-9 w-32" />
          </div>
        </CardContent>
      </Card>

      <Skeleton className="h-64 w-full mt-8" />
    </div>
  )
}

