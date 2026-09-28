import { IconLeaf } from "@tabler/icons-react";

const sizes = {
  sm: { icon: "size-4", padding: "p-1", radius: "rounded-md" },
  md: { icon: "size-5", padding: "p-1.5", radius: "rounded-lg" },
  lg: { icon: "size-8", padding: "p-2", radius: "rounded-xl" },
  xl: { icon: "size-10", padding: "p-3", radius: "rounded-[1rem]" },
} as const;

interface LogoProps {
  size?: keyof typeof sizes;
}

export function Logo({ size = "md" }: LogoProps) {
  const { icon, padding, radius } = sizes[size];

  return (
    <span
      className={`inline-flex bg-primary text-primary-foreground shadow-sm ${padding} ${radius}`}
    >
      <IconLeaf className={icon} />
    </span>
  );
}