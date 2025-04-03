<?php

namespace Database\Factories\Master;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class DoctorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $medicalTitles = ['dr.', 'drg.', 'Dr.', 'Dr. dr.'];
        $academicTitles = ['M.Kes', 'Sp.PD', 'Sp.A', 'Sp.OG', 'Sp.B', 'Sp.S', 'Sp.KJ', 'Sp.M', 'Sp.THT-KL', 'Ph.D'];

        $gelarDepan = fake()->randomElement($medicalTitles);
        $gelarBelakang = fake()->randomElement($academicTitles);

        $scheduleOptions = [
            'Senin-Jumat: 08.00-14.00',
            'Senin, Rabu, Jumat: 09.00-15.00',
            'Selasa, Kamis: 13.00-20.00',
            'Senin-Sabtu: 08.00-12.00',
            'Senin, Kamis, Sabtu: 15.00-21.00'
        ];

        return [
            'email' => fake()->unique()->safeEmail(),
            'nama_dokter' => fake()->name(),
            'no_telepon' => fake()->numerify('08##########'),
            'alamat' => fake()->address(),
            'no_sip' => fake()->unique()->numerify('SIP/###/###/' . date('Y')),
            'nip' => fake()->unique()->numerify('19########' . fake()->numberBetween(1, 4) . '###'),
            'gelar_depan' => $gelarDepan,
            'gelar_belakang' => $gelarBelakang,
            'jadwal_layanan' => fake()->randomElement($scheduleOptions),
        ];
    }
}
