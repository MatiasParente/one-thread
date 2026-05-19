import { Filter, X } from 'lucide-react';
import Button from '@/Components/Button';

export default function MensajeFilterCard({
    clientes = [],
    categorias = [],
    idMensajero,
    setIdMensajero,
    idCategoria,
    setIdCategoria,
    prioridad,
    setPrioridad,
    applyFilters,
    handleClearFilters
}) {
    return (
        <div className="bg-white p-4 rounded-md border border-gray-200 shadow-sm">
            <div className="mb-3 flex items-center gap-2 font-semibold text-gray-800">
                <Filter className="h-4 w-4 text-[#226583]" />
                <span>Filtros de búsqueda</span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 items-end">
                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-600">Cliente que envió</label>
                    <select
                        value={idMensajero}
                        onChange={(e) => setIdMensajero(e.target.value)}
                        className="w-full rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-800 shadow-sm focus:border-[#226583] focus:ring-1 focus:ring-[#226583]"
                    >
                        <option value="">Todos los clientes</option>
                        {clientes.map((cli) => (
                            <option key={cli.id} value={cli.id}>
                                {cli.nombre_completo}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Category filter */}
                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-600">Categoría / Área</label>
                    <select
                        value={idCategoria}
                        onChange={(e) => setIdCategoria(e.target.value)}
                        className="w-full rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-800 shadow-sm focus:border-[#226583] focus:ring-1 focus:ring-[#226583]"
                    >
                        <option value="">Todas las categorías</option>
                        {categorias.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Priority filter */}
                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-600">Prioridad</label>
                    <select
                        value={prioridad}
                        onChange={(e) => setPrioridad(e.target.value)}
                        className="w-full rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-800 shadow-sm focus:border-[#226583] focus:ring-1 focus:ring-[#226583]"
                    >
                        <option value="">Todas las prioridades</option>
                        <option value="Alta">Alta</option>
                        <option value="Media">Media</option>
                        <option value="Baja">Baja</option>
                    </select>
                </div>

                {/* Filters actions buttons */}
                <div className="flex gap-2">
                    <Button onClick={applyFilters} size="md" className="flex-1">
                        Filtrar
                    </Button>
                    {(idMensajero || idCategoria || prioridad) && (
                        <Button
                            variant="secondary"
                            onClick={handleClearFilters}
                            size="md"
                            className="flex items-center gap-1 border border-gray-300"
                        >
                            <X className="h-4 w-4" /> Limpiar
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
