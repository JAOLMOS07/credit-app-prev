import ThemeButton from "@/components/ThemeButton/ThemeButton";

export const dynamic = 'force-dynamic';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    {children}
    <ThemeButton/>
    </>
    
  );
}
