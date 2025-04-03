<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\Master\Doctor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DoctorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 10);
        $search = $request->input('search', '');
        $sort = $request->input('sort', 'id');
        $direction = $request->input('direction', 'asc');

        $query = Doctor::query();

        // Apply search filter
        if (!empty($search)) {
            $query->where(function ($query) use ($search) {
                $query->where('id', 'like', "%{$search}%")
                    ->orWhere('nama_dokter', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('no_sip', 'like', "%{$search}%")
                    ->orWhere('nip', 'like', "%{$search}%");
            });
        }

        // Apply sorting
        $query->orderBy($sort, $direction);

        // Pagination with custom formatting
        $doctors = $query->paginate($perPage);

        return Inertia::render('doctors/index', [
            'doctors' => $doctors,
            'filters' => [
                'search' => $search,
                'perPage' => (int) $perPage,
                'sort' => $sort,
                'direction' => $direction,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('doctors/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|unique:dokter,email',
            'nama_dokter' => 'required|string|max:255',
            'gelar_depan' => 'required|string|max:50',
            'gelar_belakang' => 'required|string|max:50',
            'no_sip' => 'required|string|max:100|unique:dokter,no_sip',
            'nip' => 'required|string|max:100|unique:dokter,nip',
            'no_telepon' => 'required|string|max:20',
            'alamat' => 'required|string',
            'jadwal_layanan' => 'nullable|string',
        ]);

        Doctor::create($validated);

        return to_route('dokter.index')->with('message', 'Data dokter berhasil ditambahkan');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Doctor $dokter)
    {
        return Inertia::render('doctors/edit', [
            'doctor' => $dokter,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Doctor $dokter)
    {
        $validated = $request->validate([
            'email' => 'required|email|unique:dokter,email,' . $dokter->id,
            'nama_dokter' => 'required|string|max:255',
            'gelar_depan' => 'required|string|max:50',
            'gelar_belakang' => 'required|string|max:50',
            'no_sip' => 'required|string|max:100',
            'nip' => 'required|string|max:100',
            'no_telepon' => 'required|string|max:20',
            'alamat' => 'required|string',
            'jadwal_layanan' => 'required|string',
        ]);

        $dokter->update($validated);
        return to_route('dokter.index')->with('message', 'Data dokter berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Doctor $dokter)
    {
        $dokter->delete();
        return to_route('dokter.index')->with('message', 'Dokter berhasil dihapus');
    }
}
