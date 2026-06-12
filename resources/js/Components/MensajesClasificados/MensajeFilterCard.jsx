import { Filter, X } from 'lucide-react';
import Button from '@/Components/Button';

//obtenemos todos estos datos, para usarlos en los filtros de la tabla de mensajes clasificados
//Obtenemos todos los clientes, para el filtro de cliente que envio al igual que el de categoria ya que son varias
//las prioridades son fijas, por lo que no necesitamos obtenerlas de la base de datos
//el estado es fijo, por lo que no necesitamos obtenerlo de la base de datos
export default function MensajeFilterCard({
    nombreCliente,
    setNombreCliente,
    categorias = [],
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
                    <input
                        type="text"
                        value={nombreCliente}
                        onChange={(e) => setNombreCliente(e.target.value)}
                        placeholder="Buscar por nombre..."
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                applyFilters();
                            }
                        }}
                        className="w-full rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-800 shadow-sm focus:border-[#226583] focus:ring-1 focus:ring-[#226583]"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-600">Categoría / Área</label>
                    <select
                        value={idCategoria}
                        onChange={(e) => setIdCategoria(e.target.value)}
                        className="w-full rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-800 shadow-sm focus:border-[#226583] focus:ring-1 focus:ring-[#226583]"
                    >
                        <option value="">Todas las categorías</option>
                        {/*aca recorremos todas las categorias y las mostramos en el select*/}
                        {categorias.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-600">Prioridad</label>
                    <select
                        value={prioridad}
                        onChange={(e) => setPrioridad(e.target.value)}
                        className="w-full rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-800 shadow-sm focus:border-[#226583] focus:ring-1 focus:ring-[#226583]"
                    >
                        {/*aca definimos las prioridades que son fijas y no necesitamos obtenerlas de la base de datos*/}
                        {/*Tiene que coincidir con la prioridad que le asigna la IA*/}
                        <option value="">Todas las prioridades</option>
                        <option value="Alta">Alta</option>
                        <option value="Media">Media</option>
                        <option value="Baja">Baja</option>
                    </select>
                </div>

                <div className="flex gap-2">
                    <Button onClick={applyFilters} size="md" className="flex-1">
                        Filtrar
                    </Button>
                    {(nombreCliente || idCategoria || prioridad) && (
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
