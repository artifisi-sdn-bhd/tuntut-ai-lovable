import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface TestimonialProps {
  quote: string
  author: string
  role: string
  avatarUrl?: string
}

export function Testimonial({ quote, author, role, avatarUrl }: TestimonialProps) {
  // Get initials for avatar fallback
  const initials = author
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)

  return (
    <Card className="bg-background border">
      <CardContent className="pt-6">
        <div className="mb-4 text-2xl">"</div>
        <p className="italic text-muted-foreground">{quote}</p>
      </CardContent>
      <CardFooter className="flex items-center gap-4 border-t pt-4">
        <Avatar>
          {avatarUrl ? (
            <img src={avatarUrl || "/placeholder.svg"} alt={author} />
          ) : (
            <AvatarFallback>{initials}</AvatarFallback>
          )}
        </Avatar>
        <div>
          <p className="font-medium">{author}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </CardFooter>
    </Card>
  )
}
