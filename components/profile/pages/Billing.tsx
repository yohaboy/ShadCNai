'use client';

import { CreditCard, Download, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import { getCustomerTransactions } from '@/lib/actions/user';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Session = typeof auth.$Infer.Session;

type Invoice = {
  createdAt: string;
  totalAmount: number;
  status: string;
  invoiceNumber: string;
};

export default function Billing({ session }: { session: Session | null }) {

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!session?.user?.polarCustomerId) return;

    async function fetch() {
      const result = await getCustomerTransactions(session?.user.polarCustomerId!);
      setInvoices(result);
    }

    fetch();
  }, [session]);



  return (
    <div className='flex justify-center w-full px-4 py-6'>
      <div className="w-full max-w-5xl space-y-6">
        {/* Current balance */}
        <Card>
          <CardHeader>
            <CardTitle>Token Balance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-black/10 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Tokens left</p>
                  <p className="text-3xl font-bold mt-1">{session?.user.tokens}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">enjoy your tokens</p>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={()=>router.push("/pricing")} className='bg-green-300/20 hover:bg-green-400/20 hover:cursor-pointer'>Buy Tokens</Button>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Update your billing information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-black/10 rounded-lg flex items-start gap-4">
              <CreditCard className="w-6 h-6 text-primary mt-1" />
              <div>
                <p className="font-medium">Visa</p>
                <p className="text-sm text-muted-foreground mt-1">Expires 12/28</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Invoice History */}
        <Card>
          <CardHeader>
            <CardTitle>Invoice History</CardTitle>
            <CardDescription>Download your past invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {invoices.map((invoice: Invoice) => (
                <div
                  key={invoice.invoiceNumber}
                  className="flex items-center justify-between p-4 rounded-lg bg-black/10 hover:bg-black/20 transition-colors"
                >
                  <div>
                    <p className="font-medium">{new Date(invoice.createdAt).toLocaleDateString()}</p>
                    <p className="text-sm text-muted-foreground">${(invoice.totalAmount / 100).toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs px-2 py-1 bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-200 rounded">
                      {invoice.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
