"use client"

import * as React from "react"
import { CreditCard, Download, Plus, Trash2, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useLanguage } from "@/contexts/language-context"

const mockBillingHistory = [
  {
    id: "inv_001",
    date: "2024-01-15",
    amount: "€30.00",
    status: "paid",
    description: "Pro Plan - Monthly",
  },
  {
    id: "inv_002",
    date: "2023-12-15",
    amount: "€30.00",
    status: "paid",
    description: "Pro Plan - Monthly",
  },
  {
    id: "inv_003",
    date: "2023-11-15",
    amount: "€30.00",
    status: "paid",
    description: "Pro Plan - Monthly",
  },
]

export function BillingSettings() {
  const { t } = useLanguage()
  const [paymentMethod, setPaymentMethod] = React.useState({
    cardNumber: "**** **** **** 4242",
    expiryDate: "12/26",
    cardholderName: "John Doe",
  })

  return (
    <div className="space-y-6">
      {/* Payment Method */}
      <Card className="bg-slate-700/50 backdrop-blur-sm border-slate-600/30 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-apichat-blue-metallic to-blue-500 flex items-center justify-center">
              <CreditCard className="h-4 w-4 text-white" />
            </div>
            {t("billing.title")}
          </CardTitle>
          <p className="text-slate-400 text-sm">{t("billing.subtitle")}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-4">
              <h3 className="text-white font-semibold">{t("billing.paymentMethod")}</h3>
              <div className="bg-slate-600/50 rounded-xl p-4 border border-slate-500/50">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{paymentMethod.cardNumber}</div>
                    <div className="text-slate-400 text-sm">
                      {paymentMethod.cardholderName} • Expires {paymentMethod.expiryDate}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-slate-600/50 text-slate-300 hover:text-white bg-transparent hover:bg-slate-600/30 rounded-xl"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {t("billing.updatePaymentMethod")}
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-800/95 backdrop-blur-sm border-slate-700/50 text-white rounded-2xl max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold">{t("billing.updatePaymentMethod")}</DialogTitle>
                    <DialogDescription className="text-slate-400">
                      Update your payment information for future billing.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-number" className="text-white">
                        {t("billing.cardNumber")}
                      </Label>
                      <Input
                        id="card-number"
                        placeholder="1234 5678 9012 3456"
                        className="bg-slate-700/50 border-slate-600/50 text-white rounded-xl"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry" className="text-white">
                          {t("billing.expiryDate")}
                        </Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          className="bg-slate-700/50 border-slate-600/50 text-white rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv" className="text-white">
                          {t("billing.cvv")}
                        </Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          className="bg-slate-700/50 border-slate-600/50 text-white rounded-xl"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardholder" className="text-white">
                        {t("billing.cardholderName")}
                      </Label>
                      <Input
                        id="cardholder"
                        placeholder="John Doe"
                        className="bg-slate-700/50 border-slate-600/50 text-white rounded-xl"
                      />
                    </div>
                    <Button className="w-full bg-gradient-to-br from-apichat-lime to-apichat-accent hover:from-apichat-lime-light hover:to-apichat-accent text-slate-900 rounded-xl h-12">
                      {t("common.update")}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button
                variant="outline"
                className="border-red-400/50 text-red-400 hover:text-red-300 bg-transparent hover:bg-red-400/10 rounded-xl"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {t("billing.removePaymentMethod")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card className="bg-slate-700/50 backdrop-blur-sm border-slate-600/30 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Calendar className="h-4 w-4 text-white" />
            </div>
            {t("billing.history")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockBillingHistory.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between p-4 bg-slate-600/50 rounded-xl border border-slate-500/50"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-apichat-accent to-emerald-500 flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{invoice.description}</div>
                    <div className="text-slate-400 text-sm">{invoice.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-white font-semibold">{invoice.amount}</div>
                    <Badge
                      variant="secondary"
                      className="bg-apichat-accent/20 text-apichat-accent border-apichat-accent/30 text-xs"
                    >
                      {invoice.status}
                    </Badge>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-slate-600/50 text-slate-300 hover:text-white bg-transparent hover:bg-slate-600/30 rounded-lg"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    {t("billing.download")}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
