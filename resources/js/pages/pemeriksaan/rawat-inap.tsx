import React, { useState } from "react"
import { Clipboard, Briefcase, Stethoscope, Pill, Coins } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AppLayout from "@/layouts/app-layout"
import { Head } from "@inertiajs/react"

type BreadcrumbItem = {
  title: string
  href: string
}

export default function RawatInapPage() {
  const [currentStep, setCurrentStep] = useState(2)

  const steps = [
    { icon: <Clipboard className="h-6 w-6" />, label: "Pendaftaran" },
    { icon: <Briefcase className="h-6 w-6" />, label: "Layanan" },
    { icon: <Stethoscope className="h-6 w-6" />, label: "Pemeriksaan" },
    { icon: <Pill className="h-6 w-6" />, label: "Farmasi" },
    { icon: <Coins className="h-6 w-6" />, label: "Pembayaran" },
  ]

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex === currentStep) return
    setCurrentStep(stepIndex)
  }

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: "Rawat Inap",
      href: "/rawat-inap",
    },
    {
      title: "Assessment Awal",
      href: "/rawat-inap/assessment",
    },
  ]

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Rawat Inap" />
      <div className="py-6 px-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-center w-full max-w-3xl mx-auto mb-8">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div
                className={`flex flex-col items-center ${index !== currentStep ? "cursor-pointer" : ""}`}
                onClick={() => handleStepClick(index)}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${index === currentStep
                  ? "bg-primary text-primary-foreground"
                  : index < currentStep
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                  }`}>
                  {step.icon}
                </div>
                <div className="mt-2 text-center text-sm font-medium">{step.label}</div>
              </div>
              {index < steps.length - 1 && (
                <div className="w-full h-1 bg-muted">
                  <div
                    className="h-full bg-primary"
                    style={{ width: index < currentStep ? "100%" : "0%" }}
                  ></div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Content based on currentStep */}
        {currentStep === 0 && (
          <Card>
            <CardContent className="p-10 text-center">
              <h2 className="text-2xl font-bold mb-4">Page Pendaftaran</h2>
              <p className="text-muted-foreground">Pendaftaran.</p>
            </CardContent>
          </Card>
        )}

        {currentStep === 1 && (
          <Card>
            <CardContent className="p-10 text-center">
              <h2 className="text-2xl font-bold mb-4">Page Layanan</h2>
              <p className="text-muted-foreground">Layanan.</p>
            </CardContent>
          </Card>
        )}

        {currentStep === 2 && (
          <Card>
            <CardHeader className="text-center border-b">
              <CardTitle className="text-2xl">ASESSMENT AWAL RANAP</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="keluhan">Keluhan Utama</Label>
                    <Textarea id="keluhan" className="h-20" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="riwayat-penyakit">Riwayat Penyakit</Label>
                    <Textarea id="riwayat-penyakit" className="h-20" />
                  </div>

                  <div className="space-y-2">
                    <Label>Riwayat Alergi</Label>
                    <RadioGroup defaultValue="tidak" className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="tidak" id="alergi-tidak" />
                        <Label htmlFor="alergi-tidak">Tidak</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="ya" id="alergi-ya" />
                        <Label htmlFor="alergi-ya">Ya</Label>
                      </div>
                    </RadioGroup>
                    <Textarea id="alergi-detail" className="h-16" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pengobatan">Riwayat Pengobatan</Label>
                    <Textarea id="pengobatan" className="h-20" />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="denyut-jantung">Denyut Jantung</Label>
                      <div className="flex items-center">
                        <Input id="denyut-jantung" />
                        <span className="ml-2">bpm</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pernafasan">Pernafasan</Label>
                      <div className="flex items-center">
                        <Input id="pernafasan" />
                        <span className="ml-2">x/menit</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="suhu">Suhu Tubuh</Label>
                      <div className="flex items-center">
                        <Input id="suhu" />
                        <span className="ml-2">°C</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Tekanan Darah</Label>
                    <div className="flex items-center space-x-2">
                      <div className="w-1/2 space-y-1">
                        <Label htmlFor="sistole" className="text-sm">
                          Sistole
                        </Label>
                        <div className="flex items-center">
                          <Input id="sistole" />
                          <span className="ml-2">mmHg</span>
                        </div>
                      </div>
                      <div className="w-1/2 space-y-1">
                        <Label htmlFor="diastole" className="text-sm">
                          Diastole
                        </Label>
                        <div className="flex items-center">
                          <Input id="diastole" />
                          <span className="ml-2">mmHg</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Skala Nyeri</Label>
                    <RadioGroup defaultValue="0" className="flex items-center justify-between">
                      {[0, 2, 4, 6, 8, 10].map((value) => (
                        <div key={value} className="flex flex-col items-center">
                          <Label htmlFor={`nyeri-${value}`} className="mb-1">
                            {value}
                          </Label>
                          <RadioGroupItem value={value.toString()} id={`nyeri-${value}`} />
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label>Status Psikologi</Label>
                    <RadioGroup defaultValue="tenang" className="flex flex-wrap gap-3">
                      {["Tenang", "Cemas", "Takut", "Marah"].map((status) => (
                        <div key={status} className="flex items-center space-x-2">
                          <RadioGroupItem value={status.toLowerCase()} id={`psikologi-${status.toLowerCase()}`} />
                          <Label htmlFor={`psikologi-${status.toLowerCase()}`}>{status}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                    <div className="mt-2 space-y-1">
                      <Label htmlFor="bunuh-diri" className="text-sm">
                        Kecenderungan bunuh diri, dilapor ke
                      </Label>
                      <Input id="bunuh-diri" />
                    </div>
                    <div className="mt-2 space-y-1">
                      <Label htmlFor="lain-lain" className="text-sm">
                        Lain-lain, tuliskan
                      </Label>
                      <Input id="lain-lain" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button>Simpan</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 3 && (
          <Card>
            <CardContent className="p-10 text-center">
              <h2 className="text-2xl font-bold mb-4">Page Farmasi</h2>
              <p className="text-muted-foreground">Farmasi.</p>
            </CardContent>
          </Card>
        )}

        {currentStep === 4 && (
          <Card>
            <CardContent className="p-10 text-center">
              <h2 className="text-2xl font-bold mb-4">Page Pembayaran</h2>
              <p className="text-muted-foreground">Pembayaran.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  )
}
