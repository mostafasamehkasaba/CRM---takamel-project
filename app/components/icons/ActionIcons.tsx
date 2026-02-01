"use client";

import { ReactNode } from "react";

type IconBaseProps = {
  className?: string;
  children: ReactNode;
};

const IconBase = ({ className = "h-4 w-4", children }: IconBaseProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={`${className} shrink-0`}
  >
    {children}
  </svg>
);

type ActionIconProps = {
  className?: string;
};

export const EditIcon = ({ className }: ActionIconProps) => (
  <IconBase className={className}>
    <path d="M4 18.5V21h2.5L20 7.5l-2.5-2.5L4 18.5Z" />
    <path d="M15.5 5l3 3" />
  </IconBase>
);

export const TrashIcon = ({ className }: ActionIconProps) => (
  <IconBase className={className}>
    <path d="M6 7h12" />
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M19 7v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7h14Z" />
    <path d="M10 11v7" />
    <path d="M14 11v7" />
  </IconBase>
);

export const ViewIcon = ({ className }: ActionIconProps) => (
  <IconBase className={className}>
    <path d="M1.5 12s4.5-7 10.5-7 10.5 7 10.5 7-4.5 7-10.5 7S1.5 12 1.5 12Z" />
    <circle cx={12} cy={12} r={3} />
  </IconBase>
);
