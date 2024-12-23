import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Expertise, Skill } from "@/utils/types/user-profile"

interface SkillsExpertiseProps {
  skills?: Skill[]
  expertise?: Expertise[]
}

export function SkillsExpertiseSection({ skills, expertise }: SkillsExpertiseProps) {
  return (
    <div className="grid gap-2 md:grid-cols-2">
      <Card className="p-5">
        <CardHeader className="pb-5">
          <CardTitle>Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {skills?.map((skill, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{skill.name}</span>
                <span className="text-sm text-muted-foreground">{skill.percent}%</span>
              </div>
              <Progress value={skill.percent} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="p-5">
        <CardHeader className="pb-5">
          <CardTitle>Expertise</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {expertise?.map((item, index) => (
              <Badge key={index} variant="secondary">
                {item.name} - {item.proficiency}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}