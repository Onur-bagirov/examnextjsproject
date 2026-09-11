import Header from "@/components/base/header/header";
import Footer from "@/components/base/footer/footer";

export default function WithNavLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}