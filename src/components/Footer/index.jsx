import { HiOutlineMail } from "react-icons/hi";
import { LiaPhoneVolumeSolid } from "react-icons/lia";
import { FaGithub, FaGlobe, FaLinkedin } from "react-icons/fa6";

export default function Footer() {
  return (
    <div className="max-w-full  px-6 py-4  ">
      <div className="md:max-w-calc flex flex-col gap-8 py-8 md:mx-auto md:flex-row md:flex-wrap md:justify-evenly ">
        <div className="flex flex-col  gap-4 md:items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <img src="/holidayhelper-logo.svg" className="h-8" />
              <h2 className=" text-2xl font-bold">Holiday Helper</h2>
            </div>
            <p className="max-w-[200px] text-wrap text-sm">
              Providing the world with Amazing experiences
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <LiaPhoneVolumeSolid size={20} />
            (+47)555-234-0127
          </div>
          <div className="flex items-center gap-2 text-sm">
            <HiOutlineMail size={20} />
            mail@holidayhelper.com
          </div>
        </div>
        <div className=" flex-col items-center gap-3 md:flex  md:items-start">
          <h3 className="mb-2 text-lg font-semibold">Business</h3>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <p className="cursor-pointer hover:underline">About Us</p>
            <p className="cursor-pointer hover:underline">Solutions</p>
            <p className="cursor-pointer hover:underline">Business Partners</p>
            <p className="cursor-pointer hover:underline">Careers</p>
          </div>
        </div>
        <div className=" flex-col items-center gap-3 md:flex  md:items-start">
          <h3 className="mb-2 text-lg font-semibold">Help and information</h3>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <p className="cursor-pointer hover:underline">Costumer support</p>
            <p className="cursor-pointer hover:underline">Contact us</p>
            <p className="cursor-pointer hover:underline">FAQ</p>
            <p className="cursor-pointer hover:underline">
              Resources for venue Managers
            </p>
          </div>
        </div>
        <div className=" flex-col items-center gap-3 md:flex  md:items-start">
          <h3 className="mb-2 text-lg font-semibold">Legal</h3>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <p className="cursor-pointer hover:underline">Terms</p>
            <p className="cursor-pointer hover:underline">Privacy</p>
            <p className="cursor-pointer hover:underline">Cookies</p>
            <p className="cursor-pointer hover:underline">Licenses</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-4 flex flex-col items-center justify-between gap-4 border-t-2 border-neutral-700 py-2  md:flex-row">
        <div className="space-y-4 text-xs  lg:me-20">
          <p>© 2024 Holiday Helper</p>
          <p>Made By Hallvard Benan</p>
        </div>
        <div className="flex items-center justify-center gap-3 md:justify-end">
          <FaGlobe
            size={20}
            className="cursor-pointer hover:text-neutral-500"
          />
          <FaGithub
            size={23}
            className="cursor-pointer hover:text-neutral-500"
          />
          <FaLinkedin
            size={21}
            className="cursor-pointer hover:text-neutral-500"
          />
        </div>
      </div>
    </div>
  );
}
