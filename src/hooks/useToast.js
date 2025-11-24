import { toast } from 'react-toastify';

export const useToast = () => {
    const showSuccess = (message) => {
        toast.success(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const showError = (message) => {
        toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const showWarning = (message) => {
        toast.warning(message, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const showInfo = (message) => {
        toast.info(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const showPromise = async (promise, messages) => {
        return toast.promise(
            promise,
            {
                pending: messages.pending || 'Processando...',
                success: messages.success || 'Sucesso!',
                error: messages.error || 'Erro ao processar'
            }
        );
    };

    return {
        showSuccess,
        showError,
        showWarning,
        showInfo,
        showPromise
    };
};