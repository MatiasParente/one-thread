import { MessageSquare, AlertTriangle, Clock, UserPlus, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const statConfig = [
    {
        key: 'total',
        label: 'Mensajes totales',
        icon: MessageSquare,
        borderColor: 'border-l-primary',
        iconBg: 'bg-primary-light',
        iconColor: 'text-primary',
    },
    {
        key: 'urgentes',
        label: 'Urgentes',
        icon: AlertTriangle,
        borderColor: 'border-l-danger',
        iconBg: 'bg-red-100',
        iconColor: 'text-danger',
    },
    {
        key: 'pendientes',
        label: 'Pendientes',
        icon: Clock,
        borderColor: 'border-l-warning',
        iconBg: 'bg-amber-100',
        iconColor: 'text-warning',
    },
    {
        key: 'sinAsignar',
        label: 'Sin asignar',
        icon: UserPlus,
        borderColor: 'border-l-gray-400',
        iconBg: 'bg-gray-100',
        iconColor: 'text-gray-600',
    },
];

function DeltaBadge({ prev, prev2 }) {
    if (prev === 0 && prev2 === 0) {
        return (
            <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                <Minus size={12} />
                Sin actividad reciente
            </span>
        );
    }

    if (prev2 === 0 && prev > 0) {
        return (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                <TrendingUp size={12} />
                +{prev} ayer
            </span>
        );
    }

    const pct = Math.round(((prev - prev2) / prev2) * 100);
    const isUp = pct >= 0;

    return (
        <span className={`inline-flex items-center gap-1 text-xs font-medium ${isUp ? 'text-emerald-600' : 'text-danger'}`}>
            {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            +{prev} ayer ({isUp ? '+' : ''}{pct}%)
        </span>
    );
}

export default function StatsCards({ stats }) {
    return (
        <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {statConfig.map(({ key, label, icon: Icon, borderColor, iconBg, iconColor }) => {
                const { value, prev, prev2 } = stats[key] ?? { value: 0, prev: 0, prev2: 0 };
                return (
                    <div
                        key={key}
                        className={`flex items-center gap-3 rounded-md border border-gray-200 border-l-4 ${borderColor} bg-white p-3 shadow-sm`}
                    >
                        <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md ${iconBg}`}>
                            <Icon size={18} className={iconColor} />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-xl font-bold text-gray-900">{value}</p>
                            <p className="text-xs text-gray-500">{label}</p>
                            <DeltaBadge prev={prev} prev2={prev2} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
