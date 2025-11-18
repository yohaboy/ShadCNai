'use client';

import { CreditCard, Download, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Billing() {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Current Subscription */}
      <Card>
        <CardHeader>
          <CardTitle>Current Subscription</CardTitle>
          <CardDescription>Manage your subscription plan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-accent rounded-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Current Plan</p>
                <p className="text-3xl font-bold mt-1">Pro</p>
              </div>
              <span className="px-3 py-1 bg-primary text-primary-foreground text-xs rounded-full font-medium">
                Active
              </span>
            </div>
            <p className="text-sm text-muted-foreground">$99/month • Renews Dec 15, 2024</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-border">
            <div>
              <p className="text-xs text-muted-foreground">Storage</p>
              <p className="text-lg font-semibold mt-1">500 GB</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Users</p>
              <p className="text-lg font-semibold mt-1">Unlimited</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">API Calls</p>
              <p className="text-lg font-semibold mt-1">100K/month</p>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button>Upgrade Plan</Button>
            <Button variant="outline">Downgrade</Button>
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
          <div className="p-4 bg-accent rounded-lg flex items-start gap-4">
            <CreditCard className="w-6 h-6 text-primary mt-1" />
            <div>
              <p className="font-medium">Visa ending in 4242</p>
              <p className="text-sm text-muted-foreground mt-1">Expires 12/25</p>
            </div>
          </div>
          <Button variant="outline">Update Payment Method</Button>
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
            {[
              { date: 'Nov 15, 2024', amount: '$99.00', status: 'Paid' },
              { date: 'Oct 15, 2024', amount: '$99.00', status: 'Paid' },
              { date: 'Sep 15, 2024', amount: '$99.00', status: 'Paid' },
              { date: 'Aug 15, 2024', amount: '$99.00', status: 'Paid' },
            ].map((invoice) => (
              <div
                key={invoice.date}
                className="flex items-center justify-between p-4 rounded-lg bg-accent hover:bg-secondary transition-colors"
              >
                <div>
                  <p className="font-medium">{invoice.date}</p>
                  <p className="text-sm text-muted-foreground">{invoice.amount}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                    {invoice.status}
                  </span>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Billing Alert */}
      <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950 dark:border-yellow-800">
        <CardContent className="pt-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-yellow-900 dark:text-yellow-100">Subscription expires in 27 days</p>
            <p className="text-sm text-yellow-800 dark:text-yellow-200 mt-1">
              Your Pro subscription will auto-renew on December 15, 2024. Update your payment method to avoid interruptions.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
