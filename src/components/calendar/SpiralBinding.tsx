const SpiralBinding = () => {
  const rings = 15;

  return (
    <div className="relative w-full flex items-center justify-center h-8 z-10">
      <div className="absolute top-1/2 -translate-y-1/2 w-[85%] h-[3px] bg-gradient-to-r from-transparent via-foreground/20 to-transparent rounded-full" />

      <div className="flex items-center justify-center gap-[clamp(6px,2.5vw,18px)] relative">
        {Array.from({ length: rings }, (_, i) => (
          <div
            key={i}
            className="w-[clamp(8px,1.5vw,14px)] h-[clamp(14px,2.5vw,24px)] rounded-full border-[1.5px] border-foreground/30 bg-background"
            style={{
              boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
            }}
          />
        ))}
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center">
        <div className="w-[2px] h-4 bg-foreground/30" />
        <div className="w-4 h-2 border-[1.5px] border-foreground/30 border-b-0 rounded-t-full" />
      </div>
    </div>
  );
};

export default SpiralBinding;
