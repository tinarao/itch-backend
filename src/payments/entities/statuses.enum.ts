export enum PaymentCallbackStatuses {
    Succeeded = "payment.succeeded",
    WaitingForCapture = "payment.waiting_for_capture",
    Cancelled = "payment.canceled",
    RefundSucceeded = "refund.succeeded"
}