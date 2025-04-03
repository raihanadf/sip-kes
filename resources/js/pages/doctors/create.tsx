import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import React from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dokter',
        href: '/dokter',
    },
    {
        title: 'Tambah',
        href: '/dokter/create',
    },
];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        id: '',
        email: '',
        nama_dokter: '',
        no_telepon: '',
        alamat: '',
        no_sip: '',
        nip: '',
        gelar_depan: '',
        gelar_belakang: '',
        jadwal_layanan: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('dokter.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dokter" />
            <div className="p-4">
                <h2 className="text-2xl font-bold">Tambah Dokter</h2>

                <form onSubmit={handleSubmit} id="createForm">
                    <div className="grid gap-4 py-4">
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="dokter@example.com"
                            />
                            {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="flex flex-col gap-y-2">
                                <Label htmlFor="gelar_depan">Gelar Depan</Label>
                                <Input
                                    id="gelar_depan"
                                    value={data.gelar_depan}
                                    onChange={(e) => setData('gelar_depan', e.target.value)}
                                    placeholder="dr."
                                />
                                {errors.gelar_depan && <p className="text-destructive text-sm">{errors.gelar_depan}</p>}
                            </div>
                            <div className="col-span-1 flex flex-col gap-y-2">
                                <Label htmlFor="nama_dokter">Nama Dokter</Label>
                                <Input
                                    id="nama_dokter"
                                    value={data.nama_dokter}
                                    onChange={(e) => setData('nama_dokter', e.target.value)}
                                    placeholder="Nama Lengkap"
                                />
                                {errors.nama_dokter && <p className="text-destructive text-sm">{errors.nama_dokter}</p>}
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <Label htmlFor="gelar_belakang">Gelar Belakang</Label>
                                <Input
                                    id="gelar_belakang"
                                    value={data.gelar_belakang}
                                    onChange={(e) => setData('gelar_belakang', e.target.value)}
                                    placeholder="Sp.A"
                                />
                                {errors.gelar_belakang && <p className="text-destructive text-sm">{errors.gelar_belakang}</p>}
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="flex flex-col gap-y-2">
                                <Label htmlFor="no_sip">Nomor SIP</Label>
                                <Input
                                    id="no_sip"
                                    value={data.no_sip}
                                    onChange={(e) => setData('no_sip', e.target.value)}
                                    placeholder="503/A/123/0937/278"
                                />
                                {errors.no_sip && <p className="text-destructive text-sm">{errors.no_sip}</p>}
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <Label htmlFor="nip">NIP</Label>
                                <Input id="nip" value={data.nip} onChange={(e) => setData('nip', e.target.value)} placeholder="3509025608030101" />
                                {errors.nip && <p className="text-destructive text-sm">{errors.nip}</p>}
                            </div>

                            <div className="flex flex-col gap-y-2">
                                <Label htmlFor="no_telepon">No. Telepon</Label>
                                <Input
                                    id="no_telepon"
                                    value={data.no_telepon}
                                    onChange={(e) => setData('no_telepon', e.target.value)}
                                    placeholder="081234412345"
                                />
                                {errors.no_telepon && <p className="text-destructive text-sm">{errors.no_telepon}</p>}
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <Label htmlFor="alamat">Alamat</Label>
                                <Input
                                    id="alamat"
                                    value={data.alamat}
                                    onChange={(e) => setData('alamat', e.target.value)}
                                    placeholder="Jl. Mastrip"
                                />
                                {errors.alamat && <p className="text-destructive text-sm">{errors.alamat}</p>}
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="jadwal_layanan">Jadwal Layanan</Label>
                            <Textarea
                                id="jadwal_layanan"
                                value={data.jadwal_layanan}
                                onChange={(e: { target: { value: string } }) => setData('jadwal_layanan', e.target.value)}
                                placeholder="Senin-Jumat: 08.00-16.00, Sabtu: 08.00-12.00"
                                rows={3}
                            />
                            {errors.jadwal_layanan && <p className="text-destructive text-sm">{errors.jadwal_layanan}</p>}
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col-reverse justify-between gap-y-3 md:flex-row">
                        <Button type="button" variant="outline" onClick={() => router.visit(route('dokter.index'))}>
                            Batal
                        </Button>
                        <Button type="submit" disabled={processing}>
                            Simpan
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
