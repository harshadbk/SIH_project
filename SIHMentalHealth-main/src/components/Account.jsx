import React, { useState } from "react";
import { User, Calendar, Trophy, Target, Settings, LogOut, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export function Account({ user }) {
  const navigate = useNavigate();

  // Sample activities data - in a real app, this would come from a backend
  const activitiesData = {
    1: [
      { id: 1, title: "Morning Meditation", description: "5 minutes of mindfulness", completed: true, icon: "Heart", category: "mindfulness", duration: "5 min" },
      { id: 2, title: "Journal Entry", description: "Write about your thoughts and feelings", completed: false, icon: "BookOpen", category: "reflection", duration: "10 min" },
      { id: 3, title: "Connect with Support", description: "Reach out to a friend or family member", completed: true, icon: "Users", category: "social", duration: "15 min" },
    ],
    2: [
      { id: 4, title: "Breathing Exercise", description: "Practice deep breathing for 3 minutes", completed: true, icon: "Heart", category: "mindfulness", duration: "3 min" },
      { id: 5, title: "Gratitude Practice", description: "List 3 things you're grateful for", completed: true, icon: "Star", category: "reflection", duration: "5 min" },
      { id: 6, title: "AI Chat Session", description: "Have a conversation with your AI assistant", completed: false, icon: "MessageCircle", category: "support", duration: "10 min" },
    ],
    3: [
      { id: 7, title: "Body Scan Meditation", description: "10 minutes of body awareness", completed: true, icon: "Heart", category: "mindfulness", duration: "10 min" },
      { id: 8, title: "Goal Setting", description: "Set one small goal for the week", completed: true, icon: "Target", category: "planning", duration: "8 min" },
      { id: 9, title: "Read Resources", description: "Explore mental health resources", completed: true, icon: "BookOpen", category: "learning", duration: "15 min" },
    ],
    4: [
      { id: 10, title: "Mindful Walking", description: "Take a 10-minute mindful walk", completed: false, icon: "Heart", category: "mindfulness", duration: "10 min" },
      { id: 11, title: "Emotion Check-in", description: "Identify and name your current emotions", completed: true, icon: "MessageCircle", category: "reflection", duration: "5 min" },
      { id: 12, title: "Peer Support", description: "Engage with the peer support community", completed: false, icon: "Users", category: "social", duration: "20 min" },
    ],
    5: [
      { id: 13, title: "Progressive Relaxation", description: "15 minutes of muscle relaxation", completed: true, icon: "Heart", category: "mindfulness", duration: "15 min" },
      { id: 14, title: "Weekly Reflection", description: "Review your week and progress", completed: true, icon: "BookOpen", category: "reflection", duration: "12 min" },
      { id: 15, title: "Plan Next Week", description: "Set intentions for the upcoming week", completed: false, icon: "Target", category: "planning", duration: "10 min" },
    ],
    6: [
      { id: 16, title: "Nature Connection", description: "Spend time in nature or with plants", completed: true, icon: "Heart", category: "mindfulness", duration: "20 min" },
      { id: 17, title: "Creative Expression", description: "Engage in a creative activity", completed: true, icon: "Star", category: "creativity", duration: "30 min" },
      { id: 18, title: "Social Connection", description: "Plan a social activity", completed: true, icon: "Users", category: "social", duration: "15 min" },
    ],
    7: [
      { id: 19, title: "Rest Day", description: "Take time for rest and self-care", completed: false, icon: "Heart", category: "self-care", duration: "60 min" },
      { id: 20, title: "Review Progress", description: "Celebrate your achievements this week", completed: true, icon: "Star", category: "reflection", duration: "10 min" },
      { id: 21, title: "Prepare for Tomorrow", description: "Set yourself up for a good start", completed: false, icon: "Target", category: "planning", duration: "8 min" },
    ],
  };

  // Generate activity data for the last 365 days based on actual completion data
  const generateActivityData = () => {
    const data = [];
    const today = new Date();
    
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dayOfMonth = date.getDate();
      
      // Get completion percentage for this day
      const dayActivities = activitiesData[dayOfMonth] || [];
      const completionPercentage = dayActivities.length > 0 
        ? Math.round((dayActivities.filter(activity => activity.completed).length / dayActivities.length) * 100)
        : 0;
      
      data.push({
        date: date.toISOString().split('T')[0],
        completionPercentage: completionPercentage,
        dayOfMonth: dayOfMonth
      });
    }
    
    return data;
  };

  const activityData = generateActivityData();

  const getActivityColor = (completionPercentage) => {
    if (completionPercentage === 0) return "bg-gray-100"; // No activity
    if (completionPercentage <= 25) return "bg-green-200"; // Low completion
    if (completionPercentage <= 50) return "bg-green-300"; // Medium completion
    if (completionPercentage <= 75) return "bg-green-400"; // High completion
    return "bg-green-500"; // Full completion
  };

  const getTotalActivities = () => {
    return Object.values(activitiesData).flat().length;
  };

  const getCurrentStreak = () => {
    let streak = 0;
    for (let i = activityData.length - 1; i >= 0; i--) {
      if (activityData[i].completionPercentage > 0) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const getLongestStreak = () => {
    let longest = 0;
    let current = 0;
    
    for (let day of activityData) {
      if (day.completionPercentage > 0) {
        current++;
        longest = Math.max(longest, current);
      } else {
        current = 0;
      }
    }
    
    return longest;
  };

  const handleLogout = () => {
    // Handle logout logic here
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-emerald-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gradient-to-br from-chart-1 to-chart-2 rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{user?.name || "User"}</h1>
              <p className="text-muted-foreground">Mental Wellness Journey</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <p className="text-foreground">{user?.name || "User"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-foreground">{user?.email || "user@example.com"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Member Since</label>
                  <p className="text-foreground">January 2025</p>
                </div>
                <Button variant="outline" className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Calendar
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Trophy className="h-4 w-4 mr-2" />
                  Achievements
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Target className="h-4 w-4 mr-2" />
                  Set Goals
                </Button>
                <Button 
                  variant="destructive" 
                  className="w-full justify-start"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Activity & Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-chart-1 mb-2">{getTotalActivities()}</div>
                  <div className="text-sm text-muted-foreground">Total Activities</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-chart-2 mb-2">{getCurrentStreak()}</div>
                  <div className="text-sm text-muted-foreground">Current Streak</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-chart-3 mb-2">{getLongestStreak()}</div>
                  <div className="text-sm text-muted-foreground">Best Streak</div>
                </CardContent>
              </Card>
            </div>

            {/* Activity Map */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Activity Map
                  </CardTitle>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span>Less</span>
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-gray-100 rounded-sm"></div>
                      <div className="w-3 h-3 bg-green-200 rounded-sm"></div>
                      <div className="w-3 h-3 bg-green-300 rounded-sm"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-sm"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                    </div>
                    <span>More</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Activity Grid - 7 rows with more columns */}
                <div className="overflow-x-auto">
                  <div className="inline-block">
                    {/* Create exactly 7 rows with 52+ columns each */}
                    {Array.from({ length: 7 }, (_, rowIndex) => (
                      <div key={rowIndex} className="flex gap-1 mb-1">
                        {Array.from({ length: Math.ceil(activityData.length / 7) }, (_, dayIndex) => {
                          const dayData = activityData[rowIndex * Math.ceil(activityData.length / 7) + dayIndex];
                          
                          if (!dayData) {
                            return (
                              <div key={dayIndex} className="w-3 h-3 bg-muted/20 rounded-sm"></div>
                            );
                          }
                          
                          return (
                            <div
                              key={dayIndex}
                              className={`w-3 h-3 rounded-sm ${getActivityColor(dayData.completionPercentage)} hover:ring-2 hover:ring-chart-1/50 cursor-pointer transition-all`}
                              title={`${dayData.date}: ${dayData.completionPercentage}% completion`}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between text-xs text-muted-foreground mt-4">
                  <span>Jan</span>
                  <span>Mar</span>
                  <span>May</span>
                  <span>Jul</span>
                  <span>Sep</span>
                  <span>Nov</span>
                  <span>Dec</span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-accent/50 rounded-lg">
                    <div className="w-2 h-2 bg-chart-1 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Completed daily meditation</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-accent/50 rounded-lg">
                    <div className="w-2 h-2 bg-chart-2 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Finished wellness assessment</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-accent/50 rounded-lg">
                    <div className="w-2 h-2 bg-chart-3 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Set new wellness goals</p>
                      <p className="text-xs text-muted-foreground">3 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
