import { ChipStyle, ChipStyleClass } from "@core/interfaces/chip-style.interface";

export enum LOAD_STATUS_KEY {
    PENDING = "PENDING",
    LIQUIDATED = "LIQUIDATED",
}

export enum LOAD_STATUS_VALUE {
    PENDING = "Pendiente",
    LIQUIDATED = "Liquidado",
    DELETED = "Eliminado",
}

const chipsToLoadStatus: Record<LOAD_STATUS_VALUE, ChipStyleClass> = {
    Liquidado: {
        backgroundClass: 'bg-green-400',
        textClass: 'text-green-500'
    },
    Pendiente: {
        backgroundClass: 'bg-orange-400',
        textClass: 'text-orange-500'
    },
    Eliminado: {
        backgroundClass: 'bg-red-400',
        textClass: 'text-red-500'
    }
}

export const getLoadStatusChipStyle: ChipStyle = (value) => {
    return (
        chipsToLoadStatus[value as LOAD_STATUS_VALUE]
    );
}