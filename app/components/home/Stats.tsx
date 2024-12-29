'use client'; 

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

export const Stats = () => (
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
);
     