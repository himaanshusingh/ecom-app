import logo from "../assets/logo.jpg";

export default function Footer() {
  return (
    <div className="w-full md:h-[36vh] h-[21vh] mb-19.25 md:mb-0">
      <div className="w-full md:h-[30vh] h-[15vh]  md:mb-0  flex items-center justify-center md:px-12.5 px-1.25">
        <div className="md:w-[30%] w-[35%] h-full flex items-start justify-center flex-col gap-1.25  mt-0">
          <div className="flex items-start justify-start gap-1.25 mt-1.25 md:mt-10">
            <img
              src={logo}
              alt=""
              className="md:w-10 md:h-10 w-5 h-5 rounded-lg"
            />
            <p className="text-[19px] md:text-5 text-[black] ">OneCart</p>
          </div>
          <p className="text-[15px] text-[#1e2223] hidden md:block">
            coCart is your all-in-one online shopping destination, offering
            top-quality products, unbeatable deals, and fast delivery—all backed
            by trusted service designed to make your life easier every day.
          </p>
          <p className="text-[15px] text-[#1e2223] flex md:hidden">
            Fast. Easy. Reliable. OneCart Shopping
          </p>
        </div>
        <div className="md:w-[25%] w-[30%] h-full flex items-center justify-center flex-col text-center">
          <div className="flex items-center justify-center gap-1.25 mt-2.5 md:mt-10">
            <p className="text-[19px] md:text-5 text-[#1e2223] font-sans ">
              COMPANY
            </p>
          </div>
          <ul>
            <li className="text-[15px] text-[#1e2223] hidden md:block cursor-pointer">
              Home
            </li>
            <li className="text-[15px] text-[#1e2223] cursor-pointer ">
              About us
            </li>
            <li className="text-[15px] text-[#1e2223] hidden md:block cursor-pointer">
              Delivery
            </li>
            <li className="text-[15px] text-[#1e2223] cursor-pointer">
              Privacy Policy
            </li>
          </ul>
        </div>

        <div className="md:w-[25%] w-[40%]  h-full flex items-center justify-center flex-col text-center ">
          <div className="flex items-center justify-center gap-1.25 mt-2.5 md:mt-10">
            <p className="text-[19px] md:text-[20px] text-[#1e2223] font-sans ">
              GET IN TOUCH
            </p>
          </div>
          <ul>
            <li className="text-[15px] text-[#1e2223] ">+91-9876543210</li>
            <li className="text-[15px] text-[#1e2223] ">contact@onecart.com</li>
            <li className="text-[15px] text-[#1e2223] hidden md:block">
              +1-123-456-7890
            </li>
            <li className="text-[15px] text-[#1e2223] hidden md:block">
              admin@onecart.com
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full h-px bg-slate-400 mt-4"></div>
      <div className="w-full h-[5vh] bg-[#dbfcfcec] flex items-center justify-center">
        Copyright 2025@onecart.com-All Rights Reserved
      </div>
    </div>
  );
}
