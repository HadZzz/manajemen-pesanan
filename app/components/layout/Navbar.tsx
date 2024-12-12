'use client';
import { Button } from "@/components/ui/button";
import { Home, LayoutDashboard, Trophy, Phone, Menu, X, LogOut, UserCircle } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "sonner";

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, checkAuth } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check auth status when component mounts
  useEffect(() => {
    console.log("Current user state:", user);
    checkAuth();
  }, [checkAuth, user]);

  // Monitor user state changes
  useEffect(() => {
    console.log("User state changed:", user);
  }, [user]);

  useEffect(() => {
    console.log("Check auth state:", checkAuth);
  }, [checkAuth]);

  useEffect(() => {
    console.log("User state and check auth state:", user, checkAuth);
  }, [user, checkAuth]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Berhasil logout');
      router.push('/dashboard/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Gagal logout');
    }
  };

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/prestasi", icon: Trophy, label: "Prestasi" },
    { href: "/contact", icon: Phone, label: "Contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white border-b z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Trophy className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-xl">SMK Kristen PEDAN</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={pathname === item.href ? "default" : "ghost"}
                      className="flex items-center space-x-2"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Button>
                  </Link>
                );
              })}

              {/* Auth Button */}
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-md">
                    <UserCircle className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Button>
                </div>
              ) : (
                <Link href="/dashboard/login">
                  <Button variant="default" className="flex items-center gap-2">
                    <UserCircle className="h-4 w-4" />
                    <span>Login</span>
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={pathname === item.href ? "default" : "ghost"}
                      className="w-full justify-start space-x-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Button>
                  </Link>
                );
              })}
              
              {/* Mobile Auth Button */}
              {user ? (
                <>
                  <div className="px-3 py-2 bg-gray-50 rounded-md">
                    <div className="flex items-center gap-2">
                      <UserCircle className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">{user.email}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="w-full justify-start space-x-2 text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Button>
                </>
              ) : (
                <Link href="/dashboard/login" className="block">
                  <Button variant="default" className="w-full">
                    Login
                  </Button>
                </Link>
              )}
            </div>

            {/* Footer Info in Mobile Menu */}
            <div className="border-t p-4">
              <div className="text-sm text-gray-500 space-y-1">
                <p className="font-medium">SMK PEDAN</p>
                <p>Sistem Informasi Manajemen</p>
                <p>© 2024</p>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer untuk mencegah konten tertutup navbar */}
      <div className="h-16" />
    </>
  );
};