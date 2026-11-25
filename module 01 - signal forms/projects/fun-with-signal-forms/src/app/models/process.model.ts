export interface SuperClaim {
    readonly superClaimNum: number;
}

export const PROCESS_TYPES = ['holiday', 'sick-days'] as const;
export type ProcessType = typeof PROCESS_TYPES[number];

export interface Claim {
    readonly claimNum: number;
    readonly description: string;
    readonly summary: string;
    readonly startDate: string;
    readonly endDate: string;
}

export interface Process {
    readonly key: string;
    readonly clerk: string;
    readonly type: ProcessType;
    readonly favoriteColors: readonly string[];
    readonly description: string;
    readonly summary: string;
    readonly primaryClaim: Claim;
    readonly secondaryClaim: Claim;
    readonly history: readonly Claim[];
    
}

export const EMPTY_PRCESS: Process = {
    clerk: 'john', 
    key: '', 
    type: 'holiday',
    favoriteColors: [],
    description: '',
    summary: '', 
    primaryClaim: { claimNum: 0, description: '', summary: '', startDate: '', endDate: '' },
    secondaryClaim: { claimNum: 0, description: '', summary: '', startDate: '', endDate: '' },
    history: [],
}

