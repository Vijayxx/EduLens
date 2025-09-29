import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Clock,
  Search,
  Filter
} from "lucide-react";

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const courses = [
    {
      id: 1,
      name: "Introduction to Computer Science",
      code: "CS101",
      instructor: "Dr. Smith",
      students: 180,
      avgGrade: 3.2,
      passRate: 85,
      attendance: 78,
      riskLevel: "medium",
      semester: "Fall 2024",
      credits: 3,
      trend: "down"
    },
    {
      id: 2,
      name: "Data Structures & Algorithms",
      code: "CS201",
      instructor: "Prof. Johnson",
      students: 145,
      avgGrade: 2.9,
      passRate: 72,
      attendance: 82,
      riskLevel: "high",
      semester: "Fall 2024",
      credits: 4,
      trend: "down"
    },
    {
      id: 3,
      name: "Database Management Systems",
      code: "CS301",
      instructor: "Dr. Wilson",
      students: 95,
      avgGrade: 3.6,
      passRate: 92,
      attendance: 88,
      riskLevel: "low",
      semester: "Fall 2024",
      credits: 3,
      trend: "up"
    },
    {
      id: 4,
      name: "Machine Learning Fundamentals",
      code: "CS401",
      instructor: "Dr. Chen",
      students: 78,
      avgGrade: 3.4,
      passRate: 88,
      attendance: 91,
      riskLevel: "low",
      semester: "Fall 2024",
      credits: 4,
      trend: "up"
    },
    {
      id: 5,
      name: "Calculus I",
      code: "MATH101",
      instructor: "Prof. Martinez",
      students: 220,
      avgGrade: 2.7,
      passRate: 68,
      attendance: 74,
      riskLevel: "high",
      semester: "Fall 2024",
      credits: 4,
      trend: "down"
    },
    {
      id: 6,
      name: "Physics for Engineers",
      code: "PHYS201",
      instructor: "Dr. Taylor",
      students: 165,
      avgGrade: 3.1,
      passRate: 79,
      attendance: 85,
      riskLevel: "medium",
      semester: "Fall 2024",
      credits: 3,
      trend: "neutral"
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high": return "destructive";
      case "medium": return "warning";
      case "low": return "success";
      default: return "default";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-4 w-4 text-success" />;
      case "down": return <TrendingDown className="h-4 w-4 text-destructive" />;
      default: return null;
    }
  };

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const highRiskCourses = courses.filter(course => course.riskLevel === "high");

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
        <p className="text-muted-foreground">Monitor course performance and identify improvement opportunities</p>
      </div>

      {/* High-Risk Courses Alert */}
      {highRiskCourses.length > 0 && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              High-Risk Courses Requiring Attention
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {highRiskCourses.map((course) => (
                <div key={course.id} className="p-3 bg-background rounded-lg border">
                  <div className="font-medium">{course.name}</div>
                  <div className="text-sm text-muted-foreground">{course.code} • {course.instructor}</div>
                  <div className="flex gap-4 mt-2 text-sm">
                    <span>Pass Rate: {course.passRate}%</span>
                    <span>Avg Grade: {course.avgGrade}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle>All Courses</CardTitle>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-72">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="hover-lift">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Course Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold">{course.name}</h3>
                          <p className="text-muted-foreground">{course.code} • {course.instructor}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {course.students} students
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen className="h-3 w-3" />
                              {course.credits} credits
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {course.semester}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={getRiskColor(course.riskLevel)}>
                            {course.riskLevel} risk
                          </Badge>
                          {getTrendIcon(course.trend)}
                        </div>
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:w-96">
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary">{course.avgGrade}</div>
                        <div className="text-xs text-muted-foreground">Avg Grade</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold">{course.passRate}%</div>
                        <div className="text-xs text-muted-foreground">Pass Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold">{course.attendance}%</div>
                        <div className="text-xs text-muted-foreground">Attendance</div>
                      </div>
                      <div className="text-center">
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bars */}
                  <div className="grid md:grid-cols-3 gap-4 mt-4 pt-4 border-t">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Pass Rate</span>
                        <span>{course.passRate}%</span>
                      </div>
                      <Progress value={course.passRate} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Attendance</span>
                        <span>{course.attendance}%</span>
                      </div>
                      <Progress value={course.attendance} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Performance</span>
                        <span>{Math.round((course.avgGrade / 4) * 100)}%</span>
                      </div>
                      <Progress value={(course.avgGrade / 4) * 100} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Course Statistics Summary */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold">{courses.length}</div>
            <div className="text-sm text-muted-foreground">Total Courses</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-success">
              {courses.filter(c => c.riskLevel === "low").length}
            </div>
            <div className="text-sm text-muted-foreground">Low Risk</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-warning">
              {courses.filter(c => c.riskLevel === "medium").length}
            </div>
            <div className="text-sm text-muted-foreground">Medium Risk</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-destructive">
              {courses.filter(c => c.riskLevel === "high").length}
            </div>
            <div className="text-sm text-muted-foreground">High Risk</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Courses;