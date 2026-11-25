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

export const SAMPLE_PROCESS: Process =     {
  "clerk": "john",
  "key": "1234567890",
  "type": "holiday",
  "favoriteColors": [],
  "description": "this is more then enough to submit the form alreay please common",
  "summary": "this is a short summary that is enough",
  "primaryClaim": {
    "claimNum": 8,
    "description": "",
    "summary": "",
    "startDate": "2026-11-01",
    "endDate": "2026-11-03"
  },
  "secondaryClaim": {
    "claimNum": 8,
    "description": "",
    "summary": "",
    "startDate": "2026-11-17",
    "endDate": "2026-11-26"
  },
  "history": []
}

