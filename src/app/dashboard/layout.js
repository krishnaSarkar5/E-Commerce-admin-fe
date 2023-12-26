import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/navbar/Sidebar";
import { Box } from "@mui/material";

export default function DashboardLayout({
  children, // will be a page or nested layout
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <Navbar />
      <Box className="flex" sx={{ width: "100%" }}>
        <Sidebar />
        <div className="w-full">{children}</div>
      </Box>
    </section>
  );
}
