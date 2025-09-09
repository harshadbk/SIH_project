import React from "react";
import { Brain, Heart, Shield, TrendingUp, AlertTriangle, CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";

export function AISummary({ onComplete, user }) {
  if (!user?.assessmentResults) return null;

  const { phq9Score, gad7Score, ghq12Score } = user.assessmentResults;

  // Severity levels based on standard scoring
  const getDepressionLevel = (score) => {
    if (score <= 4) return { level: "Minimal", severity: "low", color: "chart-2" };
    if (score <= 9) return { level: "Mild", severity: "mild", color: "chart-4" };
    if (score <= 14) return { level: "Moderate", severity: "moderate", color: "chart-3" };
    if (score <= 19) return { level: "Moderately Severe", severity: "high", color: "destructive" };
    return { level: "Severe", severity: "high", color: "destructive" };
  };

  const getAnxietyLevel = (score) => {
    if (score <= 4) return { level: "Minimal", severity: "low", color: "chart-2" };
    if (score <= 9) return { level: "Mild", severity: "mild", color: "chart-4" };
    if (score <= 14) return { level: "Moderate", severity: "moderate", color: "chart-3" };
    return { level: "Severe", severity: "high", color: "destructive" };
  };

  const getWellnessLevel = (score) => {
    // GHQ-12 scoring (0-36, higher scores indicate more distress)
    if (score <= 11) return { level: "Good", severity: "low", color: "chart-2" };
    if (score <= 15) return { level: "Mild Distress", severity: "mild", color: "chart-4" };
    if (score <= 20) return { level: "Moderate Distress", severity: "moderate", color: "chart-3" };
    return { level: "Severe Distress", severity: "high", color: "destructive" };
  };

  const depression = getDepressionLevel(phq9Score);
  const anxiety = getAnxietyLevel(gad7Score);
  const wellness = getWellnessLevel(ghq12Score);

  const generatePersonalizedInsights = () => {
    const insights = [];
    const highestConcern = Math.max(phq9Score, gad7Score, ghq12Score);
    
    if (phq9Score === highestConcern && phq9Score > 9) {
      insights.push({
        title: "Focus on Mood Support",
        description: "Your assessment suggests mood-related concerns may be impacting your daily life. Consider connecting with a counselor and exploring mood-boosting activities.",
        icon: Heart,
        priority: "high"
      });
    }
    
    if (gad7Score === highestConcern && gad7Score > 9) {
      insights.push({
        title: "Anxiety Management",
        description: "Anxiety appears to be a significant factor. Learning anxiety management techniques like deep breathing and mindfulness could be very beneficial.",
        icon: Brain,
        priority: "high"
      });
    }
    
    if (wellness.severity === "high") {
      insights.push({
        title: "Overall Wellness Focus",
        description: "Your general mental health score suggests multiple areas that could benefit from attention. A holistic approach focusing on sleep, exercise, and stress management is recommended.",
        icon: Shield,
        priority: "medium"
      });
    }
    
    // Positive insights
    if (Math.max(phq9Score, gad7Score, ghq12Score) <= 9) {
      insights.push({
        title: "Maintaining Wellness",
        description: "Your scores indicate good overall mental health. Focus on maintaining healthy habits and continue using the resources available to you.",
        icon: CheckCircle,
        priority: "low"
      });
    }

    return insights;
  };

  const insights = generatePersonalizedInsights();

  const recommendations = [
    {
      title: "AI Chat Support",
      description: "Continue conversations with our AI assistant for ongoing support",
      action: "Start Chat",
      type: "immediate"
    },
    {
      title: "Professional Counseling",
      description: "Book an appointment with a licensed mental health professional",
      action: "Book Now",
      type: "professional"
    },
    {
      title: "Wellness Resources",
      description: "Explore our library of mental health resources and tools",
      action: "Browse Resources",
      type: "educational"
    },
    {
      title: "Peer Support",
      description: "Connect with fellow students in our supportive community",
      action: "Join Forum",
      type: "community"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-emerald-50 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-chart-1 to-chart-2 rounded-full flex items-center justify-center mx-auto">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl text-foreground">Your Personalized Wellness Summary</h1>
            <p className="text-muted-foreground">AI-generated insights based on your assessment</p>
          </div>
        </div>

        {/* Assessment Results */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-chart-1" />
                <CardTitle className="text-sm">Depression (PHQ-9)</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl text-foreground">{phq9Score}/27</span>
                  <Badge variant="secondary" className={`bg-${depression.color}/20 text-${depression.color}`}>
                    {depression.level}
                  </Badge>
                </div>
                <Progress value={(phq9Score / 27) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-chart-2" />
                <CardTitle className="text-sm">Anxiety (GAD-7)</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl text-foreground">{gad7Score}/21</span>
                  <Badge variant="secondary" className={`bg-${anxiety.color}/20 text-${anxiety.color}`}>
                    {anxiety.level}
                  </Badge>
                </div>
                <Progress value={(gad7Score / 21) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-chart-3" />
                <CardTitle className="text-sm">General Wellness (GHQ-12)</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl text-foreground">{ghq12Score}/36</span>
                  <Badge variant="secondary" className={`bg-${wellness.color}/20 text-${wellness.color}`}>
                    {wellness.level}
                  </Badge>
                </div>
                <Progress value={(ghq12Score / 36) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-chart-1" />
              <span>Personalized Insights</span>
            </CardTitle>
            <CardDescription>
              AI-generated recommendations based on your assessment results
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {insights.map((insight, index) => {
              const Icon = insight.icon;
              return (
                <div key={index} className="flex space-x-4 p-4 rounded-lg bg-accent/30">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    insight.priority === "high" ? "bg-destructive/20" : 
                    insight.priority === "medium" ? "bg-chart-3/20" : "bg-chart-2/20"
                  }`}>
                    <Icon className={`h-5 w-5 ${
                      insight.priority === "high" ? "text-destructive" : 
                      insight.priority === "medium" ? "text-chart-3" : "text-chart-2"
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-foreground mb-1">{insight.title}</h4>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Recommended Next Steps</CardTitle>
            <CardDescription>
              Choose how you'd like to continue your wellness journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="p-4 rounded-lg border border-border hover:border-chart-1/50 transition-colors">
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-foreground">{rec.title}</h4>
                      <p className="text-sm text-muted-foreground">{rec.description}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full rounded-full"
                    >
                      {rec.action}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Important Notice */}
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="p-6">
            <div className="flex space-x-3">
              <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
              <div className="space-y-2">
                <h4 className="text-foreground">Important Note</h4>
                <p className="text-sm text-muted-foreground">
                  This assessment is a screening tool and not a diagnostic instrument. If you're experiencing 
                  significant distress or having thoughts of self-harm, please reach out to a mental health 
                  professional immediately or contact emergency services.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Continue Button */}
        <div className="text-center">
          <Button 
            onClick={onComplete}
            size="lg"
            className="bg-chart-1 hover:bg-chart-1/90 text-white rounded-full px-12 py-6"
          >
            Continue to Dashboard
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}