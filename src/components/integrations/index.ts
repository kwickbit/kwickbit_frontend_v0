export enum Integration {
    QuickBooks = 'QuickBooks',
}

export interface Currencies {
    currencies: {reference: string, name: string}[];
}

export interface Invoice {
    workspaceId: string;
    integrationWorkspaceId: string;
    integration: Integration;
    invoiceId: string;
    integrationInvoiceId: string;
    invoiceDateTime: string;
    totalAmount: number;
    lines: LineInvoice[];
    deposit: number;
    balance: number;
    createTime: string;
    lastUpdatedTime: string;
}

export interface LineInvoice {
    description?: string;
    detailType: string;
    salesItemLineDetail?: {
        taxCodeRef?: {
            value: string;
        },
        qty?: number;
        unitPrice?: number;
        itemRef?: {
            name: string;
            value: string;
        }
    };
    lineNum?: number;
    amount: number;
    id?: string;
}

export interface Bill {
    workspaceId: string;
    integrationWorkspaceId: string;
    integrationBillId: string;
    integration: Integration;
    billId: string;
    billDateTime: string;
    apAccountRef?: {
        name: string,
        value: string;
    };
    vendorRef: {
        name: string;
        value: string;
    };
    totalAmount: number;
    currencyRef: {
        name: string;
        value: string;
    };
    linkedTxn?: {
        txnId: string;
        txnType: string;
    }[];
    salesTermRef?: {
        value: string;
    };
    dueDate: string;
    lines: LineBill[];
    sparse: false;
    id?: string;
    createTime: string;
    lastUpdatedTime: string;
    balance: number;
}

export interface LineBill {
    description?: string;
    detailType?: string;
    projectRef?: {
        value: string;
    };
    amount: number;
    id: string;
    accountBasedExpenseLineDetail?: {
        taxCodeRef: {
            value: string;
        },
        accountRef?: {
            name: string;
            value: string;
        },
        billableStatus?: string;
        customerRef?: {
            name: string;
            value: string;
        }
    }
}

export interface Item {
    id: string;
    name: string;
    integration: string;
    realmId: string;
    workspaceId: string;
    integrationWorkspaceId: string;
    itemType: string;
}
