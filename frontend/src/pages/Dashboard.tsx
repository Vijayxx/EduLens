import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  BookOpen, 
  AlertTriangle, 
  CheckCircle,
  Target,
  Calendar,
  ArrowRight 
} from "lucide-react";

interface DashboardProps {
  userRole: 'student' | 'faculty' | 'admin';
}

const Dashboard = ({ userRole }: DashboardProps) => {
  const getMetrics = () => {
    switch (userRole) {
      case 'student':
        return [
          { title: "Current GPA", value: "3.7", change: "+0.2", trend: "up", color: "success" },
          { title: "Attendance", value: "92%", change: "+3%", trend: "up", color: "success" },
          { title: "Risk Level", value: "Low", change: "Improved", trend: "up", color: "success" },
          { title: "Course Load", value: "5", change: "Normal", trend: "neutral", color: "default" }
        ];
      case 'faculty':
        return [
          { title: "Class Average GPA", value: "3.2", change: "-0.1", trend: "down", color: "warning" },
          { title: "Avg Attendance", value: "87%", change: "-2%", trend: "down", color: "warning" },
          { title: "At-Risk Students", value: "8", change: "+2", trend: "down", color: "destructive" },
          { title: "Active Courses", value: "4", change: "Same", trend: "neutral", color: "default" }
        ];
      case 'admin':
      default:
        return [
          { title: "Overall GPA", value: "3.4", change: "+0.1", trend: "up", color: "success" },
          { title: "Attendance Rate", value: "85%", change: "+1%", trend: "up", color: "success" },
          { title: "At-Risk Students", value: "12%", change: "-2%", trend: "up", color: "success" },
          { title: "Active Interventions", value: "47", change: "+5", trend: "up", color: "default" }
        ];
    }
  };

  const getRecentActivity = () => {
    switch (userRole) {
      case 'student':
        return [
          { title: "Assignment Submitted", subtitle: "Data Structures - Project 2", time: "2 hours ago", type: "success" },
          { title: "Grade Posted", subtitle: "Statistics - Midterm Exam: A-", time: "1 day ago", type: "success" },
          { title: "Study Session", subtitle: "Machine Learning Study Group", time: "2 days ago", type: "info" },
          { title: "Course Reminder", subtitle: "Physics Lab Due Tomorrow", time: "3 days ago", type: "warning" }
        ];
      case 'faculty':
        return [
          { title: "Student Flagged", subtitle: "John Smith - Multiple absences", time: "30 min ago", type: "warning" },
          { title: "Intervention Scheduled", subtitle: "Sarah Chen - Academic Support", time: "2 hours ago", type: "info" },
          { title: "Assignment Graded", subtitle: "CS101 - 28 submissions reviewed", time: "1 day ago", type: "success" },
          { title: "Parent Meeting", subtitle: "Academic progress discussion", time: "2 days ago", type: "info" }
        ];
      case 'admin':
      default:
        return [
          { title: "Risk Alert", subtitle: "5 students flagged for intervention", time: "15 min ago", type: "warning" },
          { title: "Report Generated", subtitle: "Monthly Performance Analytics", time: "1 hour ago", type: "success" },
          { title: "Course Review", subtitle: "Chemistry Department - Low pass rates", time: "3 hours ago", type: "warning" },
          { title: "System Update", subtitle: "ML model retrained with new data", time: "1 day ago", type: "info" }
        ];
    }
  };

  const getQuickActions = () => {
    switch (userRole) {
      case 'student':
        return [
          { title: "View Study Plan", subtitle: "Personalized recommendations", icon: Target, href: "/app/student/plan" },
          { title: "Check Schedule", subtitle: "Upcoming classes & deadlines", icon: Calendar, href: "/app/schedule" },
          { title: "Academic Progress", subtitle: "Detailed performance analytics", icon: TrendingUp, href: "/app/student/me" }
        ];
      case 'faculty':
        return [
          { title: "Review At-Risk", subtitle: "Students needing attention", icon: AlertTriangle, href: "/app/students?filter=risk" },
          { title: "Class Analytics", subtitle: "Performance & attendance insights", icon: TrendingUp, href: "/app/analytics" },
          { title: "Schedule Intervention", subtitle: "Support struggling students", icon: CheckCircle, href: "/app/interventions" }
        ];
      case 'admin':
      default:
        return [
          { title: "Generate Reports", subtitle: "Institutional performance data", icon: BookOpen, href: "/app/reports" },
          { title: "System Analytics", subtitle: "Platform usage & outcomes", icon: TrendingUp, href: "/app/analytics" },
          { title: "Manage Interventions", subtitle: "Track support programs", icon: Users, href: "/app/interventions" }
        ];
    }
  };

  const metrics = getMetrics();
  const activities = getRecentActivity();
  const actions = getQuickActions();

  const getWelcomeMessage = () => {
    switch (userRole) {
      case 'student':
        return {
          title: "Welcome back, Alex!",
          subtitle: "Your academic journey continues with strong progress."
        };
      case 'faculty':
        return {
          title: "Good morning, Dr. Johnson",
          subtitle: "Review your classes and support your students today."
        };
      case 'admin':
      default:
        return {
          title: "Dashboard Overview",
          subtitle: "Monitor institutional performance and student success."
        };
    }
  };

  const welcome = getWelcomeMessage();

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{welcome.title}</h1>
        <p className="text-muted-foreground">{welcome.subtitle}</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="hover-lift">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">{metric.value}</div>
              <div className="flex items-center text-sm">
                {metric.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-success mr-1" />
                ) : metric.trend === "down" ? (
                  <TrendingDown className="h-4 w-4 text-destructive mr-1" />
                ) : null}
                <span className={
                  metric.color === "success" ? "text-success" :
                  metric.color === "warning" ? "text-warning" :
                  metric.color === "destructive" ? "text-destructive" :
                  "text-muted-foreground"
                }>
                  {metric.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start h-auto p-4 text-left"
                asChild
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <action.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{action.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {action.subtitle}
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    activity.type === "success" ? "bg-success" :
                    activity.type === "warning" ? "bg-warning" :
                    activity.type === "info" ? "bg-primary" :
                    "bg-muted-foreground"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{activity.title}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {activity.subtitle}
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview - Admin/Faculty Only */}
      {userRole !== 'student' && (
        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-sm text-muted-foreground mb-2">Course Success Rate</div>
                <Progress value={78} className="mb-2" />
                <div className="text-sm text-muted-foreground">78% passing rate</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-2">Intervention Success</div>
                <Progress value={85} className="mb-2" />
                <div className="text-sm text-muted-foreground">85% improvement rate</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-2">Retention Rate</div>
                <Progress value={92} className="mb-2" />
                <div className="text-sm text-muted-foreground">92% student retention</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Student-Specific Progress */}
      {userRole === 'student' && (
        <Card>
          <CardHeader>
            <CardTitle>Your Academic Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-muted-foreground mb-2">Semester Progress</div>
                <Progress value={65} className="mb-2" />
                <div className="text-sm text-muted-foreground">Week 10 of 16</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-2">Degree Completion</div>
                <Progress value={40} className="mb-2" />
                <div className="text-sm text-muted-foreground">72 of 180 credits completed</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;