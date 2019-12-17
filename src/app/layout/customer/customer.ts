export interface Customer {
    id: number;
    name: string;
    description: string;
}

export interface CustomerUser {
    id: number;
    name: string;
    mobile: string;
}

export class CustomerPage {
    constructor(public count: number, public payload: Customer[]) {}
}

export class CustomerDialogData {
    constructor(public command: string, public customer: Customer) {}
}

export class CustomerUserPage {
    constructor(public count: number, public user: CustomerUser[]) {}
}

export interface CustomerProxyUser {
    id: number;
    name: string;
    mobile: string;
}
