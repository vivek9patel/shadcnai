"use client";

import Link from "next/link";
import {
  Users,
  Target,
  Award,
  Globe,
  ArrowRight,
  LinkedinIcon,
  TwitterIcon,
  GithubIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

export default function AboutPage() {
  const stats = [
    { number: "50K+", label: "Active Users", progress: 75 },
    { number: "1M+", label: "Tasks Completed", progress: 85 },
    { number: "99.9%", label: "Uptime", progress: 99 },
    { number: "150+", label: "Countries", progress: 60 },
  ];

  const values = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Customer First",
      description:
        "Everything we do is driven by our customers' success. We listen, we adapt, and we deliver solutions that make a real difference.",
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Innovation",
      description:
        "We constantly push the boundaries of what's possible, using cutting-edge technology to solve real-world problems.",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Excellence",
      description:
        "We hold ourselves to the highest standards and are committed to delivering exceptional quality in everything we build.",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Impact",
      description:
        "We believe in building products that can make a positive impact on teams and organizations around the world.",
    },
  ];

  const timeline = [
    {
      year: "2019",
      title: "The Beginning",
      description:
        "TaskFlow was founded with a simple mission: make project management accessible to everyone.",
      milestone: "Company Founded",
    },
    {
      year: "2020",
      title: "First Customers",
      description:
        "Launched our MVP and welcomed our first 100 customers who believed in our vision.",
      milestone: "MVP Launch",
    },
    {
      year: "2021",
      title: "Series A",
      description:
        "Raised $10M Series A to expand our team and accelerate product development.",
      milestone: "$10M Raised",
    },
    {
      year: "2022",
      title: "Global Expansion",
      description:
        "Opened offices in New York and London, serving customers across 3 continents.",
      milestone: "Global Reach",
    },
    {
      year: "2023",
      title: "AI Integration",
      description:
        "Launched AI-powered features that revolutionized how teams plan and execute projects.",
      milestone: "AI Features",
    },
    {
      year: "2024",
      title: "Enterprise Ready",
      description:
        "Achieved SOC 2 compliance and launched enterprise features for large organizations.",
      milestone: "Enterprise Launch",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Co-Founder",
      bio: "Former VP of Product at TechCorp. Passionate about building tools that empower teams.",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Mike Chen",
      role: "CTO & Co-Founder",
      bio: "Previously led engineering at StartupX. Expert in scalable systems and AI/ML.",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      linkedin: "#",
      github: "#",
    },
    {
      name: "Emily Rodriguez",
      role: "VP of Design",
      bio: "Award-winning designer with 10+ years creating intuitive user experiences.",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "David Kim",
      role: "VP of Engineering",
      bio: "Former engineering lead at CloudCorp. Focused on building reliable, secure systems.",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      linkedin: "#",
      github: "#",
    },
    {
      name: "Lisa Wang",
      role: "VP of Marketing",
      bio: "Growth expert who helped scale multiple B2B SaaS companies from startup to IPO.",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "James Wilson",
      role: "VP of Sales",
      bio: "Sales leader with deep experience in enterprise software and customer success.",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      linkedin: "#",
      twitter: "#",
    },
  ];

  const investors = [
    { name: "Acme Ventures", stage: "Series A", amount: "$10M" },
    { name: "Tech Capital", stage: "Seed", amount: "$2M" },
    { name: "Innovation Partners", stage: "Pre-Seed", amount: "$500K" },
  ];

  return (
    <div className="py-20">
      <div className="container mx-auto">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Building the future of
            <span className="text-primary"> project management</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            We&apos;re a passionate team of builders, designers, and
            problem-solvers on a mission to help teams everywhere work more
            effectively and achieve their goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/shadcn-demo/my-fancy-startup/contact">
                Join Our Team <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/shadcn-demo/my-fancy-startup/dashboard">
                Try TaskFlow
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground mb-3">
                  {stat.label}
                </div>
                <Progress value={stat.progress} className="h-2" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission & Values */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                We believe that great work happens when teams are empowered with
                the right tools. Our mission is to eliminate the friction in
                project management so teams can focus on what they do best:
                creating amazing products and services.
              </p>
              <p className="text-lg text-muted-foreground">
                Founded in 2019, TaskFlow has grown from a simple idea to a
                platform trusted by thousands of teams worldwide. We&apos;re
                just getting started.
              </p>
            </div>
            <div className="relative">
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
                <CardContent className="p-8">
                  <div className="text-center">
                    <div className="text-4xl mb-4">🚀</div>
                    <h3 className="text-xl font-semibold mb-2">
                      Empowering Teams
                    </h3>
                    <p className="text-muted-foreground">
                      Since day one, we&apos;ve helped teams complete over 1
                      million tasks and achieve their most ambitious goals.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Values */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto p-3 rounded-lg bg-primary/10 text-primary w-fit">
                    {value.icon}
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-muted-foreground">
              Key milestones in our mission to transform project management
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-px bg-border"></div>
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } items-center`}
                >
                  <div className="flex-1 lg:pr-8">
                    <Card
                      className={
                        index % 2 === 0
                          ? "lg:ml-auto lg:max-w-md"
                          : "lg:mr-auto lg:max-w-md"
                      }
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary">{item.year}</Badge>
                          <Badge variant="outline">{item.milestone}</Badge>
                        </div>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{item.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                  <div className="flex-1 lg:pl-8"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground">
              The people behind TaskFlow&apos;s success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((person, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarImage src={person.avatar} alt={person.name} />
                    <AvatarFallback>
                      {person.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-lg mb-1">{person.name}</h3>
                  <p className="text-primary text-sm mb-3">{person.role}</p>
                  <p className="text-muted-foreground text-sm mb-4">
                    {person.bio}
                  </p>
                  <div className="flex justify-center space-x-2">
                    {person.linkedin && (
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <LinkedinIcon className="h-4 w-4" />
                      </Button>
                    )}
                    {person.twitter && (
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <TwitterIcon className="h-4 w-4" />
                      </Button>
                    )}
                    {person.github && (
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <GithubIcon className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Investors */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Backed by Great Investors
            </h2>
            <p className="text-xl text-muted-foreground">
              We&apos;re grateful for the support of world-class investors
            </p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="space-y-6">
                {investors.map((investor, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{investor.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {investor.stage}
                        </p>
                      </div>
                      <Badge variant="secondary">{investor.amount}</Badge>
                    </div>
                    {index < investors.length - 1 && (
                      <Separator className="mt-6" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">
                Want to join our mission?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                We&apos;re always looking for talented people who share our
                passion for building great products.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/shadcn-demo/my-fancy-startup/contact">
                    View Open Positions <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/shadcn-demo/my-fancy-startup/contact">
                    Get in Touch
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
