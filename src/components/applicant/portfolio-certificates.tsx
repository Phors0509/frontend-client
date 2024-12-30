import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { Certificate, Portfolio } from "@/utils/types/user-profile"
import Image from "next/image"
import { ScrollArea } from "../ui/scroll-area"

interface PortfolioCertificatesProps {
  portfolio?: Portfolio[]
  certificates?: Certificate[]
}

export function PortfolioCertificatesSection({ portfolio, certificates }: PortfolioCertificatesProps) {
  return (
    <div className="grid gap-2 md:grid-cols-2">

      <Card className="p-5 dark:bg-[#1e2746] dark:border-gray-700 dark:shadow-md border rounded-md">
        <CardHeader className="pb-5">
          <CardTitle>Portfolio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {portfolio?.map((item, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-between"
                asChild
              >
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <span>{item.name}</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="p-5 dark:bg-[#1e2746] dark:border-gray-700 dark:shadow-md border rounded-md">
        <ScrollArea className="h-96">
        <CardHeader className="pb-5">
          <CardTitle>Certificates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {certificates?.map((cert, index) => (
              <Image
                key={index}
                src={cert.url}
                alt={`Certificate ${index + 1}`}
                className="rounded-lg border"
                width={300}
                height={300}
              />
            ))}
          </div>
        </CardContent>
      </ScrollArea>
      </Card>

    </div>
  )
}