import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Language, Reference } from "@/utils/types/user-profile"

interface LanguagesReferencesProps {
  languages?: Language[]
  references?: Reference[]
}

export function LanguagesReferencesSection({ languages, references }: LanguagesReferencesProps) {
  return (
    <div className="grid gap-2 md:grid-cols-2">
      <Card className="p-5">
        <CardHeader className="pb-5">
          <CardTitle>Languages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {languages?.map((language, index) => (
              <Badge key={index} variant="outline">
                {language.name} - {language.proficiency}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="p-5">
        <CardHeader className="pb-5">
          <CardTitle>References</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {references?.map((reference, index) => (
            <div key={index} className="space-y-2">
              <h4 className="font-medium">{reference.name}</h4>
              <p className="text-sm text-muted-foreground">{reference.career} at {reference.company}</p>
              <div className="text-sm">
                <p>Email: {reference.email}</p>
                <p>Phone: {reference.phonenumber}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}