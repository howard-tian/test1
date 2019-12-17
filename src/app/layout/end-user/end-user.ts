export interface EndUser {
    id: number;
    username: string;
    mobile: string;
    email: string;
    roles: string;
    emailValid: number;
}

export class EndUserPage {
    constructor(public count: number, public payload: EndUser[]) {}
}
