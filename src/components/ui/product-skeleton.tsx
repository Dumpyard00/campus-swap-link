import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
    return (
        <Card className="overflow-hidden h-full flex flex-col">
            <div className="aspect-square overflow-hidden relative">
                <Skeleton className="h-full w-full" />
            </div>

            <CardContent className="p-4 flex-1 flex flex-col space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />

                <div className="flex items-center justify-between pt-1">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-3 w-12" />
                </div>

                <Skeleton className="h-3 w-24" />
            </CardContent>
        </Card>
    );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 lg:gap-6">
            {Array(count).fill(0).map((_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </div>
    );
}
