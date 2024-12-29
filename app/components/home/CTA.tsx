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

export const CTA = () => (
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
);