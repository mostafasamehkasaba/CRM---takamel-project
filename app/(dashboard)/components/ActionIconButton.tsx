"use client";

import { ReactNode } from "react";

type Tone = "default" | "danger";

const toneClasses: Record<Tone, string> = {
  default: "border-(--dash-border) text-(--dash-muted) hover:border-(--dash-primary) hover:text-(--dash-primary)",
  danger: "border-rose-500 text-rose-500 hover:border-rose-400 hover:text-rose-500",
};

type ActionIconButtonProps = {
  label: string;
  icon: ReactNode;
  tone?: Tone;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};

const ActionIconButton = ({
  label,
  icon,
  tone = "default",
  className = "",
  onClick,
  disabled = false,
}: ActionIconButtonProps) => {
  const classes = ["rounded-lg", "border", "px-2", "py-1", "text-xs", "transition", toneClasses[tone]];
  if (className) {
    classes.push(className);
  }

  return (
    <button type="button" aria-label={label} className={classes.join(" ")} onClick={onClick} disabled={disabled}>
      {icon}
    </button>
  );
};

export default ActionIconButton;
