import { Clock, UserPlus, Activity } from 'lucide-react';

function formatMinutes(min) {
    if (min === null || min === undefined) return '—';
    if (min < 60) return `${min} min`;
    const h = Math.floor(min / 60);
    const m = min % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

const metrics = [
    {
        key: 'tiempoRespuesta',
        label: 'Tiempo prom. resolución',
        icon: Clock,
        iconBg: 'bg-primary-light',
        iconColor: 'text-primary',
        format: formatMinutes,
    },
    {
        key: 'sinAsignar',
        label: 'Sin asignar',
        icon: UserPlus,
        iconBg: 'bg-amber-100',
        iconColor: 'text-warning',
        format: (v) => v ?? 0,
    },
    {
        key: 'actividadHoy',
        label: 'Con actividad hoy',
        icon: Activity,
        iconBg: 'bg-emerald-50',
        iconColor: 'text-success',
        format: (v) => v ?? 0,
    },
];

export default function QuickSummary({ resumenRapido }) {
    return (
        <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold text-gray-900">
                Resumen rápido
            </h3>

            <div className="grid grid-cols-3 gap-4">
                {metrics.map(({ key, label, icon: Icon, iconBg, iconColor, format }) => (
                    <div key={key} className="flex items-center gap-3">
                        <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md ${iconBg}`}>
                            <Icon size={16} className={iconColor} />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs text-gray-500">{label}</p>
                            <p className="text-sm font-semibold text-gray-900">
                                {format(resumenRapido[key])}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
