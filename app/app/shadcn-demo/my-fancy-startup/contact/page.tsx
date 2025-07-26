"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  Calendar,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    // Reset after 3 seconds
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  const contactMethods = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      description: "Get in touch via email",
      value: "hello@taskflow.com",
      action: "Send Email",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Call Us",
      description: "Speak with our team",
      value: "+1 (555) 123-4567",
      action: "Call Now",
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Live Chat",
      description: "Chat with support",
      value: "Available 24/7",
      action: "Start Chat",
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Book a Demo",
      description: "Schedule a personalized demo",
      value: "30-minute sessions",
      action: "Schedule Demo",
    },
  ];

  const offices = [
    {
      city: "San Francisco",
      address: "123 Tech Street, Suite 400",
      timezone: "PST (UTC-8)",
      phone: "+1 (555) 123-4567",
    },
    {
      city: "New York",
      address: "456 Business Ave, Floor 12",
      timezone: "EST (UTC-5)",
      phone: "+1 (555) 987-6543",
    },
    {
      city: "London",
      address: "789 Innovation Square",
      timezone: "GMT (UTC+0)",
      phone: "+44 20 1234 5678",
    },
  ];

  const supportOptions = [
    {
      title: "Technical Support",
      description: "Get help with technical issues and troubleshooting",
      responseTime: "< 4 hours",
      availability: "24/7",
    },
    {
      title: "Sales Inquiries",
      description: "Learn about pricing, plans, and custom solutions",
      responseTime: "< 2 hours",
      availability: "Mon-Fri 9AM-6PM",
    },
    {
      title: "Partnership",
      description: "Explore partnership and integration opportunities",
      responseTime: "< 24 hours",
      availability: "Mon-Fri 9AM-5PM",
    },
  ];

  return (
    <div className="py-20">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl font-bold mb-4">Get in touch</h1>
          <p className="text-xl text-muted-foreground">
            We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 mb-20">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you within 24
                  hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {formSubmitted ? (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      Thank you for your message! We'll get back to you soon.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input id="firstName" placeholder="John" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input id="lastName" placeholder="Doe" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@company.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" placeholder="Your Company" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="role">Your Role</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ceo">CEO/Founder</SelectItem>
                          <SelectItem value="cto">CTO</SelectItem>
                          <SelectItem value="product-manager">
                            Product Manager
                          </SelectItem>
                          <SelectItem value="team-lead">Team Lead</SelectItem>
                          <SelectItem value="developer">Developer</SelectItem>
                          <SelectItem value="designer">Designer</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="teamSize">Team Size</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="How many people are on your team?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-5">1-5 people</SelectItem>
                          <SelectItem value="6-10">6-10 people</SelectItem>
                          <SelectItem value="11-25">11-25 people</SelectItem>
                          <SelectItem value="26-50">26-50 people</SelectItem>
                          <SelectItem value="51-100">51-100 people</SelectItem>
                          <SelectItem value="100+">100+ people</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label>How can we help you?</Label>
                      <RadioGroup defaultValue="general">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="general" id="general" />
                          <Label htmlFor="general">General inquiry</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="demo" id="demo" />
                          <Label htmlFor="demo">Schedule a demo</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sales" id="sales" />
                          <Label htmlFor="sales">Sales inquiry</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="support" id="support" />
                          <Label htmlFor="support">Technical support</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="partnership"
                            id="partnership"
                          />
                          <Label htmlFor="partnership">Partnership</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more about your needs..."
                        className="min-h-[120px]"
                        required
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="newsletter" />
                        <Label htmlFor="newsletter" className="text-sm">
                          Subscribe to our newsletter for product updates and
                          tips
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" required />
                        <Label htmlFor="terms" className="text-sm">
                          I agree to the{" "}
                          <Link href="#" className="underline">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="#" className="underline">
                            Privacy Policy
                          </Link>{" "}
                          *
                        </Label>
                      </div>
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact Methods */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Other ways to reach us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactMethods.map((method, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-4 rounded-lg border"
                  >
                    <div className="p-2 rounded-md bg-primary/10 text-primary">
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{method.title}</h4>
                      <p className="text-xs text-muted-foreground mb-1">
                        {method.description}
                      </p>
                      <p className="text-sm font-medium">{method.value}</p>
                      <Button size="sm" variant="outline" className="mt-2">
                        {method.action}
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Support Hours</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Email Support</span>
                  <Badge variant="secondary">24/7</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Live Chat</span>
                  <Badge variant="secondary">24/7</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Phone Support</span>
                  <Badge variant="outline">Mon-Fri 9AM-6PM PST</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Support Options */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How can we help?</h2>
            <p className="text-xl text-muted-foreground">
              Choose the type of support that best fits your needs
            </p>
          </div>

          <Tabs defaultValue="support" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="support">Support</TabsTrigger>
              <TabsTrigger value="sales">Sales</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="support" className="mt-8">
              <div className="grid md:grid-cols-3 gap-6">
                {supportOptions.map((option, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{option.title}</CardTitle>
                      <CardDescription>{option.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Response Time:</span>
                        <Badge variant="secondary">{option.responseTime}</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Availability:</span>
                        <Badge variant="outline">{option.availability}</Badge>
                      </div>
                      <Button className="w-full" variant="outline">
                        Get Help
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="sales" className="mt-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Schedule a Demo</CardTitle>
                    <CardDescription>
                      See TaskFlow in action with a personalized demonstration
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>30-minute personalized demo</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Q&A with our product experts</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Custom pricing discussion</span>
                      </li>
                    </ul>
                    <Button className="w-full">Schedule Demo</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Enterprise Sales</CardTitle>
                    <CardDescription>
                      Custom solutions for large organizations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Custom deployment options</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Volume discounts available</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Dedicated success manager</span>
                      </li>
                    </ul>
                    <Button className="w-full" variant="outline">
                      Contact Sales
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="resources" className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Documentation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Complete guides and API references
                    </p>
                    <Button variant="outline" className="w-full">
                      Browse Docs
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Video Tutorials</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Learn TaskFlow with step-by-step videos
                    </p>
                    <Button variant="outline" className="w-full">
                      Watch Videos
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Community</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Connect with other TaskFlow users
                    </p>
                    <Button variant="outline" className="w-full">
                      Join Community
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Status Page</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Check service status and incidents
                    </p>
                    <Button variant="outline" className="w-full">
                      View Status
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Office Locations */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Offices</h2>
            <p className="text-xl text-muted-foreground">
              Visit us at one of our locations around the world
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {offices.map((office, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{office.city}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">
                      {office.address}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">
                      {office.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Timezone</p>
                    <p className="text-sm text-muted-foreground">
                      {office.timezone}
                    </p>
                  </div>
                  <Separator />
                  <Button variant="outline" className="w-full">
                    Get Directions
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
              <p className="text-muted-foreground mb-6">
                Check out our frequently asked questions or reach out to our
                support team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" asChild>
                  <Link href="/shadcn-demo/my-fancy-startup#faq">View FAQ</Link>
                </Button>
                <Button asChild>
                  <Link href="/shadcn-demo/my-fancy-startup/dashboard">
                    Start Free Trial
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
