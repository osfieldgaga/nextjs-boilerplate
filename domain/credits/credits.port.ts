import { CreditPlan } from "./credits.entity";

export interface CreditsPort {
  getCreditPlans(): Promise<CreditPlan[]>;

}