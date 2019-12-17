export interface ProxyUser {
    id: number;
    username: string;
    mobile: string;
    email: string;
    roles: string;
    emailValid: number;
}

export class ProxyUserPage {
    constructor(public count: number, public payload: ProxyUser[]) {}
}
