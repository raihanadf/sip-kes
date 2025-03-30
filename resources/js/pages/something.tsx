import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Something',
    href: '/something',
  },
];

export default function Something() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Something" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
      </div>
    </AppLayout>
  );
}
