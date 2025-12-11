import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { getUser, getMenuItemsByRole, logout, getToken, API_BASE } from "@/lib/auth";
import { toast } from "sonner";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = getUser();
  const menuItems = user ? getMenuItemsByRole(user.role) : [];

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = async () => {
    const token = getToken();
    try {
      await fetch(`${API_BASE}/auth/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {
      // continue with logout even if API fails
    }
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <>
      <aside
        className={cn(
          "fixed left-0 transition-transform duration-300 ease-in-out z-40",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{
          top: "80px",
          width: "270px",
          height: "calc(100vh - 80px)",
          backgroundColor: "#384E66",
        }}
      >
        <nav className="py-4 h-full flex flex-col">
          <div className="flex-1">
            {menuItems.map((item) => {
              if ("subItems" in item && item.subItems) {
                const isExpanded = expandedMenu === item.name;
                const hasActiveChild = item.subItems.some(
                  (sub) => location.pathname === sub.path
                );
                return (
                  <div key={item.name}>
                    <button
                      onClick={() =>
                        setExpandedMenu(isExpanded ? null : item.name)
                      }
                      className={cn(
                        "w-full flex items-center justify-between px-6 py-4 text-primary-foreground transition-all",
                        "hover:bg-sidebar-hover",
                        hasActiveChild && "bg-sidebar-hover"
                      )}
                    >
                      <span className="text-base">{item.name}</span>
                      <ChevronDown
                        size={18}
                        className={cn(
                          "transition-transform duration-200",
                          isExpanded && "rotate-180"
                        )}
                      />
                    </button>
                    {isExpanded && (
                      <div style={{ backgroundColor: "#2F4256" }}>
                        {item.subItems.map((subItem) => (
                          <NavLink
                            key={subItem.path}
                            to={subItem.path}
                            className={({ isActive }) =>
                              cn(
                                "flex items-center gap-3 px-12 py-3 text-primary-foreground transition-all text-sm",
                                "hover:bg-sidebar-active",
                                isActive &&
                                  "bg-sidebar-active border-l-4 border-primary-foreground"
                              )
                            }
                          >
                            <span>{subItem.name}</span>
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <NavLink
                  key={item.name}
                  to={item.path!}
                  className={({ isActive }) =>
                    cn(
                      "block px-6 py-4 text-primary-foreground text-base",
                      "hover:bg-sidebar-hover",
                      isActive && "bg-sidebar-hover"
                    )
                  }
                >
                  {item.name}
                </NavLink>
              );
            })}
          </div>

          <div className="px-6 py-4 border-t border-primary-foreground/20">
            <button
              onClick={handleLogoutClick}
              className="w-full flex items-center gap-3 text-primary-foreground hover:bg-sidebar-hover p-2 rounded transition-all"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/50">
          <div
            className="rounded-lg shadow-lg p-6 w-80"
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <h3 className="text-lg font-medium mb-4" style={{ color: "#384E66" }}>
              Confirm Logout
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Are you sure you want to logout?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-4 py-2 rounded border hover:bg-muted/50"
                style={{ color: "#384E66" }}
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 px-4 py-2 rounded text-primary-foreground"
                style={{ backgroundColor: "#384E66" }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
