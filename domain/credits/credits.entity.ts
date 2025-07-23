export interface CreditPlan {
    id: string;
    credits: number;
    productId: string,
    createdAt?: Date;
    updatedAt?: Date;
}