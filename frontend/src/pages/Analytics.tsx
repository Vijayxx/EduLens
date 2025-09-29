import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Calendar,
  Target,
  AlertTriangle,
  Download
} from "lucide-react";

const Analytics = () => {
  const performanceMetrics = [
    { title: "Overall Student Success Rate", value: "82%", change: "+3%", trend: "up" },
    { title: "Average GPA", value: "3.2", change: "+0.1", trend: "up" },
    { title: "Course Completion Rate", value: "89%", change: "+2%", trend: "up" },
    { title: "Student Retention", value: "94%", change: "+1%", trend: "up" }
  ];

  const departmentPerformance = [
    { name: "Computer Science", avgGPA: 3.4, students: 485, passRate: 88, risk: "low" },
    { name: "Mathematics", avgGPA: 2.9, students: 320, passRate: 76, risk: "medium" },
    { name: "Physics", avgGPA: 3.1, students: 245, passRate: 82, risk: "low" },
    { name: "Engineering", avgGPA: 3.0, students: 380, passRate: 79, risk: "medium" },
    { name: "Business", avgGPA: 3.3, students: 520, passRate: 85, risk: "low" }
  ];

  const riskAnalysis = {
    atRiskStudents: 156,
    totalStudents: 1950,
    riskFactors: [
      { factor: "Low Attendance", percentage: 45, count: 70 },
      { factor: "Failing Grades", percentage: 32, count: 50 },
      { factor: "Course Load", percentage: 23, count: 36 }
    ]
  };

  const interventionStats = [
    { type: "Academic Tutoring", success: 85, total: 120, improvement: "+15%" },
    { type: "Counseling Services", success: 78, total: 95, improvement: "+22%" },
    { type: "Study Groups", success: 72, total: 85, improvement: "+8%" },
    { type: "Mentorship Program", success: 88, total: 65, improvement: "+12%" }
  ];

  const getGradeDistribution = () => [
    { grade: "A", percentage: 25, count: 488 },
    { grade: "B", percentage: 35, count: 683 },
    { grade: "C", percentage: 28, count: 546 },
    { grade: "D", percentage: 8, count: 156 },
    { grade: "F", percentage: 4, count: 78 }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive insights into institutional performance</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
          <Card key={index} className="hover-lift">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">{metric.value}</div>
              <div className="flex items-center text-sm text-success">
                <TrendingUp className="h-4 w-4 mr-1" />
                {metric.change} from last semester
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Grade Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Grade Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {getGradeDistribution().map((grade, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Grade {grade.grade}</span>
                  <span>{grade.count} students ({grade.percentage}%)</span>
                </div>
                <Progress value={grade.percentage} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Risk Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Risk Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-3xl font-bold text-destructive">{riskAnalysis.atRiskStudents}</div>
              <div className="text-sm text-muted-foreground">
                of {riskAnalysis.totalStudents} students at risk ({Math.round((riskAnalysis.atRiskStudents / riskAnalysis.totalStudents) * 100)}%)
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Primary Risk Factors</h4>
              {riskAnalysis.riskFactors.map((factor, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{factor.factor}</span>
                    <span>{factor.count} students ({factor.percentage}%)</span>
                  </div>
                  <Progress value={factor.percentage} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Department Performance Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {departmentPerformance.map((dept, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-medium">{dept.name}</h3>
                    <p className="text-sm text-muted-foreground">{dept.students} students enrolled</p>
                  </div>
                  <Badge variant={dept.risk === "low" ? "success" : "warning"}>
                    {dept.risk} risk
                  </Badge>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Average GPA</div>
                    <div className="text-xl font-bold">{dept.avgGPA}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Pass Rate</div>
                    <div className="text-xl font-bold">{dept.passRate}%</div>
                    <Progress value={dept.passRate} className="mt-1" />
                  </div>
                  <div className="flex items-end">
                    <Button variant="ghost" size="sm">View Details</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Intervention Effectiveness */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Intervention Effectiveness
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {interventionStats.map((intervention, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">{intervention.type}</h3>
                  <Badge variant="success" className="text-xs">
                    {intervention.improvement}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Success Rate</span>
                    <span>{intervention.success} of {intervention.total} students</span>
                  </div>
                  <Progress value={(intervention.success / intervention.total) * 100} />
                  <div className="text-xs text-muted-foreground">
                    {Math.round((intervention.success / intervention.total) * 100)}% success rate
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Predictive Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Predictive Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gradient-primary/10 rounded-lg">
              <div className="text-2xl font-bold text-primary">8.2%</div>
              <div className="text-sm text-muted-foreground">Predicted dropout risk for next semester</div>
            </div>
            <div className="text-center p-4 bg-success/10 rounded-lg">
              <div className="text-2xl font-bold text-success">+0.3</div>
              <div className="text-sm text-muted-foreground">Projected GPA improvement with interventions</div>
            </div>
            <div className="text-center p-4 bg-warning/10 rounded-lg">
              <div className="text-2xl font-bold text-warning">45</div>
              <div className="text-sm text-muted-foreground">Students requiring immediate attention</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;