import React from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): React.ReactNode {
  return <>{children}</>;
}
