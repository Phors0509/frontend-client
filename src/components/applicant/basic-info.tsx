import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BasicInfo } from "@/utils/types/user-profile"

interface BasicInfoProps {
  basic?: BasicInfo
}

export function BasicInfoSection({ basic }: BasicInfoProps) {
  return (
    <Card className="gap-2 p-5 dark:bg-[#1e2746] dark:border-gray-700 dark:shadow-md border rounded-md">
      <CardHeader className="pb-5">
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 ">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium mb-1">Full Name</h4>
            <p className="text-sm">{basic?.surname} {basic?.lastname}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-1">Career</h4>
            <p className="text-sm">{basic?.career}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-1">Email</h4>
            <p className="text-sm">{basic?.email}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-1">Phone</h4>
            <p className="text-sm">{basic?.phonenumber}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-1">Date of Birth</h4>
            <p className="text-sm">{basic?.dob}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-1">Marital Status</h4>
            <p className="text-sm capitalize">{basic?.martial}</p>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-1">Address</h4>
          <p className="text-sm">{basic?.address}</p>
        </div>
      </CardContent>
    </Card>
  )
}