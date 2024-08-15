import { BarChart4, MonitorPlay } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  const sidebarRoutes = [
    { icon: <MonitorPlay />, label: "Courses", path: "/instructor/courses" },
    {
      icon: <BarChart4 />,
      label: "Performance",
      path: "/instructor/performance",
    },
  ];

  return (
    <div className="max-sm:hidden flex flex-col w-64 border-r shadow-md px-3 my-4 gap-4 text-sm font-medium">
      {sidebarRoutes.map((route) => (
        <Link
          href={route.path}
          key={route.path}
          className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#FFF8E8]"
        >
          {route.icon} {route.label}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
