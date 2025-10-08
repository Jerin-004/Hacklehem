export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden">
      {children}
    </div>
  )
} 