export default function ClientsMarquee() {
  const brands = [
    'AURA LUXURY',
    'CHRONOS CO.',
    'SOLSTICE STU',
    'NOVA MOTORS',
    'APEX GROUP',
    'VELO CLOTHING',
    'WILD WANDER',
    'ASCEND AI'
  ];

  return (
    <section className="py-16 bg-neutral-950 border-y border-white/5 overflow-hidden select-none">
      <div className="w-full flex">
        {/* Double list for infinite loop */}
        <div className="animate-marquee flex whitespace-nowrap gap-16 md:gap-24 items-center">
          {brands.concat(brands).map((brand, idx) => (
            <span
              key={idx}
              className="text-2xl md:text-4xl font-extrabold tracking-tighter text-neutral-700 hover:text-white transition-colors duration-300 font-syne flex items-center gap-4 cursor-default"
            >
              {brand}
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff6b00]" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
