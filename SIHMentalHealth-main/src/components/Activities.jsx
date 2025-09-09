import React, { useState } from "react";
import { 
  Calendar, 
  CheckCircle, 
  Circle, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  Target,
  Heart,
  BookOpen,
  Users,
  MessageCircle,
  Star,
  ArrowRight,
  ArrowLeft,
  Check,
  Plus
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";

export function Activities() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' or 'day'

  // Sample activities data - in a real app, this would come from a backend
  const activitiesData = {
    1: [
      { id: 1, title: "Morning Meditation", description: "5 minutes of mindfulness", completed: false, icon: Heart, category: "mindfulness", duration: "5 min" },
      { id: 2, title: "Journal Entry", description: "Write about your thoughts and feelings", completed: false, icon: BookOpen, category: "reflection", duration: "10 min" },
      { id: 3, title: "Connect with Support", description: "Reach out to a friend or family member", completed: false, icon: Users, category: "social", duration: "15 min" },
    ],
    2: [
      { id: 4, title: "Breathing Exercise", description: "Practice deep breathing for 3 minutes", completed: false, icon: Heart, category: "mindfulness", duration: "3 min" },
      { id: 5, title: "Gratitude Practice", description: "List 3 things you're grateful for", completed: false, icon: Star, category: "reflection", duration: "5 min" },
      { id: 6, title: "AI Chat Session", description: "Have a conversation with your AI assistant", completed: false, icon: MessageCircle, category: "support", duration: "10 min" },
    ],
    3: [
      { id: 7, title: "Body Scan Meditation", description: "10 minutes of body awareness", completed: false, icon: Heart, category: "mindfulness", duration: "10 min" },
      { id: 8, title: "Goal Setting", description: "Set one small goal for the week", completed: false, icon: Target, category: "planning", duration: "8 min" },
      { id: 9, title: "Read Resources", description: "Explore mental health resources", completed: false, icon: BookOpen, category: "learning", duration: "15 min" },
    ],
    4: [
      { id: 10, title: "Mindful Walking", description: "Take a 10-minute mindful walk", completed: false, icon: Heart, category: "mindfulness", duration: "10 min" },
      { id: 11, title: "Emotion Check-in", description: "Identify and name your current emotions", completed: false, icon: MessageCircle, category: "reflection", duration: "5 min" },
      { id: 12, title: "Peer Support", description: "Engage with the peer support community", completed: false, icon: Users, category: "social", duration: "20 min" },
    ],
    5: [
      { id: 13, title: "Progressive Relaxation", description: "15 minutes of muscle relaxation", completed: false, icon: Heart, category: "mindfulness", duration: "15 min" },
      { id: 14, title: "Weekly Reflection", description: "Review your week and progress", completed: false, icon: BookOpen, category: "reflection", duration: "12 min" },
      { id: 15, title: "Plan Next Week", description: "Set intentions for the upcoming week", completed: false, icon: Target, category: "planning", duration: "10 min" },
    ],
    6: [
      { id: 16, title: "Nature Connection", description: "Spend time in nature or with plants", completed: false, icon: Heart, category: "mindfulness", duration: "20 min" },
      { id: 17, title: "Creative Expression", description: "Engage in a creative activity", completed: false, icon: Star, category: "creativity", duration: "30 min" },
      { id: 18, title: "Social Connection", description: "Plan a social activity", completed: false, icon: Users, category: "social", duration: "15 min" },
    ],
    7: [
      { id: 19, title: "Rest Day", description: "Take time for rest and self-care", completed: false, icon: Heart, category: "self-care", duration: "60 min" },
      { id: 20, title: "Review Progress", description: "Celebrate your achievements this week", completed: false, icon: Star, category: "reflection", duration: "10 min" },
      { id: 21, title: "Prepare for Tomorrow", description: "Set yourself up for a good start", completed: false, icon: Target, category: "planning", duration: "8 min" },
    ],
  };

  const [activities, setActivities] = useState(activitiesData);

  const toggleActivity = (day, activityId) => {
    setActivities(prev => ({
      ...prev,
      [day]: prev[day].map(activity => 
        activity.id === activityId 
          ? { ...activity, completed: !activity.completed }
          : activity
      )
    }));
  };

  const getCurrentMonthActivities = () => {
    return activities[selectedDay] || [];
  };

  const getCompletionPercentage = (day) => {
    const dayActivities = activities[day] || [];
    if (dayActivities.length === 0) return 0;
    const completed = dayActivities.filter(activity => activity.completed).length;
    return Math.round((completed / dayActivities.length) * 100);
  };

  const getCategoryColor = (category) => {
    const colors = {
      mindfulness: "bg-chart-1/20 text-chart-1 border-chart-1/30",
      reflection: "bg-chart-2/20 text-chart-2 border-chart-2/30",
      social: "bg-chart-3/20 text-chart-3 border-chart-3/30",
      support: "bg-chart-4/20 text-chart-4 border-chart-4/30",
      planning: "bg-chart-5/20 text-chart-5 border-chart-5/30",
      learning: "bg-chart-1/20 text-chart-1 border-chart-1/30",
      creativity: "bg-chart-2/20 text-chart-2 border-chart-2/30",
      "self-care": "bg-chart-4/20 text-chart-4 border-chart-4/30",
    };
    return colors[category] || "bg-muted/20 text-muted-foreground border-muted/30";
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleDaySelect = (day) => {
    setSelectedDay(day);
    setViewMode('day');
  };

  const handleBackToCalendar = () => {
    setViewMode('calendar');
  };

  if (viewMode === 'day') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-emerald-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBackToCalendar}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Calendar
                </Button>
              </div>
              <div className="text-right">
                <h1 className="text-2xl font-bold text-foreground">Day {selectedDay}</h1>
                <p className="text-muted-foreground">Your daily wellness activities</p>
              </div>
            </div>
          </div>

          {/* Day Activities */}
          <div className="space-y-6">
            {getCurrentMonthActivities().length === 0 ? (
              <Card className="border-0 shadow-lg bg-card/95 backdrop-blur-sm">
                <CardContent className="text-center py-12">
                  <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No Activities Today</h3>
                  <p className="text-muted-foreground">Enjoy your rest day or add some activities!</p>
                </CardContent>
              </Card>
            ) : (
              getCurrentMonthActivities().map((activity) => {
                const Icon = activity.icon;
                return (
                  <Card
                    key={activity.id}
                    className={`border-0 shadow-lg backdrop-blur-sm transition-all duration-200 ${
                      activity.completed 
                        ? "bg-green-50/80 border-green-200/50" 
                        : "bg-card/95 border-border hover:shadow-xl"
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <Checkbox
                            checked={activity.completed}
                            onCheckedChange={() => toggleActivity(selectedDay, activity.id)}
                            className="mt-1"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className={`p-2 rounded-lg ${
                                activity.completed 
                                  ? "bg-green-100 text-green-600" 
                                  : "bg-chart-1/10 text-chart-1"
                              }`}>
                                <Icon className="h-5 w-5" />
                              </div>
                              <div>
                                <h3 className={`text-lg font-semibold ${
                                  activity.completed ? "line-through text-muted-foreground" : "text-foreground"
                                }`}>
                                  {activity.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {activity.description}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                                {activity.duration}
                              </span>
                              {activity.completed && (
                                <div className="p-1 bg-green-100 rounded-full">
                                  <Check className="h-4 w-4 text-green-600" />
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                              getCategoryColor(activity.category)
                            }`}>
                              {activity.category}
                            </span>
                            
                            {!activity.completed && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => toggleActivity(selectedDay, activity.id)}
                                className="text-chart-1 border-chart-1/30 hover:bg-chart-1/10"
                              >
                                Mark Complete
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}

            {/* Progress Summary */}
            {getCurrentMonthActivities().length > 0 && (
              <Card className="border-0 shadow-lg bg-gradient-to-r from-chart-1/5 to-chart-2/5 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">Today's Progress</h3>
                    <span className="text-2xl font-bold text-chart-1">
                      {getCompletionPercentage(selectedDay)}%
                    </span>
                  </div>
                  
                  <div className="w-full bg-muted/30 rounded-full h-3 mb-3">
                    <div
                      className="bg-gradient-to-r from-chart-1 to-chart-2 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${getCompletionPercentage(selectedDay)}%` }}
                    ></div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {getCurrentMonthActivities().filter(a => a.completed).length} of {getCurrentMonthActivities().length} activities completed
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-emerald-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-chart-1 to-chart-2 rounded-full flex items-center justify-center">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Daily Activities</h1>
              <p className="text-muted-foreground">Track your mental wellness journey day by day</p>
            </div>
          </div>
        </div>

        {/* Calendar Navigation */}
        <Card className="border-0 shadow-lg bg-card/95 backdrop-blur-sm mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigateMonth(-1)}
                className="text-muted-foreground hover:text-foreground border-muted/30"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              
              <div className="text-center">
                <h2 className="text-2xl font-bold text-foreground">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <p className="text-sm text-muted-foreground">Select a day to view activities</p>
              </div>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigateMonth(1)}
                className="text-muted-foreground hover:text-foreground border-muted/30"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* Calendar Table */}
            <div className="overflow-hidden rounded-xl border border-border/50">
              <table className="w-full">
                <tbody>
                  {/* Create rows for each week */}
                  {Array.from({ length: Math.ceil(getDaysInMonth().length / 7) }, (_, weekIndex) => (
                    <tr key={weekIndex} className="border-b border-border/30 last:border-b-0">
                      {Array.from({ length: 7 }, (_, dayIndex) => {
                        const day = getDaysInMonth()[weekIndex * 7 + dayIndex];
                        
                        if (day === null) {
                          return (
                            <td key={dayIndex} className="w-1/7 h-24 border-r border-border/30 last:border-r-0 bg-muted/20">
                              <div className="h-full"></div>
                            </td>
                          );
                        }
                        
                        const completionPercentage = getCompletionPercentage(day);
                        const isToday = day === new Date().getDate() && 
                                       currentDate.getMonth() === new Date().getMonth() &&
                                       currentDate.getFullYear() === new Date().getFullYear();
                        const hasActivities = (activities[day] || []).length > 0;
                        const dayName = dayNames[dayIndex];

                        return (
                          <td 
                            key={dayIndex} 
                            className={`w-1/7 h-24 border-r border-border/30 last:border-r-0 cursor-pointer transition-all duration-200 ${
                              isToday 
                                ? "bg-gradient-to-br from-chart-1/20 to-chart-2/20 border-2 border-chart-1" 
                                : hasActivities
                                ? "bg-card/80 hover:bg-card/95"
                                : "bg-muted/30 hover:bg-muted/50"
                            }`}
                            onClick={() => handleDaySelect(day)}
                          >
                            <div className="h-full flex flex-col items-center justify-center p-2">
                              <span className={`text-lg font-bold ${
                                isToday ? "text-chart-1" : "text-foreground"
                              }`}>
                                {day}
                              </span>
                              
                              <span className="text-xs text-muted-foreground mb-1">
                                {dayName}
                              </span>
                              
                              {hasActivities && (
                                <div className="flex items-center space-x-1">
                                  <div className="w-2 h-2 bg-chart-1 rounded-full"></div>
                                  {completionPercentage > 0 && (
                                    <span className="text-xs text-muted-foreground">
                                      {completionPercentage}%
                                    </span>
                                  )}
                                </div>
                              )}
                              
                              {isToday && (
                                <span className="text-xs text-chart-1 font-medium">Today</span>
                              )}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg bg-card/95 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-chart-1/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="h-6 w-6 text-chart-1" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">Total Activities</h3>
              <p className="text-2xl font-bold text-chart-1">
                {Object.values(activities).flat().length}
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-card/95 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-chart-2/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-chart-2" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">Completed</h3>
              <p className="text-2xl font-bold text-chart-2">
                {Object.values(activities).flat().filter(a => a.completed).length}
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-card/95 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-chart-4/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="h-6 w-6 text-chart-4" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">Streak</h3>
              <p className="text-2xl font-bold text-chart-4">7 days</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
