'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

import { Information } from "@/app/components/contact/Information";
import { Form } from "@/app/components/contact/Form";

export default function ContactPage() {
  return (
    <div className="container mx-auto p-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-4">Hubungi Kami</h1>
          <p className="text-gray-600">
            Silakan hubungi kami untuk informasi lebih lanjut
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <Information />

          {/* Contact Form */}
          <Form />
        </div>
      </div>
    </div>
  );
} 