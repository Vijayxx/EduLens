import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Users, Target, Calendar, Shield, Zap } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.png";

const Index = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Predictive Analytics",
      description: "Transform raw academic data into actionable insights with AI-powered predictions."
    },
    {
      icon: Users,
      title: "Student Performance",
      description: "Track individual and cohort performance with comprehensive dashboards."
    },
    {
      icon: Target,
      title: "Early Intervention",
      description: "Identify at-risk students early and deploy targeted support strategies."
    },
    {
      icon: Shield,
      title: "Data Privacy",
      description: "Enterprise-grade security ensuring student data protection and compliance."
    }
  ];

  const stats = [
    { value: "95%", label: "Accuracy in Risk Prediction" },
    { value: "40%", label: "Improvement in Retention" },
    { value: "10k+", label: "Students Supported" },
    { value: "200+", label: "Institutions Trust Us" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container-wide">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={logo} alt="EduLens" className="h-8 w-8" />
              <span className="font-bold text-xl tracking-tight">EduLens</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="#features" className="text-sm font-medium hover:text-primary transition-colors">
                Features
              </Link>
              <Link to="#about" className="text-sm font-medium hover:text-primary transition-colors">
                About
              </Link>
              <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button asChild variant="ghost" size="sm">
                <Link to="/app/dashboard">Sign In</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/app/dashboard">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative section-padding overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="container-wide relative">
          <div className="max-w-4xl mx-auto text-center fade-in">
            <h1 className="hero-title mb-6">
              EduLens — Empower{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Education
              </span>{" "}
              with Insight
            </h1>
            <p className="body-large text-muted-foreground mb-12 max-w-2xl mx-auto">
              Transform academic data into predictive insights and actionable interventions. 
              Support every student's journey with intelligent analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link to="/app/dashboard">
                  Explore Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link to="/about">
                  Schedule Demo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center fade-in">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section-padding">
        <div className="container-wide">
          <div className="text-center mb-16 fade-in">
            <h2 className="section-title mb-6">
              Intelligent Education Analytics
            </h2>
            <p className="body-large text-muted-foreground max-w-2xl mx-auto">
              Our platform combines advanced analytics with educational expertise 
              to create meaningful impact for students and institutions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover-lift fade-in border-0 shadow-card">
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="card-title mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-hero">
        <div className="container-wide text-center">
          <div className="max-w-3xl mx-auto fade-in">
            <h2 className="section-title mb-6">
              Ready to Transform Your Institution?
            </h2>
            <p className="body-large text-muted-foreground mb-8">
              Join leading educational institutions using EduLens to improve 
              student outcomes through data-driven insights.
            </p>
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link to="/app/dashboard">
                Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <img src={logo} alt="EduLens" className="h-8 w-8" />
              <span className="font-bold text-xl tracking-tight">EduLens</span>
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

export default Index;