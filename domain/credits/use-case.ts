import { CreditPlan } from "@prisma/client";
import { CreditsRepository } from "./credits.repository";

export class CreditPlans {
    async getCreditPlans(): Promise<CreditPlan[]> {
        const plans = await new CreditsRepository().getCreditPlans();
        
        return plans
            .filter(plan => plan.createdAt !== undefined && plan.updatedAt !== undefined)
            .map(plan => ({
                ...plan,
                createdAt: plan.createdAt as Date,
                updatedAt: plan.updatedAt as Date
            }));
    }
}