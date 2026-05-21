import { useState, useRef } from 'react';
import { useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {
    UserPlus,
    MessageSquare,
    BarChart3,
    ClipboardList,
    MoreVertical,
    Pencil,
    Trash2,
    FolderTree,
    X,
} from 'lucide-react';
import Button from '@/Components/Button';
import Modal from '@/Components/Modal';
import Dropdown from '@/Components/Dropdown';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import AdminMensajesList from '@/Components/AdminMensajesList';
import AdminMetricas from '@/Components/AdminMetricas';
import AdminCargaTrabajo from '@/Components/AdminCargaTrabajo';

// ──────────────────────────────────────────────
// Card de agente con menú 3 puntos, email mailto y botones de acción
// ──────────────────────────────────────────────
function AdminCard({ admin, isSelected, onSelectPanel, activePanel }) {
    const name = admin.nombre || admin.user?.name || 'Sin nombre';
    const email = admin.user?.email || '';
    const initials = name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    const actionButtons = [
        { key: 'mensajes', label: 'Mensajes', icon: MessageSquare },
        { key: 'metricas', label: 'Métricas', icon: BarChart3 },
        { key: 'carga', label: 'Carga', icon: ClipboardList },
    ];

    return (
        <div
            className={`flex shrink-0 min-w-[280px] flex-col items-center gap-3 rounded-md border border-t-4 bg-white p-5 shadow-sm transition-all ${isSelected
                ? 'border-primary border-t-primary bg-primary-light'
                : 'border-gray-200 border-t-primary'
                }`}
        >
            {/* Menú 3 puntos (top-left) */}
            <div className="flex w-full justify-start">
                <Dropdown>
                    <Dropdown.Trigger>
                        <button className="rounded-sm p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
                            <MoreVertical size={16} />
                        </button>
                    </Dropdown.Trigger>
                    <Dropdown.Content align="left" width="48">
                        <Dropdown.Link
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                onSelectPanel('editar', admin);
                            }}
                        >
                            <span className="flex items-center gap-2">
                                <Pencil size={14} />
                                Editar
                            </span>
                        </Dropdown.Link>
                        <Dropdown.Link
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                onSelectPanel('eliminar', admin);
                            }}
                        >
                            <span className="flex items-center gap-2 text-danger">
                                <Trash2 size={14} />
                                Eliminar
                            </span>
                        </Dropdown.Link>
                        <Dropdown.Link
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                onSelectPanel('categorias', admin);
                            }}
                        >
                            <span className="flex items-center gap-2">
                                <FolderTree size={14} />
                                Gestionar categorías
                            </span>
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            </div>

            {/* Avatar + nombre + email */}
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-hover text-base font-semibold text-white">
                {initials}
            </div>
            <div className="text-center">
                <p className="text-sm font-semibold text-gray-900">{name}</p>
                {email ? (
                    <a
                        href={`mailto:${email}`}
                        className="text-xs text-primary underline-offset-2 hover:underline"
                    >
                        {email}
                    </a>
                ) : (
                    <p className="text-xs text-gray-400">Sin email</p>
                )}
            </div>

            {/* 3 botones de acción */}
            <div className="flex gap-1">
                {actionButtons.map(({ key, label, icon: Icon }) => (
                    <button
                        key={key}
                        onClick={() => onSelectPanel(key, admin)}
                        title={label}
                        className={`flex items-center gap-1 rounded-sm px-2 py-1 text-xs font-medium transition-colors ${isSelected && activePanel === key
                            ? 'bg-primary text-white'
                            : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                            }`}
                    >
                        <Icon size={14} />
                        <span className="hidden xl:inline">{label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

// ──────────────────────────────────────────────
// Modal de crear/editar agente
// ──────────────────────────────────────────────
function AgentModal({ show, onClose, mode, admin, allCategorias }) {
    const isEdit = mode === 'edit';
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: admin?.nombre ?? '',
        email: admin?.user?.email ?? '',
        telefono: admin?.telefono ?? '',
        categorias_ids: admin?.categorias?.map((c) => c.id) ?? [],
        password: '',
        password_confirmation: '',
    });

    const handleCategoryChange = (id) => {
        let next = [...data.categorias_ids];
        if (next.includes(id)) {
            next = next.filter((catId) => catId !== id);
        } else {
            next.push(id);
        }
        setData('categorias_ids', next);
    };

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('agentes.update', admin.id), {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        } else {
            post(route('agentes.store'), {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        }
    };

    return (
        <Modal show={show} onClose={onClose} maxWidth="lg">
            <form onSubmit={submit}>
                <div className="p-6 pb-0">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900">
                            {isEdit ? 'Editar agente' : 'Nuevo agente'}
                        </h2>
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-sm p-1 text-gray-400 hover:text-gray-600"
                        >
                            <X size={20} />
                        </button>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                        {isEdit
                            ? 'Modificá los datos del agente.'
                            : 'Creá las credenciales y asigná las categorías correspondientes.'}
                    </p>
                </div>

                <div className="space-y-3 px-6 py-4">
                    <div>
                        <InputLabel htmlFor="name" value="Nombre completo" />
                        <TextInput
                            id="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            isFocused
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel htmlFor="email" value="Correo electrónico" />
                        <TextInput
                            id="email"
                            type="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel htmlFor="telefono" value="Teléfono" />
                        <TextInput
                            id="telefono"
                            value={data.telefono}
                            className="mt-1 block w-full"
                            placeholder="+598..."
                            onChange={(e) => setData('telefono', e.target.value)}
                            required
                        />
                        <InputError message={errors.telefono} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel htmlFor="password" value={isEdit ? 'Nueva contraseña (opcional)' : 'Contraseña'} />
                        <TextInput
                            id="password"
                            type="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('password', e.target.value)}
                            required={!isEdit}
                        />
                        <InputError message={errors.password} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Confirmar contraseña"
                        />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            required={!isEdit}
                        />
                    </div>

                    <div className="border-t border-gray-100 pt-3">
                        <span className="block text-sm font-medium text-gray-700">
                            Asignar a categorías
                        </span>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                            {allCategorias?.map((cat) => (
                                <div key={cat.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`cat-${cat.id}`}
                                        checked={data.categorias_ids.includes(cat.id)}
                                        onChange={() => handleCategoryChange(cat.id)}
                                        className="rounded-sm border-gray-200 text-primary shadow-sm focus:ring-primary"
                                    />
                                    <label
                                        htmlFor={`cat-${cat.id}`}
                                        className="ml-2 cursor-pointer text-sm text-gray-600"
                                    >
                                        {cat.nombre}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <InputError
                            message={errors.categorias_ids}
                            className="mt-1"
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3 border-t border-gray-100 px-6 pb-6 pt-4">
                    <Button variant="secondary" onClick={onClose} type="button">
                        Cancelar
                    </Button>
                    <Button type="submit" disabled={processing}>
                        {isEdit ? 'Guardar cambios' : 'Crear agente'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}

// ──────────────────────────────────────────────
// Modal de gestión de categorías (liviano)
// ──────────────────────────────────────────────
function CategoriasModal({ show, onClose, admin, allCategorias }) {
    const [selected, setSelected] = useState(
        admin?.categorias?.map((c) => c.id) ?? [],
    );
    const [saving, setSaving] = useState(false);

    const toggle = (id) => {
        setSelected((prev) =>
            prev.includes(id)
                ? prev.filter((catId) => catId !== id)
                : [...prev, id],
        );
    };

    const handleSave = () => {
        setSaving(true);
        router.put(
            route('agentes.update', admin.id),
            {
                name: admin.nombre,
                email: admin.user?.email,
                telefono: admin.telefono,
                categorias_ids: selected,
            },
            {
                onSuccess: () => {
                    setSaving(false);
                    onClose();
                },
                onError: () => setSaving(false),
            },
        );
    };

    if (!admin) return null;

    return (
        <Modal show={show} onClose={onClose} maxWidth="sm">
            <div className="p-6 pb-0">
                <h2 className="text-lg font-bold text-gray-900">
                    Gestionar categorías
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    Asigná o quitá categorías a {admin.nombre}
                </p>
            </div>

            <div className="space-y-2 px-6 py-4">
                {allCategorias?.map((cat) => (
                    <div key={cat.id} className="flex items-center">
                        <input
                            type="checkbox"
                            id={`catg-${cat.id}`}
                            checked={selected.includes(cat.id)}
                            onChange={() => toggle(cat.id)}
                            className="rounded-sm border-gray-200 text-primary shadow-sm focus:ring-primary"
                        />
                        <label
                            htmlFor={`catg-${cat.id}`}
                            className="ml-2 cursor-pointer text-sm text-gray-700"
                        >
                            {cat.nombre}
                        </label>
                    </div>
                ))}
            </div>

            <div className="flex justify-end gap-3 border-t border-gray-100 px-6 pb-6 pt-4">
                <Button variant="secondary" onClick={onClose} type="button">
                    Cancelar
                </Button>
                <Button onClick={handleSave} disabled={saving}>
                    Guardar
                </Button>
            </div>
        </Modal>
    );
}

// ──────────────────────────────────────────────
// Modal de confirmación de eliminación
// ──────────────────────────────────────────────
function DeleteConfirmModal({ show, onClose, admin }) {
    const [deleting, setDeleting] = useState(false);

    const handleDelete = () => {
        setDeleting(true);
        router.delete(route('agentes.destroy', admin.id), {
            onSuccess: () => {
                setDeleting(false);
                onClose();
            },
            onError: () => setDeleting(false),
        });
    };

    if (!admin) return null;

    return (
        <Modal show={show} onClose={onClose} maxWidth="sm">
            <div className="p-6">
                <h2 className="text-lg font-bold text-gray-900">
                    Eliminar agente
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    ¿Eliminar a{' '}
                    <span className="font-semibold">{admin.nombre}</span>? Esta
                    acción no se puede deshacer.
                </p>
                <div className="mt-6 flex justify-end gap-3">
                    <Button
                        variant="secondary"
                        onClick={onClose}
                        type="button"
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleDelete}
                        disabled={deleting}
                    >
                        Eliminar
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

// ──────────────────────────────────────────────
// Componente principal
// ──────────────────────────────────────────────
export default function Index({ admins, allCategorias }) {
    // Estado del panel de detalle
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [activePanel, setActivePanel] = useState(null);

    // Estado de modales
    const [showAgentModal, setShowAgentModal] = useState(false);
    const [agentModalMode, setAgentModalMode] = useState('create');
    const [showCategoriasModal, setShowCategoriasModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Admin seleccionado para editar/categorías/eliminar (del menú 3 puntos)
    const [contextAdmin, setContextAdmin] = useState(null);

    // Scroll horizontal con rueda del mouse
    const scrollRef = useRef(null);
    const handleWheel = (e) => {
        if (scrollRef.current) {
            e.preventDefault();
            scrollRef.current.scrollLeft += e.deltaY;
        }
    };

    // Maneja clicks en botones de acción y menú 3 puntos
    const handlePanelAction = (action, admin) => {
        switch (action) {
            case 'editar':
                setContextAdmin(admin);
                setAgentModalMode('edit');
                setShowAgentModal(true);
                break;
            case 'eliminar':
                setContextAdmin(admin);
                setShowDeleteModal(true);
                break;
            case 'categorias':
                setContextAdmin(admin);
                setShowCategoriasModal(true);
                break;
            default:
                // Panel de detalle: mensajes, metricas, carga
                if (
                    selectedAdmin?.id === admin.id &&
                    activePanel === action
                ) {
                    // Toggle off si clickea el mismo botón
                    setSelectedAdmin(null);
                    setActivePanel(null);
                } else {
                    setSelectedAdmin(admin);
                    setActivePanel(action);
                }
        }
    };

    // Renderiza el panel de detalle según activePanel
    const renderPanel = () => {
        if (!selectedAdmin || !activePanel) {
            return (
                <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                    <ClipboardList
                        size={40}
                        className="mb-3 text-gray-300"
                    />
                    <p className="text-sm">
                        Seleccioná un agente para ver su información
                    </p>
                </div>
            );
        }

        switch (activePanel) {
            case 'mensajes':
                return (
                    <AdminMensajesList adminId={selectedAdmin.id} />
                );
            case 'metricas':
                return (
                    <AdminMetricas adminId={selectedAdmin.id} />
                );
            case 'carga':
                return (
                    <AdminCargaTrabajo adminId={selectedAdmin.id} />
                );
            default:
                return null;
        }
    };

    return (
        <AuthenticatedLayout
            title="Agentes"
            subtitle="Gestión de agentes"
        >
            <Head title="Agentes" />

            {/* Header con contador y botón crear */}
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-900">
                    Agentes ({admins.length})
                </h2>
                <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                        setContextAdmin(null);
                        setAgentModalMode('create');
                        setShowAgentModal(true);
                    }}
                >
                    <UserPlus size={16} className="mr-2" />
                    Nuevo agente
                </Button>
            </div>

            {/* Fila horizontal scrolleable de cards */}
            <div ref={scrollRef} onWheel={handleWheel} className="mb-6 max-w-full overflow-x-auto overflow-y-hidden">
                <div className="flex gap-4 pb-2">
                    {admins.map((admin) => (
                        <AdminCard
                            key={admin.id}
                            admin={admin}
                            isSelected={selectedAdmin?.id === admin.id}
                            activePanel={activePanel}
                            onSelectPanel={handlePanelAction}
                        />
                    ))}

                    {admins.length === 0 && (
                        <div className="flex items-center justify-center rounded-md border border-dashed border-gray-300 bg-white py-8 text-center text-sm text-gray-400" style={{ minWidth: '100%' }}>
                            No hay agentes registrados
                        </div>
                    )}
                </div>
            </div>

            {/* Panel de detalle */}
            <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
                {selectedAdmin && activePanel && (
                    <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-3">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900">
                                {selectedAdmin.nombre}
                            </h3>
                            <p className="text-xs text-gray-500">
                                {activePanel === 'mensajes' &&
                                    'Mensajes asignados'}
                                {activePanel === 'metricas' &&
                                    'Métricas de rendimiento'}
                                {activePanel === 'carga' &&
                                    'Carga de trabajo actual'}
                            </p>
                        </div>
                        <button
                            onClick={() => {
                                setSelectedAdmin(null);
                                setActivePanel(null);
                            }}
                            className="rounded-sm p-1 text-gray-400 hover:text-gray-600"
                        >
                            <X size={16} />
                        </button>
                    </div>
                )}
                {renderPanel()}
            </div>

            {/* Modales */}
            <AgentModal
                show={showAgentModal}
                onClose={() => setShowAgentModal(false)}
                mode={agentModalMode}
                admin={contextAdmin}
                allCategorias={allCategorias}
            />
            <CategoriasModal
                show={showCategoriasModal}
                onClose={() => setShowCategoriasModal(false)}
                admin={contextAdmin}
                allCategorias={allCategorias}
            />
            <DeleteConfirmModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                admin={contextAdmin}
            />
        </AuthenticatedLayout>
    );
}
