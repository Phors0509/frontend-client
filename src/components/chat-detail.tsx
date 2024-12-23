import { Avatar, AvatarImage } from "./ui/avatar";

type ProfileChatProp = {
  message: string;
  profileImage: string;
};

const ProfileChat = ({message, profileImage }: ProfileChatProp) => {
  return (
    <div className="">
        <div className="flex flex-row-reverse px-6 h-[40px] items-center gap-4">
          <Avatar className="w-[30px] h-[30px]">
            <AvatarImage className="w-full h-full object-cover rounded-3xl" src={profileImage} alt={message} />
          </Avatar>
          <div className=" dark:text-white">
            <div>{message}</div>
          </div>
        </div>
        <div className="flex h-[40px] items-center gap-4">
          <Avatar className="w-[30px] h-[30px]">
            <AvatarImage className="w-full h-full object-cover rounded-3xl" src={profileImage} alt={message} />
          </Avatar>
          <div className=" dark:text-white">
            <div>{message}</div>
          </div>
        </div>
        <div className="flex flex-row-reverse px-6 h-[40px] items-center gap-4">
          <Avatar className="w-[30px] h-[30px]">
            <AvatarImage className="w-full h-full object-cover rounded-3xl" src={profileImage} alt={message} />
          </Avatar>
          <div className=" dark:text-white">
            <div>{message}</div>
          </div>
        </div>
        <div className="flex h-[40px] items-center gap-4">
          <Avatar className="w-[30px] h-[30px]">
            <AvatarImage className="w-full h-full object-cover rounded-3xl" src={profileImage} alt={message} />
          </Avatar>
          <div className=" dark:text-white">
            <div>{message}</div>
          </div>
        </div>
        <div className="flex flex-row-reverse px-6 h-[40px] items-center gap-4">
          <Avatar className="w-[30px] h-[30px]">
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
