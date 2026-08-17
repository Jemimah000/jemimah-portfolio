import Doodle from "../common/Doodle";

export default function FloatingDoodles() {
  return (
    <div className="pointer-events-none fixed inset-0 z-10 hidden overflow-hidden lg:block">
      <Doodle
        className="absolute left-[25%] top-[18%] animate-float text-2xl"
      />

      <Doodle
        type="heart"
        className="absolute right-[12%] top-[45%] animate-wiggle text-3xl text-[#ef806d]"
      />

      <Doodle
        type="spark"
        className="absolute bottom-[20%] left-[40%] animate-pulse-soft text-3xl text-[#f4d35e]"
      />
    </div>
  );
}