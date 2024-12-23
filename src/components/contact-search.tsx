import { Home, Slash } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const ContactSearch = () => {
  return (
    <div className="bg-white w-11/12  h-[65px] border shadow-sm border-gray-300 m-auto rounded-md flex">
      <Input
        placeholder="Contact App"
        className=" h-full p-[24px] bg-white border-none"
      />
      <div className="flex gap-1 px-4 items-center ">
        <Home />
        <Slash />
        <Button className="text-orange-400 bg-orange-200 rounded-2xl">Contact</Button>
      </div>
    </div>
  );
};
export default ContactSearch;
