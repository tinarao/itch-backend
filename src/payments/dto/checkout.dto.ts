export interface PaymentData {
    id: string;
    status: string;
    amount: Amount;
    description: string;
    recipient: Recipient;
    created_at: string;
    confirmation: Confirmation;
    test: boolean;
    paid: boolean;
    refundable: boolean;
    metadata: Metadata;
}

export interface Amount {
    value: string;
    currency: string;
}

export interface Recipient {
    account_id: string;
    gateway_id: string;
}

export interface Confirmation {
    type: string;
    confirmation_url: string;
}

export interface Metadata {
    assetId: string;
    orderId: string;
    userId: string;
}
export interface CheckoutDTO {
    type: string;
    event: string;
    object: {
        id: string;
        status: string;
        amount: { value: string; currency: 'RUB' };
        income_amount: { value: string; currency: 'RUB' };
        description: string;
        recipient: { account_id: string; gateway_id: string };
        payment_method: {
            type: string;
            id: string;
            saved: boolean;
            title: string;
        };
        captured_at: string;
        created_at: string;
        test: boolean;
        refunded_amount: { value: string; currency: 'RUB' };
        paid: boolean;
        refundable: true;
        metadata: Metadata;
        authorization_details: {
            rrn: string;
            auth_code: string;
        };
    };
}