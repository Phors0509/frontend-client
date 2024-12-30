import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Education, Experience } from "@/utils/types/user-profile"

interface EducationExperienceProps {
  educations?: Education[]
  experiences?: Experience[]
}

export function EducationExperienceSection({ educations, experiences }: EducationExperienceProps) {
  return (
    <div className="grid gap-2 md:grid-cols-2">
      <Card className="p-5 dark:bg-[#1e2746] dark:border-gray-700 dark:shadow-md border rounded-md">
        <CardHeader className="pb-5">
          <CardTitle>Education</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {educations?.map((education, index) => (
            <div key={index} className="border-l-2 border-primary pl-4">
              <h4 className="font-medium">{education.academic}</h4>
              <p className="text-sm text-muted-foreground">{education.school}</p>
              {education.major && (
                <p className="text-sm text-muted-foreground">Major: {education.major}</p>
              )}
              <p className="text-sm">{education.year}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="p-5 dark:bg-[#1e2746] dark:border-gray-700 dark:shadow-md border rounded-md">
        <CardHeader className="pb-5">
          <CardTitle>Experience</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {experiences?.map((experience, index) => (
            <div key={index} className="border-l-2 border-primary pl-4">
              <h4 className="font-medium">{experience.position}</h4>
              <p className="text-sm text-muted-foreground">{experience.company}</p>
              <p className="text-sm">{experience.year}</p>
              <p className="text-sm mt-1">{experience.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}