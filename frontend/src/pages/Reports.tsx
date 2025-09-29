import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Download, 
  Calendar, 
  BarChart3, 
  Users, 
  TrendingUp,
  Eye,
  Share
} from "lucide-react";

const Reports = () => {
  const reports = [
    {
      id: 1,
      title: "Monthly Performance Analytics",
      description: "Comprehensive analysis of student performance, attendance, and risk factors for December 2024",
      type: "Performance",
      generatedDate: "2024-01-15",
      period: "December 2024",
      format: "PDF",
      pages: 24,
      status: "ready"
    },
    {
      id: 2,
      title: "Department Success Metrics",
      description: "Cross-departmental comparison of success rates, GPA distributions, and intervention effectiveness",
      type: "Departmental", 
      generatedDate: "2024-01-10",
      period: "Fall 2024 Semester",
      format: "PDF",
      pages: 18,
      status: "ready"
    },
    {
      id: 3,
      title: "At-Risk Student Analysis",
      description: "Detailed breakdown of students flagged for academic risk with recommended intervention strategies",
      type: "Risk Assessment",
      generatedDate: "2024-01-12",
      period: "Current Semester",
      format: "PDF",
      pages: 15,
      status: "ready"
    },
    {
      id: 4,
      title: "Intervention Effectiveness Report",
      description: "Analysis of intervention programs, success rates, and ROI on student support initiatives",
      type: "Interventions",
      generatedDate: "2024-01-08",
      period: "Q4 2024",
      format: "PDF", 
      pages: 12,
      status: "ready"
    },
    {
      id: 5,
      title: "Weekly Progress Summary",
      description: "Real-time dashboard metrics and key performance indicators for the current week",
      type: "Weekly",
      generatedDate: "Generating...",
      period: "Week of Jan 15-21",
      format: "PDF",
      pages: 8,
      status: "generating"
    },
    {
      id: 6,
      title: "Predictive Analytics Report", 
      description: "Machine learning insights on graduation rates, dropout predictions, and early warning indicators",
      type: "Predictive",
      generatedDate: "Scheduled for Jan 20",
      period: "Spring 2024 Projections",
      format: "PDF",
      pages: 22,
      status: "scheduled"
    }
  ];

  const quickReports = [
    {
      title: "Student Performance Summary",
      description: "Quick overview of key metrics",
      icon: BarChart3,
      estimatedTime: "2-3 minutes"
    },
    {
      title: "Attendance Analytics",
      description: "Weekly attendance patterns and trends",
      icon: Calendar,
      estimatedTime: "1-2 minutes"
    },
    {
      title: "Risk Assessment Dashboard",
      description: "Current at-risk student overview",
      icon: TrendingUp,
      estimatedTime: "2-4 minutes"
    },
    {
      title: "Department Comparison",
      description: "Cross-departmental metrics comparison",
      icon: Users,
      estimatedTime: "3-5 minutes"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready": return "default";
      case "generating": return "secondary";
      case "scheduled": return "outline";
      default: return "default";
    }
  };

  const getTypeColor = (type: string): "default" | "secondary" | "outline" => {
    const colors: ("default" | "secondary" | "outline")[] = ["default", "secondary", "outline"];
    return colors[type.length % colors.length];
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">Generate and access comprehensive analytics reports</p>
      </div>

      {/* Quick Generate Section */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Quick Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickReports.map((report, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <report.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium text-sm mb-2">{report.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">{report.description}</p>
                <div className="text-xs text-muted-foreground mb-3">
                  Est. {report.estimatedTime}
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Generate Report
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Available Reports */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Available Reports
            </CardTitle>
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              Schedule Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium">{report.title}</h3>
                      <Badge variant={getTypeColor(report.type)}>{report.type}</Badge>
                      <Badge variant={getStatusColor(report.status)}>{report.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Period: {report.period}</span>
                      <span>Format: {report.format}</span>
                      <span>Pages: {report.pages}</span>
                    </div>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    {report.generatedDate}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="text-sm text-muted-foreground">
                    Generated on {report.generatedDate}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {report.status === "ready" && (
                      <>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <Eye className="h-3 w-3" />
                          Preview
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <Share className="h-3 w-3" />
                          Share
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Download className="h-3 w-3" />
                          Download
                        </Button>
                      </>
                    )}
                    {report.status === "generating" && (
                      <Badge variant="secondary">Generating...</Badge>
                    )}
                    {report.status === "scheduled" && (
                      <Badge variant="outline">Scheduled</Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Analytics */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Report Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">247</div>
              <div className="text-sm text-muted-foreground">Reports generated this month</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Most Popular</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-lg font-semibold mb-2">Performance Analytics</div>
              <div className="text-sm text-muted-foreground">Downloaded 89 times</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Automation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">12</div>
              <div className="text-sm text-muted-foreground">Scheduled reports</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Custom Report Builder */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Report Builder</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Build Custom Reports</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Create tailored reports with specific metrics, date ranges, and custom filters to meet your unique needs.
            </p>
            <Button>
              Start Building Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;