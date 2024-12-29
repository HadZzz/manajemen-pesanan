'use client';

// Radix Components Library
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// React Components Library
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const Information = () => (
 	<div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-blue-600" />
                    <div>
                      <h3 className="font-medium mb-1">Alamat</h3>
                      <p className="text-gray-600">
                        Jl. Raya Pedan No. 123<br />
                        Klaten, Jawa Tengah
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-blue-600" />
                    <div>
                      <h3 className="font-medium mb-1">Telepon</h3>
                      <p className="text-gray-600">(0272) 123456</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-blue-600" />
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-gray-600">info@smkpedan.sch.id</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-blue-600" />
                    <div>
                      <h3 className="font-medium mb-1">Jam Operasional</h3>
                      <p className="text-gray-600">
                        Senin - Jumat: 07:00 - 15:00<br />
                        Sabtu: 07:00 - 12:00
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
);