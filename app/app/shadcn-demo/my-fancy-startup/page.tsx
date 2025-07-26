"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Star,
  Play,
  Users,
  Zap,
  Shield,
  TrendingUp,
  Clock,
  MessageSquare,
  BarChart3,
  Calendar,
  FileText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function LandingPage() {
  const [videoOpen, setVideoOpen] = useState(false);

  const features = [
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Advanced Analytics",
      description:
        "Get insights into your team's productivity with detailed reports and visualizations.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Team Collaboration",
      description:
        "Work seamlessly with your team using real-time updates and shared workspaces.",
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Smart Scheduling",
      description:
        "AI-powered scheduling that adapts to your team's working patterns and preferences.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Enterprise Security",
      description:
        "Bank-level security with end-to-end encryption and compliance certifications.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast",
      description:
        "Built for performance with sub-second load times and real-time synchronization.",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Smart Templates",
      description:
        "Pre-built templates and workflows to get your projects started in minutes.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      company: "TechCorp",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content:
        "TaskFlow has revolutionized how our team manages projects. We've increased productivity by 40% since switching.",
      rating: 5,
    },
    {
      name: "Marcus Johnson",
      role: "CTO",
      company: "StartupXYZ",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content:
        "The best project management tool we've ever used. The automation features alone have saved us hours every week.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Team Lead",
      company: "DesignStudio",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content:
        "TaskFlow's intuitive interface made it easy for our entire team to adopt. We saw results immediately.",
      rating: 5,
    },
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "500K+", label: "Projects Completed" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/50 py-20 sm:py-32">
        <div className="container mx-auto relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-8">
              🚀 New: AI-powered project insights now available
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              Project management that
              <span className="text-primary"> actually works</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              TaskFlow helps teams stay organized, collaborate effectively, and
              deliver projects on time. Join thousands of teams already using
              our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" asChild>
                <Link href="/shadcn-demo/my-fancy-startup/dashboard">
                  Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="lg">
                    <Play className="mr-2 h-4 w-4" />
                    Watch Demo
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>TaskFlow in Action</DialogTitle>
                    <DialogDescription>
                      See how TaskFlow can transform your team's productivity
                    </DialogDescription>
                  </DialogHeader>
                  <AspectRatio
                    ratio={16 / 9}
                    className="bg-muted rounded-lg flex items-center justify-center"
                  >
                    <Play className="h-16 w-16 text-muted-foreground" />
                    <span className="ml-4 text-lg text-muted-foreground">
                      Demo Video Placeholder
                    </span>
                  </AspectRatio>
                </DialogContent>
              </Dialog>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Free 14-day trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-xl text-muted-foreground">
              Powerful features designed to help your team work smarter, not
              harder.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="relative overflow-hidden group hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product Demo Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                See TaskFlow in action
              </h2>
              <p className="text-xl text-muted-foreground">
                Explore our intuitive interface and powerful features
              </p>
            </div>

            <Tabs defaultValue="dashboard" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Overview Dashboard</CardTitle>
                    <CardDescription>
                      Get a bird's eye view of all your projects
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            Website Redesign
                          </span>
                          <Badge>In Progress</Badge>
                        </div>
                        <Progress value={75} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          Due in 5 days
                        </p>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            Mobile App
                          </span>
                          <Badge variant="secondary">Planning</Badge>
                        </div>
                        <Progress value={25} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          Due in 3 weeks
                        </p>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            Marketing Campaign
                          </span>
                          <Badge variant="outline">Review</Badge>
                        </div>
                        <Progress value={90} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          Due tomorrow
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="projects">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Management</CardTitle>
                    <CardDescription>
                      Organize tasks, assign team members, and track progress
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-4 h-4 rounded border-2 border-primary"></div>
                          <div>
                            <p className="font-medium">
                              Design homepage mockups
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Due today
                            </p>
                          </div>
                        </div>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" />
                          <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-4 h-4 rounded border-2 border-muted bg-primary"></div>
                          <div>
                            <p className="font-medium line-through text-muted-foreground">
                              Set up project repository
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Completed yesterday
                            </p>
                          </div>
                        </div>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" />
                          <AvatarFallback>MJ</AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics">
                <Card>
                  <CardHeader>
                    <CardTitle>Team Analytics</CardTitle>
                    <CardDescription>
                      Track performance and identify improvement opportunities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-medium">Team Productivity</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Tasks Completed</span>
                            <span>85%</span>
                          </div>
                          <Progress value={85} />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>On-time Delivery</span>
                            <span>92%</span>
                          </div>
                          <Progress value={92} />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-medium">Recent Activity</h4>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>Sarah completed "Design Review"</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                            <span>New comment on "Homepage"</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            <span>Project milestone reached</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Loved by teams worldwide
            </h2>
            <p className="text-xl text-muted-foreground">
              Don't just take our word for it. Here's what our customers have to
              say.
            </p>
          </div>

          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage
                            src={testimonial.avatar}
                            alt={testimonial.name}
                          />
                          <AvatarFallback>
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.company}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        "{testimonial.content}"
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Frequently asked questions
              </h2>
              <p className="text-xl text-muted-foreground">
                Everything you need to know about TaskFlow
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  How does the free trial work?
                </AccordionTrigger>
                <AccordionContent>
                  You get full access to all TaskFlow features for 14 days. No
                  credit card required. You can invite your team, create
                  projects, and explore all premium features during the trial
                  period.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Can I change plans later?</AccordionTrigger>
                <AccordionContent>
                  Absolutely! You can upgrade or downgrade your plan at any
                  time. Changes take effect immediately, and we'll prorate the
                  billing accordingly.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Do you offer enterprise plans?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, we offer custom enterprise plans with advanced security
                  features, dedicated support, and on-premise deployment
                  options. Contact our sales team for more information.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>How secure is my data?</AccordionTrigger>
                <AccordionContent>
                  We take security seriously. All data is encrypted in transit
                  and at rest using industry-standard encryption. We're SOC 2
                  compliant and undergo regular security audits.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>
                  Can I integrate with other tools?
                </AccordionTrigger>
                <AccordionContent>
                  TaskFlow integrates with over 50 popular tools including
                  Slack, GitHub, Google Workspace, Microsoft Teams, and many
                  more. We also offer a robust API for custom integrations.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto">
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to transform your workflow?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of teams who have already made the switch to
                TaskFlow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/shadcn-demo/my-fancy-startup/dashboard">
                    Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/shadcn-demo/my-fancy-startup/contact">
                    Talk to Sales
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
