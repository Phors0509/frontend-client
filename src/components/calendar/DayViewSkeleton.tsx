// import { Skeleton } from "@/components/ui/skeleton";

// export const DayViewSkeleton = () => (
//   <div className="grid grid-cols-2 gap-4">
//     {/* Time column */}
//     <div className="space-y-6">
//       {Array.from({ length: 24 }).map((_, i) => (
//         <Skeleton key={i} className="h-4 w-20" />
//       ))}
//     </div>

//     {/* Events column */}
//     <div className="space-y-4">
//       {Array.from({ length: 6 }).map((_, i) => (
//         <Skeleton 
//           key={i} 
//           className="h-24 w-full" 
//           style={{ opacity: Math.random() > 0.6 ? 1 : 0 }}
//         />
//       ))}
//     </div>
//   </div>
// );