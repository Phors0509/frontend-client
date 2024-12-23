import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Star, Trash } from "lucide-react";
import { useState } from "react";

type UserProfileProp = {
  name: string;
  job?: string;
  profileImage?: string;
  isFavorite?: boolean;
  onDelete?: () => void;
};
const UserProfile: React.FC<UserProfileProp> = ({
  name,
  job,
  profileImage,
  isFavorite = false,
  onDelete,
}) => {
  const [favorite, setFavorite] = useState<boolean>(isFavorite);
  const toggleFavorite = () => {
    setFavorite(!favorite);
  };
  return (
    <>
      <div className=" h-[500px]">
        <div className="  flex items-center justify-between">
          <div className="flex h-[72px] items-center gap-4">
            <Avatar className="w-[40px] h-[40px]">
              <AvatarImage
                className="w-full h-full object-cover rounded-3xl"
                src={profileImage}
                alt={name}
              />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="font-medium dark:text-white">
              <div>{name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {job}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Star
              onClick={toggleFavorite}
              className={`w-[15px] h-[15px] cursor-pointer transition-colors duration-200 ${
                favorite ? "text-orange-400" : "text-gray-400"
              }`}
            />
            <Trash
              onClick={onDelete}
              className="w-[15px] h-[15px] cursor-pointer text-gray-400 hover:text-red-500"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex h-[72px] items-center gap-4">
            <Avatar className="w-[40px] h-[40px]">
              <AvatarImage
                className="w-full h-full object-cover rounded-3xl"
                src={profileImage}
                alt={name}
              />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="font-medium dark:text-white">
              <div>{name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {job}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Star
              onClick={toggleFavorite}
              className={`w-[15px] h-[15px] cursor-pointer transition-colors duration-200 ${
                favorite ? "text-orange-400" : "text-gray-400"
              }`}
            />
            <Trash
              onClick={onDelete}
              className="w-[15px] h-[15px] cursor-pointer text-gray-400 hover:text-red-500"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex h-[72px] items-center gap-4">
            <Avatar className="w-[40px] h-[40px]">
              <AvatarImage
                className="w-full h-full object-cover rounded-3xl"
                src={profileImage}
                alt={name}
              />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="font-medium dark:text-white">
              <div>{name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {job}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Star
              onClick={toggleFavorite}
              className={`w-[15px] h-[15px] cursor-pointer transition-colors duration-200 ${
                favorite ? "text-orange-400" : "text-gray-400"
              }`}
            />
            <Trash
              onClick={onDelete}
              className="w-[15px] h-[15px] cursor-pointer text-gray-400 hover:text-red-500"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex h-[72px] items-center gap-4">
            <Avatar className="w-[40px] h-[40px]">
              <AvatarImage
                className="w-full h-full object-cover rounded-3xl"
                src={profileImage}
                alt={name}
              />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="font-medium dark:text-white">
              <div>{name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {job}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Star
              onClick={toggleFavorite}
              className={`w-[15px] h-[15px] cursor-pointer transition-colors duration-200 ${
                favorite ? "text-orange-400" : "text-gray-400"
              }`}
            />
            <Trash
              onClick={onDelete}
              className="w-[15px] h-[15px] cursor-pointer text-gray-400 hover:text-red-500"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex h-[72px] items-center gap-4">
            <Avatar className="w-[40px] h-[40px]">
              <AvatarImage
                className="w-full h-full object-cover rounded-3xl"
                src={profileImage}
                alt={name}
              />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="font-medium dark:text-white">
              <div>{name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {job}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Star
              onClick={toggleFavorite}
              className={`w-[15px] h-[15px] cursor-pointer transition-colors duration-200 ${
                favorite ? "text-orange-400" : "text-gray-400"
              }`}
            />
            <Trash
              onClick={onDelete}
              className="w-[15px] h-[15px] cursor-pointer text-gray-400 hover:text-red-500"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex h-[72px] items-center gap-4">
            <Avatar className="w-[40px] h-[40px]">
              <AvatarImage
                className="w-full h-full object-cover rounded-3xl"
                src={profileImage}
                alt={name}
              />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="font-medium dark:text-white">
              <div>{name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {job}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Star
              onClick={toggleFavorite}
              className={`w-[15px] h-[15px] cursor-pointer transition-colors duration-200 ${
                favorite ? "text-orange-400" : "text-gray-400"
              }`}
            />
            <Trash
              onClick={onDelete}
              className="w-[15px] h-[15px] cursor-pointer text-gray-400 hover:text-red-500"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex h-[72px] items-center gap-4">
            <Avatar className="w-[40px] h-[40px]">
              <AvatarImage
                className="w-full h-full object-cover rounded-3xl"
                src={profileImage}
                alt={name}
              />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="font-medium dark:text-white">
              <div>{name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {job}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Star
              onClick={toggleFavorite}
              className={`w-[15px] h-[15px] cursor-pointer transition-colors duration-200 ${
                favorite ? "text-orange-400" : "text-gray-400"
              }`}
            />
            <Trash
              onClick={onDelete}
              className="w-[15px] h-[15px] cursor-pointer text-gray-400 hover:text-red-500"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex h-[72px] items-center gap-4">
            <Avatar className="w-[40px] h-[40px]">
              <AvatarImage
                className="w-full h-full object-cover rounded-3xl"
                src={profileImage}
                alt={name}
              />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="font-medium dark:text-white">
              <div>{name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {job}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Star
              onClick={toggleFavorite}
              className={`w-[15px] h-[15px] cursor-pointer transition-colors duration-200 ${
                favorite ? "text-orange-400" : "text-gray-400"
              }`}
            />
            <Trash
              onClick={onDelete}
              className="w-[15px] h-[15px] cursor-pointer text-gray-400 hover:text-red-500"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default UserProfile;
