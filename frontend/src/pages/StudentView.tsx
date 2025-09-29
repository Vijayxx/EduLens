import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  TrendingUp, 
  Calendar, 
  BookOpen, 
  Target, 
  Clock, 
  Award,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

const StudentView = () => {
  const student = {
    name: "Alex Chen",
    id: "ST2024001",
    avatar: "AC",
    gpa: 3.7,
    year: "Junior",
    major: "Computer Science",
    advisor: "Dr. Sarah Johnson"
  };

  const courses = [
    { name: "Data Structures", grade: "A-", progress: 85, credits: 3, risk: "low" },
    { name: "Database Systems", grade: "B+", progress: 78, credits: 3, risk: "low" },
    { name: "Machine Learning", grade: "B", progress: 70, credits: 3, risk: "medium" },
    { name: "Software Engineering", grade: "A", progress: 92, credits: 4, risk: "low" },
    { name: "Statistics", grade: "C+", progress: 65, credits: 3, risk: "high" }
  ];

  const predictions = {
    nextSemesterGPA: 3.6,
    graduationPrediction: "On Track",
    riskFactors: ["Statistics Performance", "Attendance in ML"],
    recommendations: [
      "Schedule tutoring for Statistics",
      "Attend ML office hours",
      "Form study group for challenging courses"
    ]
  };

  const studyPlan = [
    { task: "Complete Statistics Assignment 3", due: "Tomorrow", priority: "high", estimated: "3 hours" },
    { task: "ML Project Milestone 2", due: "This Friday", priority: "medium", estimated: "5 hours" },
    { task: "Database Lab Report", due: "Next Monday", priority: "medium", estimated: "2 hours" },
    { task: "Data Structures Quiz Prep", due: "Next Week", priority: "low", estimated: "1 hour" }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "warning";
      case "low": return "default";
      default: return "default";
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-lg">{student.avatar}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{student.name}</h1>
                <p className="text-muted-foreground">{student.id} • {student.year} • {student.major}</p>
                <p className="text-sm text-muted-foreground mt-1">Advisor: {student.advisor}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">{student.gpa}</div>
              <div className="text-sm text-muted-foreground">Current GPA</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Current Courses */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Current Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courses.map((course, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{course.name}</h3>
                      <p className="text-sm text-muted-foreground">{course.credits} credits</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={course.risk === "high" ? "destructive" : course.risk === "medium" ? "warning" : "default"}>
                        {course.grade}
                      </Badge>
                      {course.risk === "high" && <AlertTriangle className="h-4 w-4 text-destructive" />}
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Predictions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Predictions & Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">{predictions.nextSemesterGPA}</div>
              <div className="text-sm text-muted-foreground">Predicted Next Semester GPA</div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="font-medium">Graduation Status</span>
              </div>
              <Badge variant="success">{predictions.graduationPrediction}</Badge>
            </div>

            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-warning" />
                Risk Factors
              </h4>
              <ul className="text-sm space-y-1">
                {predictions.riskFactors.map((factor, index) => (
                  <li key={index} className="text-muted-foreground">• {factor}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Recommendations</h4>
              <ul className="text-sm space-y-1">
                {predictions.recommendations.map((rec, index) => (
                  <li key={index} className="text-muted-foreground">• {rec}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Study Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Personalized Study Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {studyPlan.map((task, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-sm">{task.task}</h4>
                  <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                    {task.priority}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {task.due}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {task.estimated}
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  Mark Complete
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Academic Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Academic Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-muted-foreground mb-2">Degree Progress</div>
              <Progress value={60} className="mb-2" />
              <div className="text-sm text-muted-foreground">72 of 120 credits completed</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-2">Current Semester</div>
              <Progress value={75} className="mb-2" />
              <div className="text-sm text-muted-foreground">Week 12 of 16</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-2">Major Requirements</div>
              <Progress value={55} className="mb-2" />
              <div className="text-sm text-muted-foreground">33 of 60 credits completed</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentView;