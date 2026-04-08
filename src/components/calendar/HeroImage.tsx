import { MONTH_IMAGES, MONTH_NAMES } from "@/lib/calendarUtils";

interface HeroImageProps {
  month: number;
  year: number;
}

const HeroImage = ({ month, year }: HeroImageProps) => {
  return (
    <div className="relative w-full overflow-hidden aspect-[4/3]">
      <img
        key={`${month}-${year}`}
        src={MONTH_IMAGES[month]}
        alt={`${MONTH_NAMES[month]} ${year}`}
        className="absolute inset-0 w-full h-full object-cover"
        width={1280}
        height={720}
      />
      <svg
        className="absolute bottom-0 right-0 w-[55%] h-[40%]"
        viewBox="0 0 200 100"
        preserveAspectRatio="none"
      >
        <polygon points="60,0 200,0 200,100 0,100" fill="hsl(200, 85%, 50%)" />
      </svg>
      <div className="absolute bottom-4 right-6 text-right z-10">
        <p className="text-sm md:text-base font-heading font-semibold text-primary-foreground/90 tracking-wider">
          {year}
        </p>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-black text-primary-foreground tracking-wide uppercase">
          {MONTH_NAMES[month]}
        </h1>
      </div>
    </div>
  );
};

export default HeroImage;
