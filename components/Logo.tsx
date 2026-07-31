import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("relative block h-6 w-6 shrink-0", className)}>
      <Image
        src="/brand/percepta-logo.png"
        alt="PERCEPTA"
        fill
        sizes="24px"
        className="object-contain invert"
        priority
      />
    </span>
  );
}
