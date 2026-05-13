import { useEffect, useState } from 'react';
import {
    Clock,
    RefreshCw,
    Pause,
    CheckCircle2,
    Loader2,
    AlertTriangle,
} from 'lucide-react';

const estadoCards = [
    {
        key: 0,
        label: 'Pendientes',
        icon: Clock,
        bg: 'bg-primary-light',
        iconColor: 'text-primary',
        borderColor: 'border-l-primary',
    },
    {
        key: 1,
        label: 'En proceso',
        icon: RefreshCw,
        bg: 'bg-amber-100',
        iconColor: 'text-warning',
        borderColor: 'border-l-warning',
    },
    {
        key: 2,
        label: 'En pausa',
        icon: Pause,
        bg: 'bg-gray-100',
        iconColor: 'text-gray-400',
        borderColor: 'border-l-gray-300',
    },
    {
        key: 3,
        label: 'Resueltos',
        icon: CheckCircle2,
        bg: 'bg-emerald-100',
        iconColor: 'text-success',
        borderColor: 'border-l-success',
    },
];

export default function AdminCargaTrabajo({ adminId }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!adminId) return;
        setLoading(true);
        fetch(route('usuarios.carga', adminId))
            .then((res) => res.json())
            .then((d) => {
                setData(d);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [adminId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 size={24} className="animate-spin text-primary" />
            </div>
        );
    }

    if (!data) return null;

    const totalPendientes = data.porEstado[0] ?? 0;

    return (
        <div className="space-y-6">
            {/* 4 cards de estado */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {estadoCards.map(
                    ({ key, label, icon: Icon, bg, iconColor, borderColor }) => (
                        <div
                            key={key}
                            className={`flex items-center gap-3 rounded-md border border-gray-200 border-l-4 ${borderColor} bg-white p-4 shadow-sm`}
                        >
                            <div
                                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md ${bg}`}
                            >
                                <Icon size={20} className={iconColor} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">
                                    {data.porEstado[key] ?? 0}
                                </p>
                                <p className="text-xs text-gray-500">{label}</p>
                            </div>
                        </div>
                    ),
                )}
            </div>

            {/* Desglose prioridad de pendientes */}
            {totalPendientes > 0 && (
                <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="mb-3 flex items-center gap-2">
                        <AlertTriangle size={16} className="text-warning" />
                        <h3 className="text-sm font-semibold text-gray-900">
                            Pendientes por prioridad
                        </h3>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {['Alta', 'Media', 'Baja'].map((p) => {
                            const count =
                                data.pendientesPorPrioridad[p] ?? 0;
                            const colors = {
                                Alta: 'text-danger',
                                Media: 'text-warning',
                                Baja: 'text-gray-500',
                            };
                            return (
                                <div key={p} className="text-center">
                                    <p
                                        className={`text-2xl font-bold ${colors[p]}`}
                                    >
                                        {count}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {p}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
