'use client';
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Award, Star, Medal } from "lucide-react";

const prestasi = [
  {
    tahun: "2024",
    nama: "Juara 1 Lomba Inovasi Teknologi",
    tingkat: "Provinsi",
    penyelenggara: "Dinas Pendidikan Provinsi",
    icon: Trophy
  },
  {
    tahun: "2023",
    nama: "Best Product Innovation",
    tingkat: "Nasional",
    penyelenggara: "Kementerian Pendidikan",
    icon: Award
  },
  {
    tahun: "2023",
    nama: "Juara 2 Kompetisi Keterampilan Siswa",
    tingkat: "Kabupaten",
    penyelenggara: "Dinas Pendidikan Kabupaten",
    icon: Star
  },
  {
    tahun: "2022",
    nama: "Penghargaan Sekolah Inovatif",
    tingkat: "Provinsi",
    penyelenggara: "Gubernur Jawa Tengah",
    icon: Medal
  }
];

export default function PrestasiPage() {
  return (
    <div className="container mx-auto p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-4">Prestasi SMK PEDAN</h1>
          <p className="text-gray-600">
            Berbagai pencapaian dan penghargaan yang telah diraih
          </p>
        </div>

        <div className="grid gap-6">
          {prestasi.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <Icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{item.nama}</h3>
                          <p className="text-gray-600">{item.penyelenggara}</p>
                        </div>
                        <span className="text-sm font-medium bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                          {item.tahun}
                        </span>
                      </div>
                      <div className="mt-4">
                        <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                          Tingkat {item.tingkat}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
} 