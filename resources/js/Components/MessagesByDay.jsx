import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const mesesCortos = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

function formatDate(fecha) {
    const d = new Date(fecha + 'T00:00:00');
    return `${d.getDate()} ${mesesCortos[d.getMonth()]}`;
}

function buildLast7Days(mensajesPorDia) {
    const map = {};
    mensajesPorDia.forEach(({ fecha, total }) => {
        map[fecha] = total;
    });

    const days = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const key = d.toISOString().split('T')[0];
        days.push({
            fecha: key,
            label: formatDate(key),
            total: map[key] ?? 0,
        });
    }
    return days;
}

function CustomTooltip({ active, payload }) {
    if (!active || !payload?.length) return null;
    const { label, total } = payload[0].payload;
    return (
        <div className="rounded-md border border-gray-200 bg-white px-3 py-2 shadow-md">
            <p className="text-sm font-medium text-gray-900">{label}</p>
            <p className="text-xs text-gray-500">{total} mensajes</p>
        </div>
    );
}

export default function MessagesByDay({ mensajesPorDia }) {
    const data = buildLast7Days(mensajesPorDia);
    const hasData = data.some((d) => d.total > 0);

    if (!hasData) {
        return (
            <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
                <h3 className="mb-2 text-sm font-semibold text-gray-900">
                    Mensajes por día
                </h3>
                <div className="flex h-40 items-center justify-center">
                    <p className="text-sm text-gray-400">Sin mensajes en los últimos 7 días</p>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
            <h3 className="mb-2 text-sm font-semibold text-gray-900">
                Mensajes por día
            </h3>

            <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                        <XAxis
                            dataKey="label"
                            tick={{ fontSize: 11, fill: '#6B7280' }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fontSize: 11, fill: '#9CA3AF' }}
                            axisLine={false}
                            tickLine={false}
                            allowDecimals={false}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.04)' }} />
                        <Bar
                            dataKey="total"
                            fill="#226583"
                            radius={[4, 4, 0, 0]}
                            maxBarSize={40}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
