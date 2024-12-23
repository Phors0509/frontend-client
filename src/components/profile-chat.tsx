import { Avatar, AvatarImage } from "./ui/avatar";

type ProfileChatProp = {
  message?: string;
  profileImage: string;
};

const ProfileChat = ({message, profileImage }: ProfileChatProp) => {
  return (
    <div className="">
        <div className="flex flex-row-reverse h-[40px] items-center gap-4">
          <Avatar className="">
            <AvatarImage className="w-full h-full object-cover rounded-3xl" src={profileImage} alt={message} />
          </Avatar>
          <div className=" dark:text-white">
            <div>{message}</div>
          </div>
        </div>
    </div>
  );
};

export default ProfileChat;
