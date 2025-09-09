import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation, Link, useNavigate } from "react-router-dom";
import {
  MessageCircle,
  Calendar,
  BookOpen,
  Users,
  Heart,
  Phone,
  Globe,
  Menu,
  X,
  Target,
} from "lucide-react";
import { HomePage } from "./components/HomePage.jsx";
import { AIChat } from "./components/AIChat.jsx";
import { BookingPage } from "./components/BookingPage.jsx";
import { ResourceHub } from "./components/ResourceHub.jsx";
import { PeerSupport } from "./components/PeerSupport.jsx";
import { Activities } from "./components/Activities.jsx";

import { EmergencyContact } from "./components/EmergencyContact.jsx";
import { LoginSignup } from "./components/LoginSignup.jsx";
import { Assessment } from "./components/Assessment.jsx";
import { AISummary } from "./components/AISummary.jsx";
import { CongratulationsPopup } from "./components/CongratulationsPopup.jsx";
import { AccountProfile } from "./components/AccountProfile.jsx";
import { Account } from "./components/Account.jsx";
import { Button } from "./components/ui/button.jsx";

export default function App() {
  const [user, setUser] = useState(null);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Debug user state changes
  useEffect(() => {
    console.log("User state changed:", user);
  }, [user]);

  const navigationItems = [
    { id: "home", label: "Home", icon: Heart, path: "/home" },
    { id: "chat", label: "AI Chat", icon: MessageCircle, path: "/chat" },
    { id: "booking", label: "Book Counsellor", icon: Calendar, path: "/booking" },
    { id: "activities", label: "Activities", icon: Target, path: "/activities" },
    { id: "resources", label: "Resources", icon: BookOpen, path: "/resources" },
    { id: "peer-support", label: "Peer Support", icon: Users, path: "/peer-support" },
  ];

  const handleLogin = (userData) => {
    console.log("handleLogin called with userData:", userData);
    setUser(userData);
    if (userData.hasCompletedAssessment && userData.hasSeenSummary) {
      // User has completed everything, go to home
      console.log("User completed everything, navigating to home");
      navigate("/home");
    } else if (userData.hasCompletedAssessment && !userData.hasSeenSummary) {
      // User completed assessment but hasn't seen summary
      console.log("User completed assessment but hasn't seen summary, navigating to summary");
      navigate("/summary");
    } else {
      // User needs to complete assessment - go to main route (assessment page)
      console.log("User needs to complete assessment, navigating to main route");
      navigate("/");
    }
  };

  const handleAssessmentComplete = (results) => {
    console.log("Assessment completed with results:", results);
    console.log("Current user:", user);
    
    // Create a user object if none exists (for anonymous assessment completion)
    const userToUpdate = user || {
      id: "anonymous-user-" + Math.random().toString(36).substr(2, 9),
      name: "Anonymous User",
      email: "anonymous@example.com",
      hasCompletedAssessment: false,
      hasSeenSummary: false,
    };
    
    const updatedUser = {
      ...userToUpdate,
      hasCompletedAssessment: true,
      hasSeenSummary: true, // Skip summary page entirely
      assessmentResults: results,
    };
    
    console.log("Setting user to:", updatedUser);
    setUser(updatedUser);
    
    // Navigate to home page first, then show popup
    console.log("Navigating to home page");
    navigate("/home");
    
    // Show congratulations popup for all users after assessment
    console.log("Setting showCongratulations to true");
    setShowCongratulations(true);
  };

  const handleSummaryComplete = () => {
    if (user) {
      const updatedUser = {
        ...user,
        hasSeenSummary: true,
      };
      setUser(updatedUser);
      navigate("/home");
    }
  };

  const handleCongratulationsComplete = () => {
    console.log("handleCongratulationsComplete called");
    setShowCongratulations(false);
    // Mark that the user has seen the summary (since we're skipping it for first-time users)
    if (user) {
      const updatedUser = {
        ...user,
        hasSeenSummary: true,
      };
      setUser(updatedUser);
      console.log("Updated user with hasSeenSummary: true");
    }
    console.log("Staying on homepage");
    // No need to navigate since we're already on /home
  };

  const handleMobileNavigation = (path) => {
    navigate(path);
    setIsMobileSidebarOpen(false);
  };

  // Check if current route is an auth route or assessment page
  const isAuthRoute = location.pathname.startsWith('/login');
  const isAssessmentRoute = location.pathname === '/' || location.pathname.startsWith('/assessment');

  // For deployment: Always start with assessment page, skip login
  // If user is on root route, show assessment page
  if (location.pathname === '/') {
    console.log("Root route - showing assessment page");
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-emerald-50">
        <Routes>
          <Route path="/" element={<Assessment onComplete={handleAssessmentComplete} user={user} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    );
  }

  // If user has completed assessment, show main app for all valid routes
  if (user && user.hasCompletedAssessment) {
    console.log("User completed assessment, showing main app");
    // Continue to main app rendering below
  }

  // For other routes, require authentication (but this won't be reached in deployment)
  if (!user && !location.pathname.startsWith('/login') && location.pathname !== '/') {
    console.log("No user logged in, redirecting to assessment");
    return <Navigate to="/" replace />;
  }

  // Summary page is now skipped - users go directly to home after assessment

  console.log("Rendering main app - user:", user, "pathname:", location.pathname, "showCongratulations:", showCongratulations);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-emerald-50 flex flex-col">
      {/* Navigation Header */}
      <header className="bg-card/80 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-border">
        <div className="max-w-7xl mx-auto pl-2 pr-4 sm:pl-2 sm:pr-6 lg:pl-2 lg:pr-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img 
                src="/images/Logo.png" 
                alt="MindCare Logo" 
                className="h-13 w-21"
              />
            </div>

            <nav className="hidden md:flex space-x-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link key={item.id} to={item.path}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      className={`${
                        isActive
                          ? "bg-accent text-accent-foreground hover:bg-accent/80"
                          : "text-muted-foreground hover:bg-accent/50"
                      } rounded-full transition-all duration-200`}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Emergency Button and Account Profile */}
            <div className="hidden md:flex items-center space-x-3">
              <Link to="/emergency">
                <Button
                  variant="destructive"
                  size="sm"
                  className="bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-full"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Emergency
                </Button>
              </Link>
              <AccountProfile user={user} />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <Link to="/emergency">
                <Button
                  variant="destructive"
                  size="sm"
                  className="bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-full"
                >
                  <Phone className="h-4 w-4" />
                </Button>
              </Link>
              <AccountProfile user={user} />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                className="text-foreground hover:bg-accent/50 rounded-full"
              >
                {isMobileSidebarOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          isMobileSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
        
        {/* Sidebar */}
        <div
          className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-card/95 backdrop-blur-sm shadow-2xl border-l border-border transform transition-transform duration-300 ${
            isMobileSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center">
              <img 
                src="/images/Logo.png" 
                alt="MindCare Logo" 
                className="h-10 w-auto"
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileSidebarOpen(false)}
              className="text-foreground hover:bg-accent/50 rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation Items */}
          <nav className="p-6 space-y-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  size="lg"
                  onClick={() => handleMobileNavigation(item.path)}
                  className={`w-full justify-start ${
                    isActive
                      ? "bg-accent text-accent-foreground hover:bg-accent/80"
                      : "text-muted-foreground hover:bg-accent/50"
                  } rounded-xl transition-all duration-200`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Button>
              );
            })}
          </nav>

          {/* Emergency Section */}
          <div className="absolute bottom-6 left-6 right-6">
            <Button
              variant="destructive"
              size="lg"
              onClick={() => handleMobileNavigation("/emergency")}
              className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl"
            >
              <Phone className="h-5 w-5 mr-3" />
              Emergency Contact
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/chat" element={<AIChat />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/resources" element={<ResourceHub />} />
          <Route path="/peer-support" element={<PeerSupport />} />
          <Route path="/emergency" element={<EmergencyContact />} />
          <Route path="/account" element={<Account user={user} />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </main>

      {/* Floating Chatbot Button */}
      {location.pathname !== "/chat" && (
        <div className="fixed bottom-6 left-6 z-50">
          <Link to="/chat">
            <Button
              className="w-16 h-16 rounded-full bg-gradient-to-br from-chart-1 to-chart-2 hover:from-chart-1/90 hover:to-chart-2/90 shadow-2xl border-2 border-background/20 backdrop-blur-sm transition-all duration-300 hover:scale-110 group"
            >
            <div className="relative w-8 h-8 flex items-center justify-center">
              {/* Robot Head */}
              <div className="w-6 h-6 bg-white/90 rounded-sm relative">
                {/* Robot Eyes */}
                <div className="absolute top-1 left-1 w-1 h-1 bg-chart-1 rounded-full"></div>
                <div className="absolute top-1 right-1 w-1 h-1 bg-chart-1 rounded-full"></div>
                {/* Robot Mouth */}
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-0.5 bg-chart-1/60 rounded-full"></div>
              </div>
              {/* Robot Antennas */}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
                <div className="w-0.5 h-2 bg-white/80 relative">
                  <div className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 bg-white/80 rounded-full"></div>
                </div>
              </div>
              {/* Chat bubble animation */}
              <div className="absolute -top-2 -right-2 w-3 h-3 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <MessageCircle className="w-2 h-2 text-chart-1 m-0.5" />
              </div>
            </div>
            </Button>
          </Link>

          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-card/95 backdrop-blur-sm text-foreground text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-border">
            Chat with AI Assistant
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-card/95"></div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-card/90 backdrop-blur-sm border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img 
                  src="/images/Logo.png" 
                  alt="MindCare Logo" 
                  className="h-13 w-13"
                />
              </div>
              <p className="text-muted-foreground text-sm">
                Your confidential mental wellness companion
                providing AI-guided support and professional
                resources.
              </p>
            </div>

            <div>
              <h3 className="text-foreground mb-4">
                Quick Links
              </h3>
              <div className="space-y-2 text-sm">
                <div>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Privacy Policy
                  </a>
                </div>
                <div>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Terms of Service
                  </a>
                </div>
                <div>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Crisis Resources
                  </a>
                </div>
                <div>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Contact Support
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-foreground mb-4">
                Emergency Support
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-destructive" />
                  <span className="text-muted-foreground">
                    Crisis Hotline: (844) 493-8255
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-chart-1" />
                  <span className="text-muted-foreground">
                    24/7 Support Available
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-3">
                  If you're in immediate danger, call 911
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
            © 2025 MindCare. All rights reserved. Your privacy
            and wellbeing matter.
          </div>
        </div>
      </footer>

      {/* Congratulations Popup */}
      {console.log("showCongratulations state:", showCongratulations)}
      {showCongratulations && (
        <CongratulationsPopup 
          onComplete={handleCongratulationsComplete} 
          assessmentResults={user?.assessmentResults}
        />
      )}
    </div>
  );
}