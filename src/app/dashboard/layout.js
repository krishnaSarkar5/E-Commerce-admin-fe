import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/navbar/Sidebar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div>{children}</div>
      </div>
    </section>
  );
}
