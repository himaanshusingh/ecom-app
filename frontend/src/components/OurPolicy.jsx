import { assets } from "../assets/assets";

const policyListItems = [
  {
    src: assets.exchange_icon,
    para: "Easy Exchange Policy",
    subPara: "We offer hassle free exchange policy",
  },
  {
    src: assets.quality_icon,
    para: "7 Days Return Policy",
    subPara: "We provide 7 days free return policy",
  },
  {
    src: assets.support_img,
    para: "Best customer support",
    subPara: "We provide 24/7 customer support",
  },
];

export default function OurPolicy() {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      {policyListItems.map(({ src, para, subPara }) => (
        <div key={para}>
          <img src={src} alt="" className="w-12 m-auto mb-5" />
          <p className="font-semibold">{para}</p>
          <p className="text-gray-400">{subPara}</p>
        </div>
      ))}
    </div>
  );
}
