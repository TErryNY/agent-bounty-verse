import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

const QuestSkeleton = () => {
    return (
        <Card className="glass p-6 space-y-4">
            {/* Header skeleton */}
            <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-8 w-20" />
            </div>

            {/* Description skeleton */}
            <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
            </div>

            {/* Footer skeleton */}
            <div className="flex items-center justify-between pt-4">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-10 w-28" />
            </div>
        </Card>
    );
};

export default QuestSkeleton;
