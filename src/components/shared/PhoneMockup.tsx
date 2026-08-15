import type { GalleryItem } from "@/data/types";

export default function PhoneMockup({ item }: { item: GalleryItem }) {
  if (item.src) {
    return (
      <div className="relative mx-auto w-full max-w-[240px] rounded-[2rem] border-4 border-foreground bg-card p-2 shadow-xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.src}
          alt={item.title}
          className="aspect-[9/19] w-full rounded-[1.5rem] object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className="relative mx-auto w-full max-w-[240px] rounded-[2rem] border-4 border-foreground bg-card p-2 shadow-xl transition-transform hover:-translate-y-1"
      style={{ borderColor: "var(--foreground)" }}
    >
      <div className="relative overflow-hidden rounded-[1.5rem]">
        <div
          className="flex aspect-[9/19] flex-col p-4"
          style={{
            background: `linear-gradient(160deg, ${item.accent}, ${item.accent2})`,
          }}
        >
          <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-black/30" />
          <div className="flex items-center justify-between">
            <span className="h-2 w-16 rounded-full bg-white/50" />
            <span className="h-2 w-2 rounded-full bg-white/40" />
          </div>
          <div className="mt-6 flex flex-col gap-1.5">
            <span className="h-2 w-3/4 rounded-full bg-white/60" />
            <span className="h-2 w-1/2 rounded-full bg-white/40" />
          </div>
          <div className="mt-auto flex flex-col gap-2">
            <div className="rounded-xl bg-black/20 p-3 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/30 text-[10px] font-bold text-white">
                  {item.title.charAt(0)}
                </span>
                <span className="text-[10px] font-semibold text-white">
                  {item.title}
                </span>
              </div>
            </div>
            <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
              <span className="block h-2 w-2/3 rounded-full bg-white/70" />
              <span className="mt-2 block h-2 w-1/3 rounded-full bg-white/40" />
            </div>
            <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
              <span className="block h-2 w-1/2 rounded-full bg-white/70" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}