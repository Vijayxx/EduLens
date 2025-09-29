import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  HeartHandshake, 
  Plus, 
  Calendar, 
  User, 
  Target,
  CheckCircle,
  AlertTriangle,
  Clock
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Interventions = () => {
  const [newIntervention, setNewIntervention] = useState({
    studentName: "",
    type: "",
    description: "",
    goals: "",
    timeline: ""
  });

  const interventions = [
    {
      id: 1,
      student: "David Kim",
      studentId: "ST2024007",
      type: "Academic Tutoring",
      status: "active",
      startDate: "2024-01-15",
      description: "Math tutoring for Calculus I - struggling with derivatives",
      goals: "Improve test scores by 20%, complete all homework assignments",
      progress: 75,
      lastUpdate: "2 days ago",
      mentor: "Dr. Sarah Johnson"
    },
    {
      id: 2,
      student: "Sarah Martinez", 
      studentId: "ST2024006",
      type: "Counseling",
      status: "scheduled",
      startDate: "2024-01-20",
      description: "Academic stress management and study habits improvement",
      goals: "Develop better time management skills, reduce academic anxiety",
      progress: 25,
      lastUpdate: "5 days ago",
      mentor: "Prof. Lisa Chen"
    },
    {
      id: 3,
      student: "Michael Brown",
      studentId: "ST2024009",
      type: "Study Group",
      status: "completed",
      startDate: "2024-01-08",
      description: "Peer-led study group for Computer Science fundamentals",
      goals: "Pass CS101 with C+ or better, improve coding skills",
      progress: 100,
      lastUpdate: "1 week ago",
      mentor: "Student Mentor Team"
    },
    {
      id: 4,
      student: "Alex Johnson",
      studentId: "ST2024005",
      type: "Academic Planning",
      status: "active",
      startDate: "2024-01-18",
      description: "Course selection and career pathway guidance",
      goals: "Select appropriate courses for next semester, explore internship opportunities",
      progress: 60,
      lastUpdate: "1 day ago",
      mentor: "Academic Advisor"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "default";
      case "scheduled": return "secondary";
      case "completed": return "outline";
      case "cancelled": return "destructive";
      default: return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <Clock className="h-4 w-4" />;
      case "scheduled": return <Calendar className="h-4 w-4" />;
      case "completed": return <CheckCircle className="h-4 w-4" />;
      case "cancelled": return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const interventionTypes = [
    "Academic Tutoring",
    "Counseling",
    "Study Group",
    "Academic Planning",
    "Mentorship",
    "Financial Support",
    "Career Guidance"
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Interventions</h1>
          <p className="text-muted-foreground">Track and manage student support programs</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Intervention
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Schedule New Intervention</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="studentName">Student Name</Label>
                <Input
                  id="studentName"
                  placeholder="Enter student name"
                  value={newIntervention.studentName}
                  onChange={(e) => setNewIntervention({...newIntervention, studentName: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="type">Intervention Type</Label>
                <select
                  id="type"
                  className="w-full p-2 border rounded-md"
                  value={newIntervention.type}
                  onChange={(e) => setNewIntervention({...newIntervention, type: e.target.value})}
                >
                  <option value="">Select type...</option>
                  {interventionTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the intervention plan"
                  value={newIntervention.description}
                  onChange={(e) => setNewIntervention({...newIntervention, description: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="goals">Success Goals</Label>
                <Textarea
                  id="goals"
                  placeholder="Define measurable goals"
                  value={newIntervention.goals}
                  onChange={(e) => setNewIntervention({...newIntervention, goals: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="timeline">Timeline</Label>
                <Input
                  id="timeline"
                  placeholder="e.g., 4 weeks, End of semester"
                  value={newIntervention.timeline}
                  onChange={(e) => setNewIntervention({...newIntervention, timeline: e.target.value})}
                />
              </div>
              <Button className="w-full">Schedule Intervention</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold">{interventions.filter(i => i.status === 'active').length}</div>
            <div className="text-sm text-muted-foreground">Active Interventions</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold">{interventions.filter(i => i.status === 'completed').length}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold">85%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold">{interventions.filter(i => i.status === 'scheduled').length}</div>
            <div className="text-sm text-muted-foreground">Scheduled</div>
          </CardContent>
        </Card>
      </div>

      {/* Active Interventions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HeartHandshake className="h-5 w-5" />
            All Interventions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {interventions.map((intervention) => (
              <div key={intervention.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{intervention.student}</h3>
                      <Badge variant={getStatusColor(intervention.status)} className="text-xs">
                        <div className="flex items-center gap-1">
                          {getStatusIcon(intervention.status)}
                          {intervention.status}
                        </div>
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{intervention.studentId} • {intervention.type}</p>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    Started: {intervention.startDate}
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-sm mb-2">{intervention.description}</p>
                  <div className="text-xs text-muted-foreground">
                    <strong>Goals:</strong> {intervention.goals}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {intervention.mentor}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Updated {intervention.lastUpdate}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {intervention.status !== 'completed' && (
                      <div className="text-sm text-muted-foreground">
                        Progress: {intervention.progress}%
                      </div>
                    )}
                    <Button variant="ghost" size="sm">
                      {intervention.status === 'completed' ? 'View Report' : 'Update Progress'}
                    </Button>
                  </div>
                </div>

                {intervention.status !== 'completed' && (
                  <div className="mt-3">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${intervention.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Intervention Types Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Intervention Type Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {interventionTypes.slice(0, 6).map((type, index) => {
              const successRate = 70 + Math.floor(Math.random() * 25); // Mock data
              const count = Math.floor(Math.random() * 15) + 5;
              return (
                <div key={index} className="p-4 border rounded-lg text-center">
                  <div className="font-medium text-sm mb-2">{type}</div>
                  <div className="text-2xl font-bold mb-1">{successRate}%</div>
                  <div className="text-xs text-muted-foreground">{count} interventions</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Interventions;