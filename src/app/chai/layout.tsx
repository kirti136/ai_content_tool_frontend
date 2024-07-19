export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <h1>Inner Chid Nav</h1>
      {children}
    </>
  );
}
