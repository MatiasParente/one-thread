<?php

namespace App\Http\Controllers;

use App\Models\Mensaje_Temporal;

class MensajeTemporalController extends Controller
{
    public function destroy($id)
    {
        $mensaje = Mensaje_Temporal::findOrFail($id);

        $mensaje->delete();

        return redirect()->back()->with('success', 'Mensaje eliminado.');
    }
}
