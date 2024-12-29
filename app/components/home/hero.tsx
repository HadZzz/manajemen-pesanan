'use client'; 

// Next Library
import Link from "next/link";

// Radix Components Library
import { Button } from "@/components/ui/button";

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

export const Hero = () => (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -left-4 top-20 h-72 w-72 rounded-full bg-blue-400 opacity-10 blur-3xl"></div>
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-purple-400 opacity-10 blur-3xl"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 pt-24 pb-16 md:pt-32 md:pb-24">
          <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto py-10">
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
);
