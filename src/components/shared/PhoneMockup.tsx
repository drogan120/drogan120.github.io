import type { GalleryItem } from "@/data/types";
import type { GallerySize } from "@/hooks/useGallery";

const FRAME_BASE =
  "relative mx-auto w-full rounded-[1.75rem] border-[3px] border-foreground bg-card p-1.5 shadow-lg sm:rounded-[2rem] sm:border-4 sm:p-2";

const FRAME_MAX: Record<GallerySize, string> = {
  sm: "max-w-[140px]",
  md: "max-w-[180px]",
  lg: "max-w-[220px]",
};

/** Inner detail scales with the frame so small phones don't look cluttered. */
const COMPACT: Record<GallerySize, boolean> = {
  sm: true,
  md: false,
  lg: false,
};

export default function PhoneMockup({
  item,
  size = "lg",
  className = "",
}: {
  item: GalleryItem;
  size?: GallerySize;
  className?: string;
}) {
  const frame = `${FRAME_BASE} ${FRAME_MAX[size]} ${className}`;
  const compact = COMPACT[size];

  if (item.src) {
    return (
      <div className={frame}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.src}
          alt={item.title}
          loading="lazy"
          className="aspect-[9/19] w-full rounded-[1.35rem] object-cover sm:rounded-[1.5rem]"
        />
      </div>
    );
  }

  return (
    <div className={frame}>
      <div className="relative overflow-hidden rounded-[1.35rem] sm:rounded-[1.5rem]">
        <div
          aria-hidden
          className={`flex aspect-[9/19] flex-col ${compact ? "p-2" : "p-2.5 sm:p-4"}`}
          style={{
            background: `linear-gradient(160deg, ${item.accent}, ${item.accent2})`,
          }}
        >
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-black/30 sm:mb-4 sm:w-12" />

          <div className="flex items-center justify-between gap-2">
            <span className="h-1.5 w-12 rounded-full bg-white/50 sm:h-2 sm:w-16" />
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/40 sm:h-2 sm:w-2" />
          </div>

          <div className="mt-5 flex flex-col gap-1.5 sm:mt-6">
            <span className="h-1.5 w-3/4 rounded-full bg-white/60 sm:h-2" />
            <span className="h-1.5 w-1/2 rounded-full bg-white/40 sm:h-2" />
          </div>

          <div className="mt-auto flex flex-col gap-1.5 sm:gap-2">
            <div className="rounded-lg bg-black/20 p-2 backdrop-blur-sm sm:rounded-xl sm:p-3">
              <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/30 text-[9px] font-bold text-white sm:h-6 sm:w-6 sm:text-[10px]">
                  {item.title.charAt(0)}
                </span>
                <span className="min-w-0 truncate text-[9px] font-semibold text-white sm:text-[10px]">
                  {item.title}
                </span>
              </div>
            </div>
            {!compact && (
              <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm sm:rounded-xl sm:p-3">
                <span className="block h-1.5 w-2/3 rounded-full bg-white/70 sm:h-2" />
                <span className="mt-1.5 block h-1.5 w-1/3 rounded-full bg-white/40 sm:mt-2 sm:h-2" />
              </div>
            )}
            <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm sm:rounded-xl sm:p-3">
              <span className="block h-1.5 w-1/2 rounded-full bg-white/70 sm:h-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
