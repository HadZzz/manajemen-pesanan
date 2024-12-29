'use client'; 

// Radix Components Library
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// React Components Library
import { 
  ArrowRight, 
  BarChart2, 
  FileText, 
  Clock, 
  Activity, 
  ChevronRight,
  Shield,
  Sparkles
} from "lucide-react";

// Initial Tipe Data
interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

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

export const Features = () => (
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
);

