import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Median of Two Sorted Arrays',
  description: 'Find the median of two sorted arrays with O(log(m+n)) complexity',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
