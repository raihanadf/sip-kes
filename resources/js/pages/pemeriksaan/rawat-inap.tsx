import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

// Define types
type StepperItemProps = {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  isCompleted?: boolean;
  onClick?: () => void;
};

type StepperProps = {
  currentStep: number;
  steps: {
    icon: React.ReactNode;
    label: string;
  }[];
  onStepClick: (stepIndex: number) => void;
};

// Icon components
const ClipboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const StethoscopeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
  </svg>
);

const MedicineIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const CoinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Stepper Item Component
const StepperItem: React.FC<StepperItemProps> = ({
  icon,
  label,
  isActive = false,
  isCompleted = false,
  onClick
}) => {
  const getStateClass = () => {
    if (isActive) return "bg-blue-500 text-white";
    if (isCompleted) return "bg-blue-500 text-white";
    return "bg-gray-200 text-gray-600";
  };

  return (
    <div
      className={`flex flex-col items-center ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getStateClass()}`}>
        {icon}
      </div>
      <div className="mt-2 text-center text-sm font-medium">{label}</div>
    </div>
  );
};

// Stepper Component
const Stepper: React.FC<StepperProps> = ({ currentStep, steps, onStepClick }) => {
  return (
    <div className="flex justify-between items-center w-full max-w-3xl mx-auto mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <StepperItem
            icon={step.icon}
            label={step.label}
            isActive={index === currentStep}
            isCompleted={index < currentStep}
            onClick={() => onStepClick(index)}
          />
          {index < steps.length - 1 && (
            <div className="w-full h-1 bg-gray-200">
              <div
                className="h-full bg-blue-500"
                style={{ width: index < currentStep ? "100%" : "0%" }}
              ></div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// Initial Assessment Form Component
const InitialAssessmentForm: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 border-b pb-3">ASESSMENT AWAL RANAP</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Keluhan Utama</label>
            <textarea className="w-full border rounded-md p-2 h-20" />
          </div>

          <div>
            <label className="block mb-1 font-medium">Riwayat Penyakit</label>
            <textarea className="w-full border rounded-md p-2 h-20" />
          </div>

          <div>
            <label className="block mb-1 font-medium">Riwayat Alergi</label>
            <div className="flex items-center space-x-4 mt-1">
              <label className="inline-flex items-center">
                <input type="radio" name="alergi" value="tidak" className="form-radio" />
                <span className="ml-2">Tidak</span>
              </label>
              <label className="inline-flex items-center">
                <input type="radio" name="alergi" value="ya" className="form-radio" />
                <span className="ml-2">Ya</span>
              </label>
            </div>
            <textarea className="w-full border rounded-md p-2 h-16 mt-2" />
          </div>

          <div>
            <label className="block mb-1 font-medium">Riwayat Pengobatan</label>
            <textarea className="w-full border rounded-md p-2 h-20" />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 font-medium">Denyut Jantung</label>
              <div className="flex items-center">
                <input type="text" className="w-full border rounded-md p-2" />
                <span className="ml-2">bpm</span>
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Pernafasan</label>
              <div className="flex items-center">
                <input type="text" className="w-full border rounded-md p-2" />
                <span className="ml-2">x/menit</span>
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Suhu Tubuh</label>
              <div className="flex items-center">
                <input type="text" className="w-full border rounded-md p-2" />
                <span className="ml-2">°C</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Tekanan Darah</label>
            <div className="flex items-center space-x-2">
              <div className="w-1/2">
                <label className="text-sm">Sistole</label>
                <div className="flex items-center">
                  <input type="text" className="w-full border rounded-md p-2" />
                  <span className="ml-2">mmHg</span>
                </div>
              </div>
              <div className="w-1/2">
                <label className="text-sm">Diastole</label>
                <div className="flex items-center">
                  <input type="text" className="w-full border rounded-md p-2" />
                  <span className="ml-2">mmHg</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Skala Nyeri</label>
            <div className="flex items-center space-x-2 mt-1">
              {[0, 2, 4, 6, 8, 10].map((value) => (
                <div key={value} className="flex flex-col items-center">
                  <label className="mb-1">{value}</label>
                  <input type="radio" name="nyeri" value={value} className="form-radio" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Status Psikologi</label>
            <div className="flex flex-wrap gap-3 mt-1">
              {['Tenang', 'Cemas', 'Takut', 'Marah'].map((status) => (
                <label key={status} className="inline-flex items-center">
                  <input type="radio" name="psikologi" value={status.toLowerCase()} className="form-radio" />
                  <span className="ml-2">{status}</span>
                </label>
              ))}
            </div>
            <div className="mt-2">
              <label className="block mb-1 text-sm">Kecenderungan bunuh diri, dilapor ke</label>
              <input type="text" className="w-full border rounded-md p-2" />
            </div>
            <div className="mt-2">
              <label className="block mb-1 text-sm">Lain-lain, tuliskan</label>
              <input type="text" className="w-full border rounded-md p-2" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
          Simpan
        </button>
      </div>
    </div>
  );
};

// Page components for different steps
const PendaftaranPage: React.FC = () => (
  <div className="bg-white p-10 rounded-lg shadow-md text-center">
    <h2 className="text-2xl font-bold mb-4">Page Pendaftaran</h2>
    <p className="text-gray-600">This is the registration page content.</p>
  </div>
);

const LayananPage: React.FC = () => (
  <div className="bg-white p-10 rounded-lg shadow-md text-center">
    <h2 className="text-2xl font-bold mb-4">Page Layanan</h2>
    <p className="text-gray-600">This is the services page content.</p>
  </div>
);

const FarmasiPage: React.FC = () => (
  <div className="bg-white p-10 rounded-lg shadow-md text-center">
    <h2 className="text-2xl font-bold mb-4">Page Farmasi</h2>
    <p className="text-gray-600">This is the pharmacy page content.</p>
  </div>
);

const PembayaranPage: React.FC = () => (
  <div className="bg-white p-10 rounded-lg shadow-md text-center">
    <h2 className="text-2xl font-bold mb-4">Page Pembayaran</h2>
    <p className="text-gray-600">This is the payment page content.</p>
  </div>
);

// Main page component
const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Rawat Inap',
    href: '/rawat-inap',
  },
  {
    title: 'Assessment Awal',
    href: '/rawat-inap/assessment',
  }
];

export default function MedicalStepperPage() {
  // State for current step
  const [currentStep, setCurrentStep] = useState(2); // Default to Pemeriksaan (index 2)

  // Define steps for the stepper
  const steps = [
    { icon: <ClipboardIcon />, label: 'Pendaftaran' },
    { icon: <BriefcaseIcon />, label: 'Layanan' },
    { icon: <StethoscopeIcon />, label: 'Pemeriksaan' },
    { icon: <MedicineIcon />, label: 'Farmasi' },
    { icon: <CoinIcon />, label: 'Pembayaran' }
  ];

  // Handler for step click
  const handleStepClick = (stepIndex: number) => {
    // Skip if clicking the current step
    if (stepIndex === currentStep) return;

    setCurrentStep(stepIndex);
  };

  // Render content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <PendaftaranPage />;
      case 1:
        return <LayananPage />;
      case 2:
        return <InitialAssessmentForm />;
      case 3:
        return <FarmasiPage />;
      case 4:
        return <PembayaranPage />;
      default:
        return <InitialAssessmentForm />;
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Medical Stepper" />
      <div className="py-6 px-4 max-w-7xl mx-auto">
        <Stepper
          currentStep={currentStep}
          steps={steps}
          onStepClick={handleStepClick}
        />
        {renderStepContent()}
      </div>
    </AppLayout>
  );
}
