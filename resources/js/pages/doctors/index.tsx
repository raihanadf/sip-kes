import { BreadcrumbItem, Doctor, PaginatedResponse } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { ChevronDown, ChevronUp, Pencil, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface DoctorListProps {
    doctors: PaginatedResponse<Doctor>;
    filters: {
        search: string;
        perPage: number;
        sort: string;
        direction: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dokter',
        href: '/dokter',
    },
];

export default function Index({ doctors, filters }: DoctorListProps) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [doctorToDelete, setDoctorToDelete] = useState<string | null>(null);
    const { flash } = usePage().props as unknown as { flash: { message?: string } };

    useEffect(() => {
        if (flash.message) {
            toast.success(flash.message, { duration: 2000, closeButton: true });
        }
    }, [flash]);

    const confirmDelete = (id: string) => {
        setDoctorToDelete(id);
        setIsDeleteDialogOpen(true);
    };

    const handleDelete = () => {
        if (doctorToDelete) {
            router.delete(route('dokter.destroy', doctorToDelete), {
                onSuccess: () => {
                    setIsDeleteDialogOpen(false);
                },
            });
        }
    };

    const sort = (column: string) => {
        router.get(
            route('dokter.index'),
            {
                sort: column,
                direction: filters.sort === column && filters.direction === 'asc' ? 'desc' : 'asc',
                search: filters.search,
                perPage: filters.perPage,
            },
            { preserveState: true },
        );
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        router.get(
            route('dokter.index'),
            {
                search: e.target.value,
                perPage: filters.perPage,
                sort: filters.sort,
                direction: filters.direction,
            },
            { preserveState: true, preserveScroll: true },
        );
    };

    const handlePerPageChange = (value: string) => {
        router.get(
            route('dokter.index'),
            {
                search: filters.search,
                perPage: value,
                sort: filters.sort,
                direction: filters.direction,
            },
            { preserveState: true, preserveScroll: true },
        );
    };

    const getSortIcon = (column: string) => {
        if (filters.sort !== column) return null;
        return filters.direction === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dokter" />
            <div className="overflow-hidden p-4">
                <div className="flex flex-row items-center justify-between pb-4">
                    <h2 className="text-2xl font-semibold">Data Dokter</h2>
                    <Link href={route('dokter.create')}>
                        <Button className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Tambah Dokter
                        </Button>
                    </Link>
                </div>
                <div className="space-y-4">
                    <div className="flex flex-col items-start justify-between gap-y-2 md:flex-row md:items-center">
                        <div className="flex items-center gap-2">
                            <Label htmlFor="perPage">Tampilan</Label>
                            <Select value={filters.perPage.toString()} onValueChange={handlePerPageChange}>
                                <SelectTrigger id="perPage" className="w-16">
                                    <SelectValue placeholder={filters.perPage.toString()} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="5">5</SelectItem>
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="25">25</SelectItem>
                                    <SelectItem value="50">50</SelectItem>
                                </SelectContent>
                            </Select>
                            <span>entri</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Label htmlFor="search">Cari:</Label>
                            <Input id="search" className="w-64" value={filters.search || ''} onChange={handleSearch} placeholder="" />
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-md border">
                        <Table className="overflow-x-auto">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="cursor-pointer" onClick={() => sort('email')}>
                                        <div className="flex items-center gap-1">Email {getSortIcon('email')}</div>
                                    </TableHead>
                                    <TableHead className="cursor-pointer" onClick={() => sort('nama_dokter')}>
                                        <div className="flex items-center gap-1">Nama {getSortIcon('nama_dokter')}</div>
                                    </TableHead>
                                    <TableHead className="cursor-pointer" onClick={() => sort('no_sip')}>
                                        <div className="flex items-center gap-1">No. SIP {getSortIcon('no_sip')}</div>
                                    </TableHead>
                                    <TableHead className="cursor-pointer" onClick={() => sort('nip')}>
                                        <div className="flex items-center gap-1">NIP {getSortIcon('nip')}</div>
                                    </TableHead>
                                    <TableHead className="cursor-pointer" onClick={() => sort('no_telepon')}>
                                        <div className="flex items-center gap-1">No. Telepon {getSortIcon('no_telepon')}</div>
                                    </TableHead>
                                    <TableHead className="cursor-pointer" onClick={() => sort('alamat')}>
                                        <div className="flex items-center gap-1">Alamat {getSortIcon('alamat')}</div>
                                    </TableHead>
                                    <TableHead>Jadwal Layanan</TableHead>
                                    <TableHead className="text-center">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {doctors.data.length > 0 ? (
                                    doctors.data.map((doctor) => (
                                        <TableRow key={doctor.id}>
                                            <TableCell>{doctor.email}</TableCell>
                                            <TableCell>{`${doctor.gelar_depan} ${doctor.nama_dokter} ${doctor.gelar_belakang}`.trim()}</TableCell>
                                            <TableCell>{doctor.no_sip}</TableCell>
                                            <TableCell>{doctor.nip}</TableCell>
                                            <TableCell>{doctor.no_telepon}</TableCell>
                                            <TableCell>{doctor.alamat}</TableCell>
                                            <TableCell>{doctor.jadwal_layanan}</TableCell>
                                            <TableCell className="flex justify-center gap-2">
                                                <Link href={route('dokter.edit', doctor.id)}>
                                                    <Button className="cursor-pointer" variant="outline" size="icon">
                                                        <Pencil className="h-4 w-4" />
                                                        <span className="sr-only">Edit</span>
                                                    </Button>
                                                </Link>
                                                <Button
                                                    className="cursor-pointer"
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() => confirmDelete(doctor.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    <span className="sr-only">Hapus</span>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={9} className="py-4 text-center">
                                            Tidak ada data
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="mt-4 flex flex-col items-center justify-between gap-y-4 md:flex-row md:items-center">
                        <div className="text-muted-foreground text-sm">
                            Menampilkan {doctors.from} sampai {doctors.to} dari {doctors.total} entri
                        </div>
                        <Pagination className="md:justify-end">
                            <PaginationContent>
                                {/* Previous button */}
                                {doctors.current_page > 1 && (
                                    <PaginationItem>
                                        <PaginationPrevious
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                router.get(
                                                    route('dokter.index', { page: doctors.current_page - 1 }),
                                                    {
                                                        search: filters.search,
                                                        perPage: filters.perPage,
                                                        sort: filters.sort,
                                                        direction: filters.direction,
                                                    },
                                                    { preserveState: true },
                                                );
                                            }}
                                        />
                                    </PaginationItem>
                                )}

                                {/* First page */}
                                {doctors.last_page > 1 && (
                                    <PaginationItem>
                                        <PaginationLink
                                            href="#"
                                            isActive={doctors.current_page === 1}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                router.get(
                                                    route('dokter.index', { page: 1 }),
                                                    {
                                                        search: filters.search,
                                                        perPage: filters.perPage,
                                                        sort: filters.sort,
                                                        direction: filters.direction,
                                                    },
                                                    { preserveState: true },
                                                );
                                            }}
                                        >
                                            1
                                        </PaginationLink>
                                    </PaginationItem>
                                )}

                                {/* Left ellipsis */}
                                {doctors.current_page > 3 && (
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                )}

                                {/* Page before current */}
                                {doctors.current_page > 2 && (
                                    <PaginationItem>
                                        <PaginationLink
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                router.get(
                                                    route('dokter.index', { page: doctors.current_page - 1 }),
                                                    {
                                                        search: filters.search,
                                                        perPage: filters.perPage,
                                                        sort: filters.sort,
                                                        direction: filters.direction,
                                                    },
                                                    { preserveState: true },
                                                );
                                            }}
                                        >
                                            {doctors.current_page - 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                )}

                                {/* Current page (if not first or last) */}
                                {doctors.current_page !== 1 && doctors.current_page !== doctors.last_page && (
                                    <PaginationItem>
                                        <PaginationLink href="#" isActive={true} onClick={(e) => e.preventDefault()}>
                                            {doctors.current_page}
                                        </PaginationLink>
                                    </PaginationItem>
                                )}

                                {/* Page after current */}
                                {doctors.current_page < doctors.last_page - 1 && (
                                    <PaginationItem>
                                        <PaginationLink
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                router.get(
                                                    route('dokter.index', { page: doctors.current_page + 1 }),
                                                    {
                                                        search: filters.search,
                                                        perPage: filters.perPage,
                                                        sort: filters.sort,
                                                        direction: filters.direction,
                                                    },
                                                    { preserveState: true },
                                                );
                                            }}
                                        >
                                            {doctors.current_page + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                )}

                                {/* Right ellipsis */}
                                {doctors.current_page < doctors.last_page - 2 && (
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                )}

                                {/* Last page */}
                                {doctors.last_page > 1 && (
                                    <PaginationItem>
                                        <PaginationLink
                                            href="#"
                                            isActive={doctors.current_page === doctors.last_page}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                router.get(
                                                    route('dokter.index', { page: doctors.last_page }),
                                                    {
                                                        search: filters.search,
                                                        perPage: filters.perPage,
                                                        sort: filters.sort,
                                                        direction: filters.direction,
                                                    },
                                                    { preserveState: true },
                                                );
                                            }}
                                        >
                                            {doctors.last_page}
                                        </PaginationLink>
                                    </PaginationItem>
                                )}

                                {/* Next button */}
                                {doctors.current_page < doctors.last_page && (
                                    <PaginationItem>
                                        <PaginationNext
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                router.get(
                                                    route('dokter.index', { page: doctors.current_page + 1 }),
                                                    {
                                                        search: filters.search,
                                                        perPage: filters.perPage,
                                                        sort: filters.sort,
                                                        direction: filters.direction,
                                                    },
                                                    { preserveState: true },
                                                );
                                            }}
                                        />
                                    </PaginationItem>
                                )}
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>

                {/* Delete Confirmation Dialog */}
                <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Hapus Dokter</DialogTitle>
                            <DialogDescription>Apakah Anda yakin ingin menghapus dokter ini? Tindakan ini tidak dapat dibatalkan.</DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                                Batal
                            </Button>
                            <Button variant="destructive" onClick={handleDelete}>
                                Hapus
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
