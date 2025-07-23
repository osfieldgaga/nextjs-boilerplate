'use client'

import React, { useEffect } from 'react'
import CheckoutComponent from '../ui/dodo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Zap } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function BillingClientView({ company, creditPlans, hasParams }) {

    const router = useRouter();
    const params = useSearchParams();
    const path = usePathname();

    useEffect(() => {
        if (hasParams) {
            const next = new URLSearchParams(params.toString());
            next.delete('payment_id');
            next.delete('payment_status');
            next.delete('status');
            router.replace(`${path}?${next.toString()}`, { scroll: false });
        }
    }, [hasParams, params, path, router]);

    return (
        <div className='mt-6 grid_ gap-6 sm:grid-cols-2_'>

            <div className="lg:col-span-2 space-y-8">


                <Card className="md:col-span-2_ bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 max-w-lg">
                    <CardContent className="p-6 m">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                                    <Zap className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900">Available Credits</h3>
                                    <p className="text-sm text-gray-600">Ready to use</p>
                                </div>
                            </div>
                            <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>
                        </div>

                        <div className="mb-4">
                            <div className="text-4xl font-bold text-blue-600 mb-1">
                                {company?.creditBalance}
                            </div>
                            <div className="text-sm text-gray-600">credits remaining</div>
                        </div>

                    </CardContent>
                </Card>

                {/* Credit Packs */}
                <Card>
                    <CardHeader>
                        <CardTitle>Buy Credits</CardTitle>
                        <CardDescription>One-time credit packs valid for 12 months from purchase</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-3 gap-4">
                            {creditPlans.map((pack) => (
                                <div
                                    key={pack.id}
                                    // className={`border rounded-lg p-4 hover:border-orange-300 transition-colors relative ${pack.popular ? "ring-2 ring-orange-500" : ""
                                    className={`border rounded-lg p-4 hover:border-orange-300 transition-colors relative
                      }`}
                                >
                                    {/* {pack.popular && (
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500">
                        Most Popular
                      </Badge>
                    )} */}
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-gray-900">{pack.credits.toLocaleString()}</div>
                                        <div className="text-sm text-gray-500 mb-2">credits</div>
                                        <div className="text-3xl font-bold text-orange-600 mb-1">${pack.price / 100}</div>
                                        <div className="text-xs text-gray-500 mb-3">{(pack.price / 100) / pack.credits} per credit</div>
                                        {/* <div className="text-xs text-gray-600 mb-4">{pack.description}</div> */}
                                        {/* <Button
                        className="w-full"
                        // variant={pack.popular ? "default" : "outline"}
                      // onClick={() => handlePurchase(pack)}
                      >
                        Buy Credits
                      </Button> */}

                                        <CheckoutComponent
                                            productId={pack.productId}
                                            text={`Buy ${pack.credits} Credits`}

                                        />
                                        {/* <div className="text-xs text-gray-500 mt-2">Valid for 12 months</div> */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
