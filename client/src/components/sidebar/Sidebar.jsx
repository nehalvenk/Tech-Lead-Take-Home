import { LayoutDashboard, FileText, Users, BookOpen, BarChart2, User } from "lucide-react";
import { cn } from "../../utils";
import NavItem from "./NavItem";
import UserProfile from "./UserProfile";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Forms", icon: FileText },
  { label: "Users", icon: Users },
  { label: "Manuscripts", icon: BookOpen },
  { label: "Reports", icon: BarChart2 },
  { label: "My profile", icon: User },
];

const Sidebar = ({ user, activeNav = "Dashboard", onNavChange, className }) => {
  return (
    <aside className={cn("w-48 bg-primary-500 flex flex-col min-h-screen flex-shrink-0", className)}>
      <UserProfile name={user.name} isOnline={user.isOnline} />
      <nav className="flex flex-col mt-2 flex-1">
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.label}
            label={item.label}
            icon={item.icon}
            active={activeNav === item.label}
            onClick={() => onNavChange?.(item.label)}
          />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
