'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowRight, 
  BarChart2, 
  FileText, 
  Clock, 
  Activity, 
  Trophy,
  ChevronRight,
  Shield,
  Sparkles
} from "lucide-react";
import Link from "next/link";

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface AccessCardProps {
  title: string;
  description: string;
  href: string;
  ctaText: string;
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Modern Design */}
      <div className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -left-4 top-20 h-72 w-72 rounded-full bg-blue-400 opacity-10 blur-3xl"></div>
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-purple-400 opacity-10 blur-3xl"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 pt-24 pb-16 md:pt-32 md:pb-24">
          <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <Trophy className="h-5 w-5" />
              <span className="text-sm font-medium">Sistem Manajemen Produksi #1</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white tracking-tight">
              SMK Kristen <span className="text-blue-600 dark:text-blue-400">PEDAN</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl">
              Tingkatkan efisiensi produksi dengan sistem manajemen modern dan terintegrasi
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/dashboard/login">
                <Button size="lg" className="w-full sm:w-auto text-base group">
                  Mulai Sekarang
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base">
                  Hubungi Kami
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section with Animation */}
      <div className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatsCard
              number="1,000+"
              label="Pesanan Selesai"
              description="Pengalaman menangani berbagai proyek"
            />
            <StatsCard
              number="24/7"
              label="Monitoring"
              description="Pantau produksi kapan saja"
            />
            <StatsCard
              number="98%"
              label="Kepuasan"
              description="Pelanggan puas dengan layanan kami"
            />
          </div>
        </div>
      </div>

      {/* Features Section with Better Visual Hierarchy */}
      <div className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Fitur Unggulan
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Kelola produksi dengan lebih efisien menggunakan fitur-fitur modern yang terintegrasi
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Activity}
              title="Real-time Tracking"
              description="Pantau progress produksi secara langsung dengan pembaruan real-time"
            />
            <FeatureCard
              icon={Shield}
              title="Manajemen Tim"
              description="Kelola dan koordinasikan tim produksi dengan mudah"
            />
            <FeatureCard
              icon={BarChart2}
              title="Analisis Data"
              description="Analisis performa produksi dengan visualisasi data yang informatif"
            />
            <FeatureCard
              icon={FileText}
              title="Laporan Otomatis"
              description="Generate laporan produksi dalam format PDF secara otomatis"
            />
            <FeatureCard
              icon={Clock}
              title="Deadline Tracking"
              description="Monitor dan kelola deadline produksi dengan efektif"
            />
            <FeatureCard
              icon={Sparkles}
              title="Fitur Modern"
              description="Nikmati berbagai fitur modern untuk meningkatkan produktivitas"
            />
          </div>
        </div>
      </div>

      {/* Quick Access Section with Improved Design */}
      <div className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            <AccessCard
              title="Dashboard Produksi"
              description="Akses dashboard untuk mengelola dan memantau proses produksi secara real-time"
              href="/dashboard"
              ctaText="Buka Dashboard"
            />
            <AccessCard
              title="Input Pesanan"
              description="Buat dan kelola pesanan produksi baru dengan mudah dan cepat"
              href="/dashboard?tab=new"
              ctaText="Buat Pesanan"
            />
          </div>
        </div>
      </div>

      {/* CTA Section with Dynamic Design */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-900 dark:to-blue-800">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Siap Meningkatkan Efisiensi Produksi?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Bergabung sekarang dan rasakan kemudahan mengelola produksi dengan sistem modern
            </p>
            <Link href="/dashboard/register">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50 dark:hover:bg-white/90"
              >
                Daftar Sekarang
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const StatsCard = ({ number, label, description }: { number: string; label: string; description: string }) => (
  <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300">
    <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
      {number}
    </div>
    <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
      {label}
    </div>
    <div className="text-gray-600 dark:text-gray-300">
      {description}
    </div>
  </div>
);

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
  <Card className="group hover:shadow-lg transition-all duration-300 dark:bg-gray-800">
    <CardContent className="p-8">
      <div className="mb-6 inline-block rounded-2xl bg-blue-50 dark:bg-blue-900/30 p-4 group-hover:scale-110 transition-transform duration-300">
        <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </CardContent>
  </Card>
);

const AccessCard = ({ title, description, href, ctaText }: AccessCardProps) => (
  <Card className="group hover:shadow-lg transition-all duration-300 dark:bg-gray-800">
    <CardContent className="p-8">
      <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        {description}
      </p>
      <Link href={href}>
        <Button className="w-full sm:w-auto group-hover:translate-x-2 transition-transform">
          {ctaText}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </CardContent>
  </Card>
);