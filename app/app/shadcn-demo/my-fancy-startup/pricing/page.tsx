"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, X, Star, ArrowRight, HelpCircle, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small teams getting started",
      monthlyPrice: 0,
      yearlyPrice: 0,
      popular: false,
      features: [
        "Up to 5 team members",
        "3 projects",
        "Basic task management",
        "File sharing (1GB)",
        "Email support",
        "Mobile app access",
      ],
      limitations: [
        "No advanced analytics",
        "No custom workflows",
        "No integrations",
      ],
    },
    {
      name: "Professional",
      description: "Best for growing teams and businesses",
      monthlyPrice: 15,
      yearlyPrice: 12,
      popular: true,
      features: [
        "Up to 25 team members",
        "Unlimited projects",
        "Advanced task management",
        "File sharing (100GB)",
        "Priority support",
        "Mobile app access",
        "Time tracking",
        "Custom workflows",
        "Basic integrations",
        "Team analytics",
      ],
      limitations: ["No white-label options", "No API access"],
    },
    {
      name: "Enterprise",
      description: "For large organizations with advanced needs",
      monthlyPrice: 30,
      yearlyPrice: 25,
      popular: false,
      features: [
        "Unlimited team members",
        "Unlimited projects",
        "Advanced task management",
        "File sharing (1TB)",
        "24/7 priority support",
        "Mobile app access",
        "Time tracking",
        "Custom workflows",
        "All integrations",
        "Advanced analytics",
        "White-label options",
        "API access",
        "Single sign-on (SSO)",
        "Advanced security",
        "Custom contracts",
      ],
      limitations: [],
    },
  ];

  const features = [
    {
      category: "Core Features",
      items: [
        {
          name: "Task Management",
          starter: true,
          professional: true,
          enterprise: true,
        },
        {
          name: "Project Templates",
          starter: false,
          professional: true,
          enterprise: true,
        },
        {
          name: "Time Tracking",
          starter: false,
          professional: true,
          enterprise: true,
        },
        {
          name: "Custom Workflows",
          starter: false,
          professional: true,
          enterprise: true,
        },
        {
          name: "Advanced Search",
          starter: false,
          professional: true,
          enterprise: true,
        },
      ],
    },
    {
      category: "Collaboration",
      items: [
        {
          name: "Real-time Updates",
          starter: true,
          professional: true,
          enterprise: true,
        },
        {
          name: "Comments & Mentions",
          starter: true,
          professional: true,
          enterprise: true,
        },
        {
          name: "File Sharing",
          starter: "1GB",
          professional: "100GB",
          enterprise: "1TB",
        },
        {
          name: "Guest Access",
          starter: false,
          professional: true,
          enterprise: true,
        },
        {
          name: "Team Chat",
          starter: false,
          professional: true,
          enterprise: true,
        },
      ],
    },
    {
      category: "Analytics & Reporting",
      items: [
        {
          name: "Basic Reports",
          starter: false,
          professional: true,
          enterprise: true,
        },
        {
          name: "Advanced Analytics",
          starter: false,
          professional: false,
          enterprise: true,
        },
        {
          name: "Custom Dashboards",
          starter: false,
          professional: false,
          enterprise: true,
        },
        {
          name: "Data Export",
          starter: false,
          professional: true,
          enterprise: true,
        },
        {
          name: "API Access",
          starter: false,
          professional: false,
          enterprise: true,
        },
      ],
    },
    {
      category: "Security & Admin",
      items: [
        {
          name: "Two-Factor Auth",
          starter: true,
          professional: true,
          enterprise: true,
        },
        {
          name: "Role-based Permissions",
          starter: false,
          professional: true,
          enterprise: true,
        },
        {
          name: "Single Sign-On (SSO)",
          starter: false,
          professional: false,
          enterprise: true,
        },
        {
          name: "Audit Logs",
          starter: false,
          professional: false,
          enterprise: true,
        },
        {
          name: "Advanced Security",
          starter: false,
          professional: false,
          enterprise: true,
        },
      ],
    },
  ];

  const renderFeatureCell = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="h-4 w-4 text-green-500 mx-auto" />
      ) : (
        <X className="h-4 w-4 text-gray-300 mx-auto" />
      );
    }
    return <span className="text-sm text-center">{value}</span>;
  };

  return (
    <TooltipProvider>
      <div className="py-20">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold mb-4">
              Simple, transparent pricing
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Choose the perfect plan for your team. Always know what
              you&apos;ll pay.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <Label
                htmlFor="billing-toggle"
                className={!isYearly ? "font-semibold" : ""}
              >
                Monthly
              </Label>
              <Switch
                id="billing-toggle"
                checked={isYearly}
                onCheckedChange={setIsYearly}
              />
              <div className="flex items-center space-x-2">
                <Label
                  htmlFor="billing-toggle"
                  className={isYearly ? "font-semibold" : ""}
                >
                  Yearly
                </Label>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  Save 20%
                </Badge>
              </div>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative ${
                  plan.popular ? "border-primary shadow-lg scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-base">
                    {plan.description}
                  </CardDescription>

                  <div className="mt-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold">
                        ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-muted-foreground ml-1">/month</span>
                    </div>
                    {isYearly && plan.monthlyPrice > 0 && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Billed annually (${plan.yearlyPrice * 12}/year)
                      </p>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                    asChild
                  >
                    <Link href="/shadcn-demo/my-fancy-startup/dashboard">
                      {plan.name === "Starter"
                        ? "Get Started"
                        : "Start Free Trial"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">
                      Features included:
                    </h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-start space-x-3"
                        >
                          <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {plan.limitations.length > 0 && (
                      <>
                        <Separator className="my-4" />
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm text-muted-foreground">
                            Not included:
                          </h4>
                          <ul className="space-y-2">
                            {plan.limitations.map((limitation, limitIndex) => (
                              <li
                                key={limitIndex}
                                className="flex items-start space-x-3"
                              >
                                <X className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-muted-foreground">
                                  {limitation}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Feature Comparison Table */}
          <div className="max-w-6xl mx-auto mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Compare all features</h2>
              <p className="text-xl text-muted-foreground">
                See exactly what&apos;s included in each plan
              </p>
            </div>

            <Tabs defaultValue="features" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="features">Feature Comparison</TabsTrigger>
                <TabsTrigger value="limits">Usage Limits</TabsTrigger>
              </TabsList>

              <TabsContent value="features">
                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">Feature</TableHead>
                        <TableHead className="text-center">Starter</TableHead>
                        <TableHead className="text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <span>Professional</span>
                            <Badge variant="secondary" className="text-xs">
                              Popular
                            </Badge>
                          </div>
                        </TableHead>
                        <TableHead className="text-center">
                          Enterprise
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {features.map((category, categoryIndex) => (
                        <>
                          <TableRow
                            key={`category-${categoryIndex}`}
                            className="bg-muted/50"
                          >
                            <TableCell
                              colSpan={4}
                              className="font-semibold text-sm py-3"
                            >
                              {category.category}
                            </TableCell>
                          </TableRow>
                          {category.items.map((item, itemIndex) => (
                            <TableRow key={`${categoryIndex}-${itemIndex}`}>
                              <TableCell className="font-medium flex items-center space-x-2">
                                <span>{item.name}</span>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <HelpCircle className="h-3 w-3 text-muted-foreground" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Learn more about {item.name}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TableCell>
                              <TableCell className="text-center">
                                {renderFeatureCell(item.starter)}
                              </TableCell>
                              <TableCell className="text-center">
                                {renderFeatureCell(item.professional)}
                              </TableCell>
                              <TableCell className="text-center">
                                {renderFeatureCell(item.enterprise)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </TabsContent>

              <TabsContent value="limits">
                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Usage Limit</TableHead>
                        <TableHead className="text-center">Starter</TableHead>
                        <TableHead className="text-center">
                          Professional
                        </TableHead>
                        <TableHead className="text-center">
                          Enterprise
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          Team Members
                        </TableCell>
                        <TableCell className="text-center">5</TableCell>
                        <TableCell className="text-center">25</TableCell>
                        <TableCell className="text-center">Unlimited</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Projects</TableCell>
                        <TableCell className="text-center">3</TableCell>
                        <TableCell className="text-center">Unlimited</TableCell>
                        <TableCell className="text-center">Unlimited</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Storage</TableCell>
                        <TableCell className="text-center">1GB</TableCell>
                        <TableCell className="text-center">100GB</TableCell>
                        <TableCell className="text-center">1TB</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          API Calls/month
                        </TableCell>
                        <TableCell className="text-center">-</TableCell>
                        <TableCell className="text-center">-</TableCell>
                        <TableCell className="text-center">100,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Support Response
                        </TableCell>
                        <TableCell className="text-center">48 hours</TableCell>
                        <TableCell className="text-center">24 hours</TableCell>
                        <TableCell className="text-center">4 hours</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Enterprise CTA */}
          <div className="max-w-4xl mx-auto mb-20">
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold mb-2">
                      Need a custom solution?
                    </h3>
                    <p className="text-muted-foreground">
                      Get a tailored plan with custom features, dedicated
                      support, and volume discounts.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                    <Button variant="outline" asChild>
                      <Link href="/shadcn-demo/my-fancy-startup/contact">
                        Contact Sales
                      </Link>
                    </Button>
                    <Button asChild>
                      <Link href="/shadcn-demo/my-fancy-startup/dashboard">
                        Start Free Trial
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Pricing FAQ</h2>
              <p className="text-xl text-muted-foreground">
                Common questions about our pricing
              </p>
            </div>

            <div className="space-y-6">
              <Alert>
                <Zap className="h-4 w-4" />
                <AlertDescription>
                  <strong>Free Trial:</strong> All paid plans come with a 14-day
                  free trial. No credit card required to start.
                </AlertDescription>
              </Alert>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Can I change plans anytime?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Yes! You can upgrade or downgrade your plan at any time.
                      Changes take effect immediately with prorated billing.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      What happens if I exceed limits?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      We&apos;ll notify you before you reach your limits. You
                      can upgrade your plan or we&apos;ll help you optimize your
                      usage.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Do you offer non-profit discounts?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Yes! We offer 50% discounts for qualified non-profit
                      organizations. Contact our support team to apply.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Is my data secure?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Absolutely. We use bank-level encryption and are SOC 2
                      compliant. Your data is always protected and backed up.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
