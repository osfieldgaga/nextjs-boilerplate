import { auth } from '@/auth';

import Popup from '../ui/popup';
import axios from 'axios';
import { GetUserCompany } from '@/domain/user/use-case';
import { ValidateCreditsResponse } from '../api/payment/validate_credits/route';
import Toast from '../ui/toast';
import { CreditsRepository } from '@/domain/credits/credits.repository';
import BillingClientView from './BillingClientView';

export default async function Page({ searchParams }: { searchParams: { [key: string]: string } }) {
  const user = await auth();
  const status = searchParams['payment_status']
  const payment_id = searchParams['payment_id']

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';

  const creditPlans = (await new CreditsRepository().getCreditPlans()).sort((a, b) => a.credits - b.credits);

  console.log('creditPlans', creditPlans);

  let creditAdded = false;
  let creditAddedMessage = "";

  const company = await new GetUserCompany().getUserCompany(user?.user?.id || '');
  // console.log(baseUrl + "/api/payment/validate_credits")

  //when accessing billing, check if a payment was made
  //if so, validate the credits for the user, add them to the user account
  if (payment_id) {
    try {
      const addCredits = await axios.post(`${baseUrl}/api/payment/validate_credits`, {
        paymentId: payment_id,
        companyId: company?.id
      });

      console.log('Credits added:', addCredits.data);

      const addCreditsResponse = addCredits.data as ValidateCreditsResponse;

      if (addCreditsResponse.alreadyProcessed === true) {
        // showToast('Those credits have already been added!', 'error', 5000);
        creditAdded = false;
        creditAddedMessage = 'Those credits have already been added!';
      } else {
        // showToast(`${addCreditsResponse.creditsAdded} credits added successfully!`, 'success');
        creditAdded = true;
        creditAddedMessage = `${addCreditsResponse.creditsAdded} credits added successfully!`;
      }

      if (typeof window !== "undefined") {
        window.location.href = "/billing";
      }
    } catch (error) {
      console.error('Error validating credits:', error);

      // showToast('Those credits have already been added!', 'error', 5000);
      // }
    }
  }
  else {
    console.log('No payment status or payment ID found in search parameters');
  }

  return (
    <main>
      <Toast message={creditAddedMessage} type={creditAdded ? "success" : "error"} showToast={creditAdded} />
      <h3 className='mt-10 text-lg font-semibold'>Billing</h3>
      <Popup
        btnCloseText="Close"
        btnText="A question ?"
        // hideIcon={true}
        title="Billing Support"
        msg="If you have any question about your billing, please contact us at contact@example.com"
        className=""
      />
      {status === 'succeeded' &&
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          Thank you {user?.user?.name} for your payment
        </div>
      }


      {/* {canceled === 'true' &&
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          Sorry {user?.user?.name}, your payment was refused
        </div>
      } */}



      <BillingClientView company={company} creditPlans={creditPlans} hasParams={payment_id ? payment_id.length > 0 : false}/>




    </main>
  );
}

