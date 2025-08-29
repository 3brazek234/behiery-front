'use client'

import { Star } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Review } from "@/types/product"

interface ReviewsProps {
  reviews: Review[]
}

export function ReviewsView({ reviews }: ReviewsProps) {
  if (!reviews || reviews.length === 0) {
    return (
      <p className="text-center text-gray-500 text-sm">
        لا توجد مراجعات بعد
      </p>
    )
  }

  return (
    <div className="space-y-4 mt-6 w-full max-w-4xl">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        التقييمات ({reviews.length})
      </h2>

      {reviews.map((review) => (
        <Card
          key={review.id}
          className="rounded-none !border-b  shadow-none border-none transition-all duration-200 !p-0 space-y-3"
        >
          <CardHeader className="flex flex-row items-center gap-3 p-0">
            <Avatar>
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${review.user.name}`} />
              <AvatarFallback>
                {review.user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {review.user.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(review.created_at).toLocaleDateString("ar-EG")}
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 p-0">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.round(parseFloat(review.rate))
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-xs text-muted-foreground ms-1">
                {parseFloat(review.rate).toFixed(1)} / 5
              </span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {review.review}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
