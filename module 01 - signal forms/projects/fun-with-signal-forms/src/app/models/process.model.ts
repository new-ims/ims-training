export interface SuperClaim {
    readonly superClaimNum: number;
}

export const PROCESS_TYPES = ['holiday', 'sick-days'] as const;
export type ProcessType = typeof PROCESS_TYPES[number];

export interface Process {
    readonly key: string;
    readonly clerk: string;
    readonly type: ProcessType;
    readonly favoriteColors: string[];
    readonly description: string;
    readonly summary: string;
    
}

export const EMPTY_PRCESS: Process = {
    clerk: 'john', 
    key: '', 
    type: 'holiday',
    favoriteColors: [],
    description: '',
    summary: ''
}

