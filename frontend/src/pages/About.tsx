import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone, MapPin, Users, Target, Award } from "lucide-react";

const About = () => {
  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Data Scientist",
      description: "PhD in Educational Psychology with 15+ years in academic analytics"
    },
    {
      name: "Marcus Rodriguez",
      role: "Product Director",
      description: "Former university administrator focused on student success initiatives"
    },
    {
      name: "Lisa Thompson",
      role: "Lead Developer",
      description: "Full-stack engineer specializing in educational technology platforms"
    },
    {
      name: "Dr. James Wilson",
      role: "Academic Advisor",
      description: "Dean Emeritus with expertise in institutional research and analytics"
    }
  ];

  const values = [
    {
      icon: Users,
      title: "Student-Centered",
      description: "Every feature is designed with student success as the primary goal."
    },
    {
      icon: Target,
      title: "Data-Driven",
      description: "Evidence-based insights that lead to measurable improvements in outcomes."
    },
    {
      icon: Award,
      title: "Privacy-First",
      description: "Protecting student data with enterprise-grade security and compliance."
    }
  ];

  const stats = [
    { value: "500K+", label: "Students Supported" },
    { value: "850+", label: "Educational Institutions" },
    { value: "95%", label: "Customer Satisfaction" },
    { value: "40%", label: "Average Retention Improvement" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container-wide">
          <div className="flex h-16 items-center justify-between">
            <Button asChild variant="ghost" className="gap-2">
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <div className="font-bold text-xl tracking-tight">EduLens</div>
            <Button asChild>
              <Link to="/app/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-wide text-center">
          <h1 className="hero-title mb-6">
            About{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              EduLens
            </span>
          </h1>
          <p className="body-large text-muted-foreground mb-8 max-w-3xl mx-auto">
            We're on a mission to transform education through intelligent analytics, 
            helping institutions identify at-risk students early and implement 
            evidence-based interventions that drive meaningful outcomes.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title mb-6">Our Mission</h2>
              <p className="body-large text-muted-foreground mb-6">
                Every student deserves the opportunity to succeed. By leveraging advanced 
                analytics and machine learning, we help educational institutions identify 
                challenges before they become barriers.
              </p>
              <p className="text-muted-foreground">
                Founded in 2020 by educators and data scientists, EduLens has grown from 
                a simple dashboard to a comprehensive platform that serves hundreds of 
                institutions worldwide, impacting the lives of over half a million students.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="text-2xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="section-title mb-6">Our Values</h2>
            <p className="body-large text-muted-foreground max-w-2xl mx-auto">
              The principles that guide every decision we make and every feature we build.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover-lift">
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="card-title mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="section-title mb-6">Meet Our Team</h2>
            <p className="body-large text-muted-foreground max-w-2xl mx-auto">
              Passionate educators, researchers, and engineers working together 
              to improve student outcomes worldwide.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="hover-lift">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-primary mx-auto mb-4 flex items-center justify-center text-white font-bold text-lg">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm text-primary mb-3">{member.role}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="section-title mb-6">Get in Touch</h2>
              <p className="body-large text-muted-foreground mb-8">
                Ready to transform your institution's approach to student success? 
                We'd love to hear from you.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-sm text-muted-foreground">hello@edulens.com</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="text-sm text-muted-foreground">+1 (555) 123-4567</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Address</div>
                    <div className="text-sm text-muted-foreground">
                      123 Education Ave<br />
                      San Francisco, CA 94102
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-6">Schedule a Demo</h3>
                <div className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Institution Name" 
                    className="w-full p-3 border rounded-lg"
                  />
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="w-full p-3 border rounded-lg"
                  />
                  <input 
                    type="text" 
                    placeholder="Your Role" 
                    className="w-full p-3 border rounded-lg"
                  />
                  <select className="w-full p-3 border rounded-lg">
                    <option>Number of Students</option>
                    <option>Under 1,000</option>
                    <option>1,000 - 5,000</option>
                    <option>5,000 - 10,000</option>
                    <option>Over 10,000</option>
                  </select>
                  <textarea 
                    placeholder="Tell us about your goals and challenges"
                    className="w-full p-3 border rounded-lg h-24"
                  />
                  <Button className="w-full">
                    Schedule Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="font-bold text-xl tracking-tight mb-4 md:mb-0">
              EduLens
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 EduLens. Empowering education through insight.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;