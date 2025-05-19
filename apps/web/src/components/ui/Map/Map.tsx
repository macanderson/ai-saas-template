import { Icons } from "../../Icons"
import {
  RiHome9Fill,
  RiPlaneLine,
  RiSignalTowerFill,
  RiTruckFill,
} from "@remixicon/react"
import { SVGMap } from "./SVGMap"

export const Map = () => {
  return (
    <section
      id="farm-management"
      aria-labelledby="management-title"
      className="relative flex w-full max-w-6xl scroll-my-24 flex-col items-center justify-center overflow-hidden rounded-2xl bg-gray-950 px-10 shadow-2xl shadow-black/50 sm:px-16 md:px-28 lg:mx-auto"
    >
      <div className="absolute left-0 z-10 h-full backdrop-blur-[2px]">
        <svg
          className="h-full w-8 border-r border-zinc-900 stroke-zinc-800 sm:w-20"
          style={{
            maskImage:
              "linear-gradient(transparent, white 10rem, white calc(100% - 10rem), transparent)",
          }}
        >
          <defs>
            <pattern
              id="diagonal-border-pattern"
              patternUnits="userSpaceOnUse"
              width="64"
              height="64"
            >
              {Array.from({ length: 17 }, (_, i) => {
                const offset = i * 8
                return (
                  <path
                    key={i}
                    d={`M${-106 + offset} 110L${22 + offset} -18`}
                    stroke=""
                    strokeWidth="1"
                  />
                )
              })}
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#diagonal-border-pattern)"
          />
        </svg>
      </div>
      <div className="absolute right-0 z-10 h-full backdrop-blur-[2px]">
        <svg
          className="h-full w-8 border-r border-zinc-900 stroke-zinc-800 sm:w-20"
          style={{
            maskImage:
              "linear-gradient(transparent, white 10rem, white calc(100% - 10rem), transparent)",
          }}
        >
          <defs>
            <pattern
              id="diagonal-border-pattern"
              patternUnits="userSpaceOnUse"
              width="64"
              height="64"
            >
              {Array.from({ length: 17 }, (_, i) => {
                const offset = i * 8
                return (
                  <path
                    key={i}
                    d={`M${-106 + offset} 110L${22 + offset} -18`}
                    stroke=""
                    strokeWidth="1"
                  />
                )
              })}
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#diagonal-border-pattern)"
          />
        </svg>
      </div>

      <div className="pt-12 text-base font-semibold tracking-tight text-orange-400 sm:pt-20 sm:text-lg">
        Farm Management
      </div>
      <h2
        id="management-title"
        className="text-balance mt-6 max-w-[700px] text-center text-2xl font-semibold tracking-tight text-white md:text-5xl"
      >
        Monitoring & Control for Precision Agriculture
      </h2>
      <p className="text-balance mt-4 max-w-2xl text-center text-base text-gray-400 sm:mt-8 sm:text-xl">
        Complete oversight of your farming operations across fields, irrigation
        systems, and aerial monitoring, delivering insights even in remote rural
        locations.
      </p>

      <div className="relative mb-10 ml-[17rem] mt-20 scale-90 sm:mb-16 md:ml-0 md:mt-24 md:scale-100">
        <SVGMap className="w-[50rem] shrink-0" />
        <div className="absolute -top-3 left-[130px]">
          <div className="relative flex items-center justify-center">
            <div className="size-10 ring-white/15 absolute rounded-full bg-gray-950 ring-1"></div>
            <div className="ring-white/15 absolute -right-[3.7rem] -top-4 flex w-fit items-center justify-center whitespace-nowrap rounded-full bg-gray-950 px-1.5 py-0.5 text-xs text-white ring-1">
              Scanning
            </div>
            <RiPlaneLine className="size-5 relative rotate-90 text-white" />
            <div
              style={{
                animationDelay: "3.5s",
              }}
              className="size-10 absolute animate-[ping_5s_ease_infinite] rounded-full ring-1 ring-orange-500/50"
            ></div>
          </div>
        </div>
        <div className="absolute left-[243px] top-[73px]">
          <div className="relative flex items-center justify-center">
            <div className="size-10 ring-white/15 absolute rounded-full bg-gray-950 ring-1"></div>
            <div className="ring-white/15 absolute -right-[3.7rem] -top-4 flex w-fit items-center justify-center whitespace-nowrap rounded-full bg-gray-950 px-1.5 py-0.5 text-xs text-white ring-1">
              Irrigating
            </div>
            <Icons.QuadCopter className="size-5 relative rotate-90 text-white" />
            <div
              style={{
                animationDelay: "3.5s",
              }}
              className="size-10 absolute animate-[ping_5s_ease_infinite] rounded-full ring-1 ring-orange-500/50"
            ></div>
          </div>
        </div>
        <div className="absolute right-[300px] top-32">
          <div className="relative flex items-center justify-center">
            <div className="size-10 ring-white/15 absolute rounded-full bg-gray-950 ring-1"></div>
            <div className="ring-white/15 absolute -right-[3.7rem] -top-4 flex w-fit items-center justify-center whitespace-nowrap rounded-full bg-gray-950 px-1.5 py-0.5 text-xs text-white ring-1">
              Scanning
            </div>
            <RiPlaneLine className="size-5 relative rotate-90 text-white" />
            <div
              style={{
                animationDelay: "3.5s",
              }}
              className="size-10 absolute animate-[ping_5s_ease_infinite] rounded-full ring-1 ring-orange-500/50"
            ></div>
          </div>
        </div>
        <div className="absolute right-[390px] top-20">
          <div className="relative flex items-center justify-center">
            <div className="size-10 ring-white/15 absolute rounded-full bg-gray-950 ring-1"></div>
            <RiHome9Fill className="size-5 relative text-white" />
          </div>
        </div>
        <div className="absolute right-[430px] top-12">
          <div className="relative flex items-center justify-center">
            <div className="size-10 ring-white/15 absolute rounded-full bg-gray-950 ring-1"></div>
            <div className="ring-white/15 absolute -right-7 -top-4 flex w-fit items-center justify-center whitespace-nowrap rounded-full bg-gray-950 px-1.5 py-0.5 text-xs text-white ring-1">
              Idle
            </div>
            <RiTruckFill className="size-5 relative text-white" />
          </div>
        </div>
        <div className="absolute right-56 top-9">
          <div className="relative flex items-center justify-center">
            <RiSignalTowerFill className="size-5 z-10 text-white" />
            <div className="size-10 ring-white/15 absolute rounded-full bg-gray-950 ring-1 backdrop-blur-sm"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
