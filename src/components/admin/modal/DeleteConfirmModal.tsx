// components/ui/DeleteConfirmModal.tsx
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

interface DeleteConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (id?:string) => void;
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
}

export function DeleteConfirmModal({
                                       isOpen,
                                       onClose,
                                       onConfirm,
                                       title = "¿Eliminar producto?",
                                       description = "Esta acción no se puede deshacer. ¿Estás seguro de que quieres eliminar este producto?",
                                       confirmText = "Eliminar",
                                       cancelText = "Cancelar",
                                   }: DeleteConfirmModalProps) {
    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl space-y-4">
                    <DialogTitle className="text-lg font-semibold text-slate-800">{title}</DialogTitle>
                    <p className="text-sm text-slate-600">{description}</p>
                    <div className="flex justify-end gap-2 pt-4">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded-md text-sm bg-gray-100 text-slate-700 hover:bg-gray-200"
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            className="px-4 py-2 rounded-md text-sm bg-red-600 text-white hover:bg-red-700"
                        >
                            {confirmText}
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}
