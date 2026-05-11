import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { MessageSquare, Mail, Send, AtSign } from 'lucide-react';

const channelConfig = {
    Telegram: { color: '#26A5E4', icon: Send },
    Whatsapp: { color: '#25D366', icon: MessageSquare },
    Gmail: { color: '#EA4335', icon: Mail },
    Instagram: { color: '#E1306C', icon: AtSign },
};

function CustomTooltip({ active, payload }) {
    if (!active || !payload?.length) return null;
    const { name, value, percent } = payload[0].payload;
    return (
        <div className="rounded-md border border-gray-200 bg-white px-3 py-2 shadow-md">
            <p className="text-sm font-medium text-gray-900">{name}</p>
            <p className="text-xs text-gray-500">
                {value} mensajes ({(percent * 100).toFixed(0)}%)
            </p>
        </div>
    );
}

export default function ChannelDistribution({ mensajesPorCanal }) {
    const total = Object.values(mensajesPorCanal).reduce((sum, v) => sum + v, 0);

    const data = Object.entries(mensajesPorCanal)
        .map(([name, value]) => ({
            name,
            value,
            percent: total > 0 ? value / total : 0,
            ...(channelConfig[name] ?? { color: '#9CA3AF', icon: MessageSquare }),
        }))
        .sort((a, b) => b.value - a.value);

    if (total === 0) {
        return (
            <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
                <h3 className="mb-3 text-sm font-semibold text-gray-900">
                    Distribución por canal
                </h3>
                <div className="flex h-48 items-center justify-center">
                    <p className="text-sm text-gray-400">Sin mensajes aún</p>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
            <h3 className="mb-2 text-sm font-semibold text-gray-900">
                Distribución por canal
            </h3>

            <div className="mx-auto h-36 w-36">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={35}
                            outerRadius={60}
                            paddingAngle={3}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, i) => (
                                <Cell key={i} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-2 flex flex-col gap-1.5">
                {data.map(({ name, value, percent, color, icon: Icon }) => (
                    <div key={name} className="flex items-center gap-2">
                        <Icon size={14} style={{ color }} />
                        <span className="min-w-0 flex-1 truncate text-sm text-gray-700">
                            {name}
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                            {value}
                        </span>
                        <span className="w-10 text-right text-xs text-gray-400">
                            {(percent * 100).toFixed(0)}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
