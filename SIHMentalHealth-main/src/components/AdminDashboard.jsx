import React, { useState } from 'react';
import { BarChart3, Users, MessageCircle, AlertTriangle, Calendar, Download, TrendingUp, Clock, Shield, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card.jsx';
import { Button } from './ui/button.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs.jsx';
import { Progress } from './ui/progress.jsx';
import { Badge } from './ui/badge.jsx';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

export function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('7d');
  
  // Mock data for charts
  const userActivityData = [
    { name: 'Mon', users: 240, chats: 156, bookings: 23 },
    { name: 'Tue', users: 210, chats: 142, bookings: 18 },
    { name: 'Wed', users: 290, chats: 198, bookings: 31 },
    { name: 'Thu', users: 275, chats: 187, bookings: 28 },
    { name: 'Fri', users: 320, chats: 234, bookings: 42 },
    { name: 'Sat', users: 180, chats: 98, bookings: 15 },
    { name: 'Sun', users: 155, chats: 87, bookings: 12 }
  ];

  const issueDistribution = [
    { name: 'Anxiety', value: 35, color: '#3B82F6' },
    { name: 'Academic Stress', value: 28, color: '#10B981' },
    { name: 'Sleep Issues', value: 18, color: '#F59E0B' },
    { name: 'Depression', value: 12, color: '#EF4444' },
    { name: 'Relationships', value: 7, color: '#8B5CF6' }
  ];

  const peakHoursData = [
    { hour: '6AM', users: 12 },
    { hour: '8AM', users: 45 },
    { hour: '10AM', users: 78 },
    { hour: '12PM', users: 92 },
    { hour: '2PM', users: 134 },
    { hour: '4PM', users: 156 },
    { hour: '6PM', users: 198 },
    { hour: '8PM', users: 234 },
    { hour: '10PM', users: 187 },
    { hour: '12AM', users: 98 }
  ];

  const counsellorAvailability = [
    { name: 'Dr. Sarah Johnson', status: 'Available', nextSlot: '2:00 PM', todayBookings: 6 },
    { name: 'Dr. Michael Chen', status: 'Busy', nextSlot: '4:30 PM', todayBookings: 8 },
    { name: 'Dr. Emily Rodriguez', status: 'Available', nextSlot: '1:15 PM', todayBookings: 5 },
    { name: 'Dr. James Wilson', status: 'Off', nextSlot: 'Tomorrow 9:00 AM', todayBookings: 0 },
    { name: 'Dr. Lisa Park', status: 'Available', nextSlot: '3:45 PM', todayBookings: 7 }
  ];

  const alerts = [
    {
      id: 1,
      type: 'high',
      message: 'Unusual spike in crisis-related keywords detected in AI chats',
      timestamp: '2 hours ago',
      action: 'Review immediately'
    },
    {
      id: 2,
      type: 'medium',
      message: 'Dr. Johnson has exceeded recommended daily consultation limit',
      timestamp: '4 hours ago',
      action: 'Monitor workload'
    },
    {
      id: 3,
      type: 'low',
      message: 'Weekly report ready for download',
      timestamp: '1 day ago',
      action: 'Download report'
    }
  ];

  const getAlertColor = (type) => {
    switch (type) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Busy': return 'bg-yellow-100 text-yellow-800';
      case 'Off': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl text-blue-900">Admin Dashboard</h1>
          <p className="text-blue-600">System overview and analytics</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32 rounded-lg border-blue-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-white/80 rounded-xl p-1">
          <TabsTrigger value="overview" className="rounded-lg">Overview</TabsTrigger>
          <TabsTrigger value="analytics" className="rounded-lg">Analytics</TabsTrigger>
          <TabsTrigger value="counsellors" className="rounded-lg">Counsellors</TabsTrigger>
          <TabsTrigger value="alerts" className="rounded-lg">Alerts</TabsTrigger>
          <TabsTrigger value="reports" className="rounded-lg">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 bg-white/80 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm text-blue-600">Active Users</CardTitle>
                <Users className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl text-blue-900">2,453</div>
                <p className="text-xs text-green-600">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  +12% from last week
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/80 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm text-blue-600">AI Chat Sessions</CardTitle>
                <MessageCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl text-blue-900">1,847</div>
                <p className="text-xs text-green-600">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  +8% from last week
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/80 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm text-blue-600">Counsellor Bookings</CardTitle>
                <Calendar className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl text-blue-900">267</div>
                <p className="text-xs text-green-600">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  +15% from last week
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/80 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm text-blue-600">Critical Alerts</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl text-blue-900">3</div>
                <p className="text-xs text-red-600">
                  Requires immediate attention
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 bg-white/80 shadow-sm">
              <CardHeader>
                <CardTitle className="text-blue-900">Weekly Activity Overview</CardTitle>
                <CardDescription className="text-blue-600">User engagement metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={userActivityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip />
                    <Bar dataKey="users" fill="#3B82F6" radius={4} />
                    <Bar dataKey="chats" fill="#10B981" radius={4} />
                    <Bar dataKey="bookings" fill="#F59E0B" radius={4} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/80 shadow-sm">
              <CardHeader>
                <CardTitle className="text-blue-900">Common Issues Distribution</CardTitle>
                <CardDescription className="text-blue-600">Most frequent support topics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={issueDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {issueDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Peak Hours Chart */}
          <Card className="border-0 bg-white/80 shadow-sm">
            <CardHeader>
              <CardTitle className="text-blue-900">Peak Support Hours</CardTitle>
              <CardDescription className="text-blue-600">User activity throughout the day</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={peakHoursData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="hour" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="users" 
                    stroke="#3B82F6" 
                    strokeWidth={3} 
                    dot={{ fill: '#3B82F6', r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Usage Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 bg-white/80 shadow-sm">
              <CardHeader>
                <CardTitle className="text-blue-900">Average Session Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl text-blue-900 mb-2">18m 34s</div>
                <Progress value={75} className="mb-2" />
                <p className="text-sm text-blue-600">+2m from last week</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/80 shadow-sm">
              <CardHeader>
                <CardTitle className="text-blue-900">User Satisfaction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl text-blue-900 mb-2">4.7/5</div>
                <Progress value={94} className="mb-2" />
                <p className="text-sm text-blue-600">Based on 1,247 ratings</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/80 shadow-sm">
              <CardHeader>
                <CardTitle className="text-blue-900">Response Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl text-blue-900 mb-2">98.5%</div>
                <Progress value={98.5} className="mb-2" />
                <p className="text-sm text-blue-600">Within 24 hours</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="counsellors" className="space-y-6">
          <Card className="border-0 bg-white/80 shadow-sm">
            <CardHeader>
              <CardTitle className="text-blue-900">Counsellor Availability</CardTitle>
              <CardDescription className="text-blue-600">Real-time status and booking information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {counsellorAvailability.map((counsellor, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-blue-100 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                        {counsellor.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="text-blue-900">{counsellor.name}</h3>
                        <p className="text-sm text-blue-600">Next available: {counsellor.nextSlot}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-sm text-blue-600">Today's Bookings</div>
                        <div className="text-lg text-blue-900">{counsellor.todayBookings}</div>
                      </div>
                      <Badge className={getStatusColor(counsellor.status)}>
                        {counsellor.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card className="border-0 bg-white/80 shadow-sm">
            <CardHeader>
              <CardTitle className="text-blue-900">System Alerts</CardTitle>
              <CardDescription className="text-blue-600">Important notifications requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className={`p-4 border rounded-lg ${getAlertColor(alert.type)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <AlertTriangle className="h-4 w-4" />
                          <span className="text-sm uppercase tracking-wide">
                            {alert.type} Priority
                          </span>
                        </div>
                        <p className="mb-2">{alert.message}</p>
                        <div className="flex items-center space-x-2 text-sm">
                          <Clock className="h-3 w-3" />
                          <span>{alert.timestamp}</span>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="ml-4 rounded-lg"
                      >
                        {alert.action}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-0 bg-white/80 shadow-sm">
              <CardHeader>
                <CardTitle className="text-blue-900">Weekly Reports</CardTitle>
                <CardDescription className="text-blue-600">Downloadable analytics and insights</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border border-blue-100 rounded-lg">
                  <div>
                    <h4 className="text-blue-900">Usage Analytics Report</h4>
                    <p className="text-sm text-blue-600">Week of Jan 8-14, 2024</p>
                  </div>
                  <Button size="sm" variant="outline" className="border-blue-500 text-blue-600 rounded-lg">
                    <Download className="h-3 w-3 mr-1" />
                    CSV
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border border-blue-100 rounded-lg">
                  <div>
                    <h4 className="text-blue-900">Counsellor Performance</h4>
                    <p className="text-sm text-blue-600">Week of Jan 8-14, 2024</p>
                  </div>
                  <Button size="sm" variant="outline" className="border-blue-500 text-blue-600 rounded-lg">
                    <Download className="h-3 w-3 mr-1" />
                    Excel
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border border-blue-100 rounded-lg">
                  <div>
                    <h4 className="text-blue-900">Crisis Intervention Log</h4>
                    <p className="text-sm text-blue-600">Week of Jan 8-14, 2024</p>
                  </div>
                  <Button size="sm" variant="outline" className="border-blue-500 text-blue-600 rounded-lg">
                    <Download className="h-3 w-3 mr-1" />
                    PDF
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/80 shadow-sm">
              <CardHeader>
                <CardTitle className="text-blue-900">System Health</CardTitle>
                <CardDescription className="text-blue-600">Platform performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Activity className="h-4 w-4 text-green-500" />
                    <span className="text-blue-900">System Uptime</span>
                  </div>
                  <span className="text-green-600">99.8%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-blue-500" />
                    <span className="text-blue-900">Security Status</span>
                  </div>
                  <span className="text-green-600">Secure</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4 text-orange-500" />
                    <span className="text-blue-900">Response Time</span>
                  </div>
                  <span className="text-blue-600">124ms avg</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-purple-500" />
                    <span className="text-blue-900">Concurrent Users</span>
                  </div>
                  <span className="text-blue-600">247 active</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}