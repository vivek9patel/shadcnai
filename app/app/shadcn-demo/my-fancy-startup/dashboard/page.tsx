"use client";

import { useState } from "react";
import {
  BarChart3,
  Bell,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Home,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Users,
  Target,
  TrendingUp,
  Flag,
  PieChart,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function DashboardPage() {
  const [searchOpen, setSearchOpen] = useState(false);

  const projects = [
    {
      id: 1,
      name: "Website Redesign",
      status: "In Progress",
      progress: 75,
      dueDate: "2024-02-15",
      team: ["SC", "MJ", "ER"],
      priority: "High",
    },
    {
      id: 2,
      name: "Mobile App",
      status: "Planning",
      progress: 25,
      dueDate: "2024-03-30",
      team: ["DK", "LW"],
      priority: "Medium",
    },
    {
      id: 3,
      name: "Marketing Campaign",
      status: "Review",
      progress: 90,
      dueDate: "2024-01-20",
      team: ["LW", "JW", "ER"],
      priority: "High",
    },
    {
      id: 4,
      name: "API Integration",
      status: "Completed",
      progress: 100,
      dueDate: "2024-01-10",
      team: ["DK", "MJ"],
      priority: "Low",
    },
  ];

  const recentTasks = [
    {
      id: 1,
      title: "Update user interface mockups",
      assignee: "Emily",
      status: "completed",
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Review code changes",
      assignee: "David",
      status: "in-progress",
      time: "4 hours ago",
    },
    {
      id: 3,
      title: "Client feedback call",
      assignee: "Sarah",
      status: "pending",
      time: "6 hours ago",
    },
    {
      id: 4,
      title: "Database optimization",
      assignee: "Mike",
      status: "completed",
      time: "1 day ago",
    },
    {
      id: 5,
      title: "User testing session",
      assignee: "Lisa",
      status: "pending",
      time: "2 days ago",
    },
  ];

  const stats = [
    {
      title: "Active Projects",
      value: "12",
      change: "+2 from last month",
      icon: <Target className="h-4 w-4" />,
    },
    {
      title: "Tasks Completed",
      value: "248",
      change: "+18% from last week",
      icon: <CheckCircle2 className="h-4 w-4" />,
    },
    {
      title: "Team Members",
      value: "8",
      change: "+1 new hire",
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "Success Rate",
      value: "94%",
      change: "+5% improvement",
      icon: <TrendingUp className="h-4 w-4" />,
    },
  ];

  const upcomingDeadlines = [
    {
      project: "Marketing Campaign",
      task: "Final review",
      date: "Today",
      priority: "high",
    },
    {
      project: "Website Redesign",
      task: "User testing",
      date: "Tomorrow",
      priority: "medium",
    },
    {
      project: "Mobile App",
      task: "Design approval",
      date: "Jan 25",
      priority: "low",
    },
    {
      project: "API Integration",
      task: "Documentation",
      date: "Jan 30",
      priority: "medium",
    },
  ];

  const sidebarItems = [
    { icon: <Home className="h-4 w-4" />, label: "Dashboard", active: true },
    { icon: <Target className="h-4 w-4" />, label: "Projects" },
    { icon: <CheckCircle2 className="h-4 w-4" />, label: "Tasks" },
    { icon: <Users className="h-4 w-4" />, label: "Team" },
    { icon: <Calendar className="h-4 w-4" />, label: "Calendar" },
    { icon: <BarChart3 className="h-4 w-4" />, label: "Analytics" },
    { icon: <FileText className="h-4 w-4" />, label: "Reports" },
    { icon: <Settings className="h-4 w-4" />, label: "Settings" },
  ];

  // Chart data
  const projectTimelineData = [
    { month: "Jan", projects: 12, completed: 10 },
    { month: "Feb", projects: 15, completed: 13 },
    { month: "Mar", projects: 18, completed: 16 },
    { month: "Apr", projects: 22, completed: 19 },
    { month: "May", projects: 25, completed: 22 },
    { month: "Jun", projects: 28, completed: 25 },
  ];

  const taskCompletionData = [
    { date: "2024-01-01", tasks: 45 },
    { date: "2024-01-02", tasks: 52 },
    { date: "2024-01-03", tasks: 48 },
    { date: "2024-01-04", tasks: 61 },
    { date: "2024-01-05", tasks: 55 },
    { date: "2024-01-06", tasks: 67 },
    { date: "2024-01-07", tasks: 58 },
  ];

  const teamWorkloadData = [
    { name: "Development", value: 35, fill: "var(--chart-1)" },
    { name: "Design", value: 25, fill: "var(--chart-2)" },
    { name: "Marketing", value: 20, fill: "var(--chart-3)" },
    { name: "QA", value: 15, fill: "var(--chart-4)" },
    { name: "Management", value: 5, fill: "var(--chart-5)" },
  ];

  const COLORS = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
  ];

  const performanceData = [
    { month: "Jan", efficiency: 78, satisfaction: 85 },
    { month: "Feb", efficiency: 82, satisfaction: 88 },
    { month: "Mar", efficiency: 79, satisfaction: 86 },
    { month: "Apr", efficiency: 85, satisfaction: 90 },
    { month: "May", efficiency: 88, satisfaction: 92 },
    { month: "Jun", efficiency: 92, satisfaction: 94 },
  ];

  // Chart configurations
  const chartConfig = {
    projects: {
      label: "Projects",
      color: "var(--chart-1)",
    },
    completed: {
      label: "Completed",
      color: "var(--chart-2)",
    },
    tasks: {
      label: "Tasks",
      color: "var(--chart-3)",
    },
    efficiency: {
      label: "Efficiency",
      color: "var(--chart-4)",
    },
    satisfaction: {
      label: "Satisfaction",
      color: "var(--chart-5)",
    },
    value: {
      label: "Value",
      color: "var(--chart-1)",
    },
    name: {
      label: "Department",
      color: "var(--chart-2)",
    },
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "default";
      case "in progress":
        return "secondary";
      case "planning":
        return "outline";
      case "review":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      case "low":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        <Sidebar>
          <SidebarContent>
            <div className="p-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">
                    TF
                  </span>
                </div>
                <span className="font-bold text-lg">TaskFlow</span>
              </div>
            </div>
            <Separator />
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sidebarItems.map((item, index) => (
                    <SidebarMenuItem key={index}>
                      <SidebarMenuButton
                        className={item.active ? "bg-accent" : ""}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <Separator />
            <SidebarGroup>
              <SidebarGroupLabel>Recent Projects</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {projects.slice(0, 3).map((project) => (
                    <SidebarMenuItem key={project.id}>
                      <SidebarMenuButton>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span className="text-sm">{project.name}</span>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="border-b bg-background px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <div>
                  <h1 className="text-2xl font-bold">Dashboard</h1>
                  <p className="text-muted-foreground">Welcome back, Sarah!</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <ThemeToggle />

                <Command className="rounded-lg border shadow-md">
                  <CommandInput placeholder="Type a command or search..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                      <CommandItem>
                        <Target className="mr-2 h-4 w-4" />
                        <span>Create new project</span>
                      </CommandItem>
                      <CommandItem>
                        <Plus className="mr-2 h-4 w-4" />
                        <span>Add new task</span>
                      </CommandItem>
                      <CommandItem>
                        <Users className="mr-2 h-4 w-4" />
                        <span>Invite team member</span>
                      </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Recent">
                      <CommandItem>
                        <Clock className="mr-2 h-4 w-4" />
                        <span>Website Redesign</span>
                        <CommandShortcut>⌘1</CommandShortcut>
                      </CommandItem>
                      <CommandItem>
                        <Clock className="mr-2 h-4 w-4" />
                        <span>Mobile App</span>
                        <CommandShortcut>⌘2</CommandShortcut>
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>

                <Button size="icon" variant="outline">
                  <Bell className="h-4 w-4" />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
                          alt="@sarah"
                        />
                        <AvatarFallback>SJ</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          Sarah Johnson
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          sarah@taskflow.com
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Log out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="flex-1 p-6 space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    {stat.icon}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">
                      {stat.change}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Projects Overview */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Projects</CardTitle>
                        <CardDescription>
                          Manage your active projects
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Select defaultValue="all">
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Projects</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          New Project
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Project</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Progress</TableHead>
                          <TableHead>Team</TableHead>
                          <TableHead>Due Date</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {projects.map((project) => (
                          <TableRow key={project.id}>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 rounded-full bg-primary"></div>
                                <div>
                                  <div className="font-medium">
                                    {project.name}
                                  </div>
                                  <Badge
                                    variant={getPriorityColor(project.priority)}
                                    className="text-xs"
                                  >
                                    {project.priority}
                                  </Badge>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={getStatusColor(project.status)}>
                                {project.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Progress
                                  value={project.progress}
                                  className="w-16"
                                />
                                <span className="text-sm text-muted-foreground">
                                  {project.progress}%
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex -space-x-1">
                                {project.team.map((member, idx) => (
                                  <Avatar
                                    key={idx}
                                    className="h-6 w-6 border border-background"
                                  >
                                    <AvatarFallback className="text-xs">
                                      {member}
                                    </AvatarFallback>
                                  </Avatar>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {project.dueDate}
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    className="h-8 w-8 p-0"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    Edit Project
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive">
                                    Delete Project
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>
                      Latest updates from your team
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentTasks.map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={task.status === "completed"}
                              disabled={task.status === "completed"}
                            />
                            <div className="flex-1">
                              <p
                                className={`text-sm ${
                                  task.status === "completed"
                                    ? "line-through text-muted-foreground"
                                    : ""
                                }`}
                              >
                                {task.title}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Assigned to {task.assignee} • {task.time}
                              </p>
                            </div>
                          </div>
                          <Badge
                            variant={
                              task.status === "completed"
                                ? "default"
                                : task.status === "in-progress"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {task.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar Cards */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Project
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="mr-2 h-4 w-4" />
                      Invite Team Member
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Meeting
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>

                {/* Upcoming Deadlines */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>Upcoming Deadlines</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {upcomingDeadlines.map((deadline, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <Flag
                          className={`h-4 w-4 mt-0.5 ${
                            deadline.priority === "high"
                              ? "text-red-500"
                              : deadline.priority === "medium"
                              ? "text-yellow-500"
                              : "text-green-500"
                          }`}
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{deadline.task}</p>
                          <p className="text-xs text-muted-foreground">
                            {deadline.project}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {deadline.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Team Performance */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <PieChart className="h-4 w-4" />
                      <span>Team Performance</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
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
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Team Satisfaction</span>
                        <span>96%</span>
                      </div>
                      <Progress value={96} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Timeline</CardTitle>
                  <CardDescription>
                    Monthly project creation and completion overview
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-64 w-full">
                    <BarChart
                      data={projectTimelineData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-muted"
                      />
                      <XAxis
                        dataKey="month"
                        className="text-muted-foreground"
                      />
                      <YAxis className="text-muted-foreground" />
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                        cursor={{ fill: "hsl(var(--muted))", opacity: 0.1 }}
                      />
                      <ChartLegend content={<ChartLegendContent />} />
                      <Bar
                        dataKey="projects"
                        fill="var(--color-projects)"
                        name="Total Projects"
                        radius={[2, 2, 0, 0]}
                      />
                      <Bar
                        dataKey="completed"
                        fill="var(--color-completed)"
                        name="Completed"
                        radius={[2, 2, 0, 0]}
                      />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Team Workload Distribution</CardTitle>
                  <CardDescription>
                    Current team capacity allocation by department
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-64 w-full">
                    <RechartsPieChart
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <Pie
                        data={teamWorkloadData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        stroke="hsl(var(--background))"
                        strokeWidth={2}
                      >
                        {teamWorkloadData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                        formatter={(value: number, name: string) => [
                          `${value}%`,
                          name,
                        ]}
                        labelFormatter={(label) => `Department: ${label}`}
                      />
                      <ChartLegend content={<ChartLegendContent />} />
                    </RechartsPieChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Additional Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Task Completion Trend</CardTitle>
                  <CardDescription>
                    Daily task completion over the last week
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-64 w-full">
                    <AreaChart
                      data={taskCompletionData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-muted"
                      />
                      <XAxis
                        dataKey="date"
                        className="text-muted-foreground"
                        tickFormatter={(value) =>
                          new Date(value).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })
                        }
                      />
                      <YAxis className="text-muted-foreground" />
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                        cursor={{
                          stroke: "var(--color-tasks)",
                          strokeWidth: 2,
                          strokeDasharray: "5 5",
                        }}
                        labelFormatter={(value) =>
                          new Date(value).toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "short",
                            day: "numeric",
                          })
                        }
                      />
                      <Area
                        type="monotone"
                        dataKey="tasks"
                        stroke="var(--color-tasks)"
                        fill="var(--color-tasks)"
                        fillOpacity={0.2}
                        strokeWidth={2}
                        name="Tasks Completed"
                      />
                    </AreaChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Team Performance</CardTitle>
                  <CardDescription>
                    Monthly efficiency and satisfaction metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-64 w-full">
                    <LineChart
                      data={performanceData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-muted"
                      />
                      <XAxis
                        dataKey="month"
                        className="text-muted-foreground"
                      />
                      <YAxis className="text-muted-foreground" />
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                        cursor={{
                          stroke: "hsl(var(--muted-foreground))",
                          strokeWidth: 1,
                          strokeDasharray: "3 3",
                        }}
                      />
                      <ChartLegend content={<ChartLegendContent />} />
                      <Line
                        type="monotone"
                        dataKey="efficiency"
                        stroke="var(--color-efficiency)"
                        strokeWidth={3}
                        dot={{
                          fill: "var(--color-efficiency)",
                          strokeWidth: 2,
                          r: 4,
                        }}
                        activeDot={{ r: 6, strokeWidth: 2 }}
                        name="Efficiency %"
                      />
                      <Line
                        type="monotone"
                        dataKey="satisfaction"
                        stroke="var(--color-satisfaction)"
                        strokeWidth={3}
                        dot={{
                          fill: "var(--color-satisfaction)",
                          strokeWidth: 2,
                          r: 4,
                        }}
                        activeDot={{ r: 6, strokeWidth: 2 }}
                        name="Satisfaction %"
                      />
                    </LineChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
