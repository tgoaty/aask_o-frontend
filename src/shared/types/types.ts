enum GeneralPositions {
    B1 = "Бытовка 1",
    B2 = "Бытовка 2",
    UM = "Умывалка",
    KR = "Коридор",
    CH = "Читалка"
}

export interface GeneralMember {
    id: number;
    name: string;
    surname: string;
    room: string;
    position: GeneralPositions;
    date: string;
}

export interface GeneralInfo {
    GeneralInfo: GeneralMember[]
}

export interface Resident {
    id: number;
    name: string;
    surname: string;
    room: string;
    course: number;
    score: number;
    workingOff: number;
    work: boolean;
}
