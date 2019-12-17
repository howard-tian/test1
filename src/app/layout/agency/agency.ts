import { UserInfo } from '../../shared/models/user';

export interface Agency {
    id: number;
    name: string;
    description: string;
}

export interface AgencyUser {
    id: number;
    name: string;
    mobile: string;
}

export class AgencyPage {
    constructor(public count: number, public payload: Agency[]) {}
}

export class AgencyDialogData {
    constructor(public command: string, public agency: Agency, public parent: number) {}
}

export class AgencyUserPage {
    constructor(public count: number, public payload: AgencyUser[]) {}
}
