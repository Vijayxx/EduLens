import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Filter, TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react";

type Student = {
  student_id: number;
  name: string;
  entry_gpa: number;
  attendance_pct: number;
  at_risk: boolean;
};

const Students = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // keep topStudents placeholder for now
  const topStudents = [
    { id: 1, name: "Emma Rodriguez", gpa: 3.9, trend: "up", courses: 5, avatar: "ER" },
    { id: 2, name: "James Wilson", gpa: 3.8, trend: "up", courses: 4, avatar: "JW" },
    { id: 3, name: "Aisha Patel", gpa: 3.7, trend: "neutral", courses: 5, avatar: "AP" },
    { id: 4, name: "Marcus Chen", gpa: 3.6, trend: "up", courses: 4, avatar: "MC" }
  ];

  // fetch real students
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("/api/students")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Student[]) => {
        setStudents(data);
      })
      .catch((err) => {
        console.error("Failed fetching students:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const getRiskColor = (at_risk: boolean) => {
    if (at_risk) return "destructive"; // red badge
    return "success"; // green badge
  };

  const getStatusIcon = (at_risk: boolean) => {
    if (at_risk) return <AlertTriangle className="h-4 w-4" />;
    return <CheckCircle className="h-4 w-4" />;
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Students</h1>
        <p className="text-muted-foreground">Monitor student performance and identify intervention opportunities</p>
      </div>

      {/* Top Performers (placeholder for now) */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Top Performers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {topStudents.map((student) => (
            <Card key={student.id} className="hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar>
                    <AvatarFallback>{student.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-sm">{student.name}</div>
                    <div className="text-xs text-muted-foreground">{student.courses} courses</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">{student.gpa}</div>
                    <div className="text-xs text-muted-foreground">GPA</div>
                  </div>
                  <div className="flex items-center">
                    {student.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-success" />
                    ) : student.trend === "down" ? (
                      <TrendingDown className="h-4 w-4 text-destructive" />
                    ) : null}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* All Students */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle>All Students</CardTitle>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-72">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
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
          {loading && <div>Loading students…</div>}
          {error && <div className="text-red-600">Error: {error}</div>}

          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <div
                key={student.student_id}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>
                      {student.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{student.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Student ID: {student.student_id}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-center">
                  <div>
                    <div className="text-sm font-medium">{student.entry_gpa?.toFixed(2)}</div>
                    <div className="text-xs text-muted-foreground">GPA</div>
                  </div>

                  <div>
                    <div className="text-sm font-medium">{student.attendance_pct?.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Attendance</div>
                  </div>

                  <Badge variant={getRiskColor(student.at_risk)} className="min-w-16">
                    {student.at_risk ? "High risk" : "Safe"}
                  </Badge>

                  <div className="flex items-center space-x-2">
                    {getStatusIcon(student.at_risk)}
                    <span className="text-sm capitalize">
                      {student.at_risk ? "Flagged" : "Active"}
                    </span>
                  </div>

                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Students;