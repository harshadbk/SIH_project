import React from "react";
import { useNavigate } from "react-router-dom";
import {
  MessageCircle,
  Calendar,
  BookOpen,
  Users,
  Star,
  Shield,
  Clock,
  Heart,
  ArrowRight,
  TrendingUp,
  UserPlus,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function HomePage() {
  const navigate = useNavigate();
  const quickAccessCards = [
    {
      id: "chat",
      title: "AI First-Aid Chat",
      description: "Immediate support when you need it most",
      icon: MessageCircle,
      color: "bg-chart-1/20 text-chart-1",
      hoverColor: "hover:bg-chart-1/30",
    },
    {
      id: "booking",
      title: "Book Appointment",
      description: "Connect with professional counsellors",
      icon: Calendar,
      color: "bg-chart-2/20 text-chart-2",
      hoverColor: "hover:bg-chart-2/30",
    },
    {
      id: "resources",
      title: "Resource Hub",
      description: "Educational content and self-help tools",
      icon: BookOpen,
      color: "bg-chart-4/20 text-chart-4",
      hoverColor: "hover:bg-chart-4/30",
    },
    {
      id: "peer-support",
      title: "Peer Support Forum",
      description: "Connect with fellow students",
      icon: Users,
      color: "bg-chart-5/20 text-chart-5",
      hoverColor: "hover:bg-chart-5/30",
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "100% Confidential",
      description:
        "Your privacy is our priority. All conversations are secure and private.",
    },
    {
      icon: Clock,
      title: "24/7 Available",
      description:
        "Support when you need it, whether it's 2 AM or during lunch break.",
    },
    {
      icon: Heart,
      title: "Stigma-Free Zone",
      description:
        "A safe space designed specifically for student mental wellness.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Quick Access Cards */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-foreground mb-4">
            How Can We Help You Today?
          </h2>
          <p className="text-muted-foreground text-lg">
            Choose the support that fits your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {quickAccessCards.map((card) => {
            const Icon = card.icon;
            return (
              <Card
                key={card.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border-0 ${card.hoverColor} min-h-[280px]`}
                onClick={() => navigate(`/${card.id}`)}
              >
                <CardHeader className="text-center p-8">
                  <div
                    className={`w-20 h-20 mx-auto rounded-full ${card.color} flex items-center justify-center mb-6`}
                  >
                    <Icon className="h-10 w-10" />
                  </div>
                  <CardTitle className="text-foreground text-xl mb-3">
                    {card.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-base leading-relaxed">
                    {card.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Suggested Resources and Peer Groups */}
      <section className="py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Suggested Resources Card */}
          <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 min-h-[320px]">
            <CardHeader className="p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-chart-1/20 rounded-full flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-chart-1" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-foreground mb-2">Suggested Resources</CardTitle>
                  <CardDescription className="text-muted-foreground text-base">
                    Curated mental health resources tailored for you
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg hover:bg-white/70 transition-colors cursor-pointer">
                  <div className="w-2 h-2 bg-chart-1 rounded-full"></div>
                  <span className="text-foreground font-medium">Mindfulness and Meditation Guide</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg hover:bg-white/70 transition-colors cursor-pointer">
                  <div className="w-2 h-2 bg-chart-2 rounded-full"></div>
                  <span className="text-foreground font-medium">Stress Management Techniques</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg hover:bg-white/70 transition-colors cursor-pointer">
                  <div className="w-2 h-2 bg-chart-3 rounded-full"></div>
                  <span className="text-foreground font-medium">Sleep Hygiene Tips</span>
                </div>
              </div>
              <Button 
                onClick={() => navigate("/resources")}
                className="w-full mt-6 bg-chart-1 hover:bg-chart-1/90 text-white rounded-full"
              >
                View All Resources
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Suggested Peer Groups Card */}
          <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 min-h-[320px]">
            <CardHeader className="p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-chart-3/20 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-chart-3" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-foreground mb-2">Suggested Peer Groups</CardTitle>
                  <CardDescription className="text-muted-foreground text-base">
                    Connect with others who understand your journey
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg hover:bg-white/70 transition-colors cursor-pointer">
                  <div className="w-8 h-8 bg-chart-3/20 rounded-full flex items-center justify-center">
                    <UserPlus className="h-4 w-4 text-chart-3" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium">College Students Support</p>
                    <p className="text-xs text-muted-foreground">127 members • Active daily</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg hover:bg-white/70 transition-colors cursor-pointer">
                  <div className="w-8 h-8 bg-chart-4/20 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-chart-4" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium">Anxiety & Stress Management</p>
                    <p className="text-xs text-muted-foreground">89 members • 12 online now</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg hover:bg-white/70 transition-colors cursor-pointer">
                  <div className="w-8 h-8 bg-chart-2/20 rounded-full flex items-center justify-center">
                    <Heart className="h-4 w-4 text-chart-2" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium">Mindfulness & Wellness</p>
                    <p className="text-xs text-muted-foreground">156 members • New posts daily</p>
                  </div>
                </div>
              </div>
              <Button 
                onClick={() => navigate("/peer-support")}
                className="w-full mt-6 bg-chart-3 hover:bg-chart-3/90 text-white rounded-full"
              >
                Join Peer Groups
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

    </div>
  );
}