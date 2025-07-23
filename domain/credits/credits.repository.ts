import { prismaClientGlobal } from "@/infra/prisma";
import { CreditPlan } from "./credits.entity";
import { CreditsPort } from "./credits.port";
import axios from "axios";

export class CreditsRepository implements CreditsPort {
    async getCreditPlans(): Promise<CreditPlan[]> {
        const creditPlans = await prismaClientGlobal.creditPlan.findMany();

        const plans = await Promise.all(
            creditPlans.map(async (plan) => {
                // Adjust the endpoint if needed
                const { data } = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/credits/plan/${plan.productId}`,
                );
                return {
                    ...plan,
                    ...data, // merge API data into plan
                };
            })
        );

        console.log('Fetched credit plans:', plans);

        return plans;
    }
}