import { useEffect, useState } from 'react';
import {
    BarChart3,
    Loader2,
    TrendingUp,
    ShieldCheck,
    CalendarDays,
} from 'lucide-react';

const prioridadColors = {
    Alta: { bar: 'bg-danger', label: 'text-danger' },
    Media: { bar: 'bg-warning', label: 'text-warning' },
    Baja: { bar: 'bg-gray-300', label: 'text-gray-500' },
};

const estadoLabels = {
    0: { name: 'Pendiente', bar: 'bg-primary', label: 'text-primary' },
    1: { name: 'En proceso', bar: 'bg-warning', label: 'text-warning' },
    2: { name: 'En pausa', bar: 'bg-gray-300', label: 'text-gray-500' },
    3: { name: 'Resuelto', bar: 'bg-success', label: 'text-success' },
};

function StatMiniCard({ icon: Icon, iconBg, iconColor, value, label }) {
    return (
        <div className="flex items-center gap-3 rounded-md border border-gray-200 bg-white p-3 shadow-sm">
            <div
                className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md ${iconBg}`}
            >
                <Icon size={18} className={iconColor} />
            </div>
            <div>
                <p className="text-xl font-bold text-gray-900">{value}</p>
                <p className="text-xs text-gray-500">{label}</p>
            </div>
        </div>
    );
}

function DistributionBar({ label, count, total, barColor, labelColor }) {
    const pct = total > 0 ? Math.round((count / total) * 100) : 0;
    return (
        <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
                <span className={`font-medium ${labelColor}`}>{label}</span>
                <span className="text-gray-500">
                    {count} ({pct}%)
                </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                    className={`h-full rounded-full ${barColor}`}
                    style={{ width: `${pct}%` }}
                />
            </div>
        </div>
    );
}

export default function AdminMetricas({ adminId }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!adminId) return;
        setLoading(true);
        fetch(route('agentes.metricas', adminId))
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

    const promedio =
        data.totalAsignados > 0 && data.porDia.length > 0
            ? (data.totalAsignados / data.porDia.length).toFixed(1)
            : 0;

    return (
        <div className="space-y-6">
            {/* Mini stat cards */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <StatMiniCard
                    icon={TrendingUp}
                    iconBg="bg-primary-light"
                    iconColor="text-primary"
                    value={data.totalAsignados}
                    label="Total asignados"
                />
                <StatMiniCard
                    icon={CalendarDays}
                    iconBg="bg-amber-100"
                    iconColor="text-warning"
                    value={promedio}
                    label="Promedio por día"
                />
                <StatMiniCard
                    icon={ShieldCheck}
                    iconBg="bg-emerald-100"
                    iconColor="text-success"
                    value={data.confianzaPromedio}
                    label="Confianza promedio"
                />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Por prioridad */}
                <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
                    <h3 className="mb-3 text-sm font-semibold text-gray-900">
                        Por prioridad
                    </h3>
                    <div className="space-y-3">
                        {['Alta', 'Media', 'Baja'].map((p) => (
                            <DistributionBar
                                key={p}
                                label={p}
                                count={data.porPrioridad[p] ?? 0}
                                total={data.totalAsignados}
                                barColor={prioridadColors[p].bar}
                                labelColor={prioridadColors[p].label}
                            />
                        ))}
                    </div>
                </div>

                {/* Por estado */}
                <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
                    <h3 className="mb-3 text-sm font-semibold text-gray-900">
                        Por estado
                    </h3>
                    <div className="space-y-3">
                        {[0, 1, 2, 3].map((e) => (
                            <DistributionBar
                                key={e}
                                label={estadoLabels[e].name}
                                count={data.porEstado[e] ?? 0}
                                total={data.totalAsignados}
                                barColor={estadoLabels[e].bar}
                                labelColor={estadoLabels[e].label}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Actividad últimos 7 días */}
            <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
                <h3 className="mb-3 text-sm font-semibold text-gray-900">
                    Actividad últimos 7 días
                </h3>
                {data.porDia.length === 0 ? (
                    <p className="text-sm text-gray-400">
                        Sin actividad reciente
                    </p>
                ) : (
                    <div className="space-y-2">
                        {data.porDia.map((d) => (
                            <div
                                key={d.fecha}
                                className="flex items-center justify-between text-sm"
                            >
                                <span className="text-gray-600">
                                    {new Date(d.fecha).toLocaleDateString(
                                        'es-UY',
                                        {
                                            weekday: 'short',
                                            day: 'numeric',
                                            month: 'short',
                                        },
                                    )}
                                </span>
                                <span className="font-medium text-gray-900">
                                    {d.total} mensajes
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
