"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Clock,
  Shield,
  Zap,
  Users,
  BarChart3,
  Bell,
  Calendar,
  FileText,
  MessageSquare,
  Search,
  Target,
  Workflow,
  Globe,
  Lock,
  Smartphone,
  GitBranch,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function FeaturesPage() {
  const [activeFeature, setActiveFeature] = useState(0);

  const mainFeatures = [
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Advanced Analytics",
      description:
        "Get deep insights into your team's performance with customizable dashboards and real-time reporting.",
      features: [
        "Real-time performance metrics",
        "Custom dashboard builder",
        "Automated report generation",
        "Team productivity insights",
        "Goal tracking and OKRs",
      ],
      image: "/api/placeholder/600/400",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Team Collaboration",
      description:
        "Seamless teamwork with real-time updates, file sharing, and integrated communication tools.",
      features: [
        "Real-time collaboration",
        "File sharing and versioning",
        "Team chat and mentions",
        "Guest access control",
        "Activity feeds",
      ],
      image: "/api/placeholder/600/400",
    },
    {
      icon: <Workflow className="h-8 w-8" />,
      title: "Custom Workflows",
      description:
        "Build and automate workflows that match your team's unique processes and requirements.",
      features: [
        "Drag-and-drop workflow builder",
        "Automation rules and triggers",
        "Custom task statuses",
        "Approval processes",
        "Integration with external tools",
      ],
      image: "/api/placeholder/600/400",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Enterprise Security",
      description:
        "Bank-level security with advanced access controls, encryption, and compliance features.",
      features: [
        "End-to-end encryption",
        "Single sign-on (SSO)",
        "Role-based permissions",
        "Audit logs and compliance",
        "Data backup and recovery",
      ],
      image: "/api/placeholder/600/400",
    },
  ];

  const additionalFeatures = [
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Smart Scheduling",
      description:
        "AI-powered scheduling that adapts to your team's working patterns.",
      category: "Productivity",
    },
    {
      icon: <Bell className="h-6 w-6" />,
      title: "Smart Notifications",
      description:
        "Get notified about what matters most, when it matters most.",
      category: "Communication",
    },
    {
      icon: <Search className="h-6 w-6" />,
      title: "Universal Search",
      description:
        "Find anything across projects, tasks, files, and conversations instantly.",
      category: "Productivity",
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Goal Tracking",
      description:
        "Set, track, and achieve your team's objectives with OKR integration.",
      category: "Analytics",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Document Management",
      description:
        "Store, organize, and collaborate on documents with version control.",
      category: "Collaboration",
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Team Chat",
      description:
        "Built-in messaging with channels, direct messages, and file sharing.",
      category: "Communication",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Time Tracking",
      description:
        "Track time spent on tasks and projects with detailed reporting.",
      category: "Productivity",
    },
    {
      icon: <GitBranch className="h-6 w-6" />,
      title: "Version Control",
      description:
        "Keep track of changes with comprehensive version control for all assets.",
      category: "Collaboration",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Global Access",
      description:
        "Access your workspace from anywhere with offline synchronization.",
      category: "Accessibility",
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Privacy Controls",
      description:
        "Granular privacy settings to control who sees what information.",
      category: "Security",
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Mobile Apps",
      description:
        "Native mobile apps for iOS and Android with full feature parity.",
      category: "Accessibility",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Automation",
      description:
        "Automate repetitive tasks with powerful workflow automation.",
      category: "Productivity",
    },
  ];

  const integrations = [
    { name: "Slack", category: "Communication", logo: "🔧" },
    { name: "GitHub", category: "Development", logo: "🔧" },
    { name: "Google Workspace", category: "Productivity", logo: "🔧" },
    { name: "Microsoft Teams", category: "Communication", logo: "🔧" },
    { name: "Zoom", category: "Communication", logo: "🔧" },
    { name: "Figma", category: "Design", logo: "🔧" },
    { name: "Jira", category: "Development", logo: "🔧" },
    { name: "Salesforce", category: "CRM", logo: "🔧" },
    { name: "HubSpot", category: "Marketing", logo: "🔧" },
    { name: "Dropbox", category: "Storage", logo: "🔧" },
    { name: "Adobe Creative", category: "Design", logo: "🔧" },
    { name: "Zapier", category: "Automation", logo: "🔧" },
  ];

  const testimonials = [
    {
      quote:
        "TaskFlow's analytics helped us identify bottlenecks we didn't even know existed.",
      author: "Sarah Johnson",
      role: "Product Manager",
      company: "TechCorp",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    },
    {
      quote:
        "The custom workflows feature transformed how we handle client projects.",
      author: "Mike Chen",
      role: "Operations Director",
      company: "DesignStudio",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
      quote:
        "Finally, a project management tool that our entire team actually wants to use.",
      author: "Emily Rodriguez",
      role: "Team Lead",
      company: "StartupXYZ",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
  ];

  const categories = [...new Set(additionalFeatures.map((f) => f.category))];

  return (
    <div className="py-20">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <Badge variant="secondary" className="mb-6">
            ✨ Powerful Features
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Everything you need to
            <span className="text-primary"> manage projects</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            From simple task tracking to advanced analytics, TaskFlow provides
            all the tools your team needs to stay organized and productive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/shadcn-demo/my-fancy-startup/dashboard">
                Try All Features <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/shadcn-demo/my-fancy-startup/pricing">
                View Pricing
              </Link>
            </Button>
          </div>
        </div>

        {/* Main Features Showcase */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Core Features</h2>
            <p className="text-xl text-muted-foreground">
              The essential tools that make TaskFlow powerful
            </p>
          </div>

          <Tabs
            value={activeFeature.toString()}
            onValueChange={(value) => setActiveFeature(parseInt(value))}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
              {mainFeatures.map((feature, index) => (
                <TabsTrigger
                  key={index}
                  value={index.toString()}
                  className="flex items-center space-x-2"
                >
                  {feature.icon}
                  <span className="hidden sm:inline">{feature.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {mainFeatures.map((feature, index) => (
              <TabsContent key={index} value={index.toString()}>
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-lg bg-primary/10 text-primary">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{feature.title}</h3>
                        <Badge variant="outline" className="mt-1">
                          Core Feature
                        </Badge>
                      </div>
                    </div>

                    <p className="text-lg text-muted-foreground">
                      {feature.description}
                    </p>

                    <ul className="space-y-3">
                      {feature.features.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex items-center space-x-3"
                        >
                          <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <Button asChild>
                      <Link href="/shadcn-demo/my-fancy-startup/dashboard">
                        Try {feature.title}{" "}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>

                  <div className="relative">
                    <Card className="overflow-hidden">
                      <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-6xl mb-4">{feature.icon}</div>
                          <p className="text-lg font-semibold text-muted-foreground">
                            {feature.title} Preview
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Additional Features Grid */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Additional Features</h2>
            <p className="text-xl text-muted-foreground">
              Powerful tools to enhance your workflow
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-2 lg:flex lg:justify-center mb-8">
              <TabsTrigger value="all">All Features</TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {additionalFeatures.map((feature, index) => (
                  <HoverCard key={index}>
                    <HoverCardTrigger asChild>
                      <Card className="cursor-pointer transition-colors hover:bg-muted/50">
                        <CardHeader className="pb-4">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-md bg-primary/10 text-primary">
                              {feature.icon}
                            </div>
                            <div>
                              <CardTitle className="text-sm">
                                {feature.title}
                              </CardTitle>
                              <Badge variant="outline" className="text-xs mt-1">
                                {feature.category}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                      </Card>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-md bg-primary/10 text-primary">
                            {feature.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold">{feature.title}</h4>
                            <Badge variant="outline" className="text-xs">
                              {feature.category}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                        <Button size="sm" className="w-full">
                          Learn More
                        </Button>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                ))}
              </div>
            </TabsContent>

            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {additionalFeatures
                    .filter((feature) => feature.category === category)
                    .map((feature, index) => (
                      <Card
                        key={index}
                        className="transition-colors hover:bg-muted/50"
                      >
                        <CardHeader>
                          <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-md bg-primary/10 text-primary">
                              {feature.icon}
                            </div>
                            <div>
                              <CardTitle className="text-sm">
                                {feature.title}
                              </CardTitle>
                              <CardDescription className="text-xs mt-1">
                                {feature.description}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Integrations Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Integrations</h2>
            <p className="text-xl text-muted-foreground">
              Connect TaskFlow with your favorite tools and services
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
            {integrations.map((integration, index) => (
              <Card
                key={index}
                className="p-4 text-center hover:shadow-md transition-shadow"
              >
                <div className="text-2xl mb-2">{integration.logo}</div>
                <h4 className="font-semibold text-sm mb-1">
                  {integration.name}
                </h4>
                <Badge variant="outline" className="text-xs">
                  {integration.category}
                </Badge>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              And 50+ more integrations available
            </p>
            <Button variant="outline">View All Integrations</Button>
          </div>
        </div>

        {/* Performance Stats */}
        <div className="mb-24">
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">
                  Built for Performance
                </h2>
                <p className="text-xl text-muted-foreground">
                  TaskFlow is designed to be fast, reliable, and scalable
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    99.9%
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Uptime SLA
                  </div>
                  <Progress value={99.9} className="h-2" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    &lt;200ms
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Average Response
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    10M+
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Tasks Processed
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    24/7
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Support Available
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customer Testimonials */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What our customers say</h2>
            <p className="text-xl text-muted-foreground">
              Real feedback from teams using TaskFlow every day
            </p>
          </div>

          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <Card className="p-8">
                    <CardContent className="text-center space-y-6">
                      <blockquote className="text-lg font-medium">
                        &quot;{testimonial.quote}&quot;
                      </blockquote>
                      <div className="flex items-center justify-center space-x-4">
                        <Avatar>
                          <AvatarImage
                            src={testimonial.avatar}
                            alt={testimonial.author}
                          />
                          <AvatarFallback>
                            {testimonial.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-left">
                          <div className="font-semibold">
                            {testimonial.author}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {testimonial.role} at {testimonial.company}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Security Notice */}
        <div className="mb-16">
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              <strong>Enterprise Security:</strong> TaskFlow is SOC 2 Type II
              compliant and uses bank-level encryption to protect your data.
              Learn more about our
              <Link href="#" className="underline ml-1">
                security practices
              </Link>
              .
            </AlertDescription>
          </Alert>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Try all these features with our 14-day free trial
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/shadcn-demo/my-fancy-startup/dashboard">
                    Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/shadcn-demo/my-fancy-startup/contact">
                    Contact Sales
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
