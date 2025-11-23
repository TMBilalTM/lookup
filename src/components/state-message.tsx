import { ReactNode } from "react";

type StateMessageProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
  variant?: "default" | "error";
};

export function StateMessage({ title, description, icon, variant = "default" }: StateMessageProps) {
  const shared = "rounded-3xl border p-8 text-center";
  const palette =
    variant === "error"
      ? "border-red-500/40 bg-red-500/5 text-red-100"
      : "border-white/10 bg-white/5 text-white";

  return (
    <div className={`${shared} ${palette}`}>
      <div className="flex flex-col items-center gap-4">
        {icon}
        <div>
          <p className="text-lg font-semibold">{title}</p>
          {description && <p className="mt-2 text-sm text-white/70">{description}</p>}
        </div>
      </div>
    </div>
  );
}
