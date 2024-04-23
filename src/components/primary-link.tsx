import React, { ReactNode } from 'react';
import Link from 'next/link';

interface PrimaryLinkProps {
  href: string;
  children: ReactNode;
}

export default function PrimaryLink({ href, children, ...props }: PrimaryLinkProps) {
  return (
    <Link
      href={href}
      {...props}
      className="bg-green-teal hover:bg-emerald text-white font-semibold text-sm uppercase px-4 py-2 rounded-full">
      {children}
    </Link>
  );
}

