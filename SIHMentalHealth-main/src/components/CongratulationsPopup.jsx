import React, { useEffect, useState } from "react";
import { CheckCircle, Sparkles, Heart, Star } from "lucide-react";

export function CongratulationsPopup({ onComplete, assessmentResults }) {
  const [isVisible, setIsVisible] = useState(true);
  const [showContent, setShowContent] = useState(false);

  console.log("CongratulationsPopup rendered with:", { onComplete, assessmentResults });

  // Generate a brief assessment summary
  const getAssessmentSummary = () => {
    if (!assessmentResults) return "Your wellness journey begins now!";
    
    // Simple logic to generate a brief summary based on assessment results
    // In a real app, this would be more sophisticated
    const totalQuestions = Object.keys(assessmentResults).length;
    const positiveResponses = Object.values(assessmentResults).filter(response => 
      typeof response === 'number' ? response >= 3 : true
    ).length;
    
    const wellnessLevel = positiveResponses / totalQuestions;
    
    if (wellnessLevel >= 0.8) {
      return "Great job! You're showing excellent mental wellness awareness.";
    } else if (wellnessLevel >= 0.6) {
      return "Good progress! You're on a positive mental wellness path.";
    } else if (wellnessLevel >= 0.4) {
      return "You're taking important steps toward better mental wellness.";
    } else {
      return "Your commitment to mental wellness is commendable.";
    }
  };

  useEffect(() => {
    // Show content after a brief delay for smooth animation
    const showTimer = setTimeout(() => {
      setShowContent(true);
    }, 200);

    // Start fade out after 3 seconds (increased for testing)
    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    // Complete the flow after fade animation
    const completeTimer = setTimeout(() => {
      console.log("CongratulationsPopup calling onComplete");
      onComplete();
    }, 3500);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* Popup Content */}
      <div
        className={`relative bg-gradient-to-br from-white to-sky-50 rounded-3xl shadow-2xl border border-white/20 p-8 max-w-md mx-4 transform transition-all duration-500 ${
          showContent ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        {/* Decorative Elements */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-chart-1 to-chart-2 rounded-full flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-chart-2 to-chart-4 rounded-full flex items-center justify-center">
          <Star className="w-3 h-3 text-white" />
        </div>

        {/* Main Content */}
        <div className="text-center space-y-6">
          {/* Success Icon */}
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-chart-1 to-chart-2 rounded-full flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            {/* Floating hearts */}
            <div className="absolute -top-2 -left-2 w-4 h-4 text-chart-1 animate-bounce">
              <Heart className="w-4 h-4" />
            </div>
            <div className="absolute -top-1 -right-3 w-3 h-3 text-chart-2 animate-bounce" style={{ animationDelay: '0.2s' }}>
              <Heart className="w-3 h-3" />
            </div>
            <div className="absolute -bottom-1 -left-1 w-3 h-3 text-chart-4 animate-bounce" style={{ animationDelay: '0.4s' }}>
              <Heart className="w-3 h-3" />
            </div>
          </div>

          {/* Congratulations Text */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground">
              Congratulations! 🎉
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              You've successfully completed your mental wellness assessment. 
              Your personalized journey to better mental health starts now!
            </p>
            <div className="bg-gradient-to-r from-chart-1/10 to-chart-2/10 rounded-lg p-3 border border-chart-1/20">
              <p className="text-sm font-medium text-foreground">
                {getAssessmentSummary()}
              </p>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-chart-1 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-chart-2 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-chart-4 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>

        {/* Subtle border glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-chart-1/20 via-chart-2/20 to-chart-4/20 blur-sm -z-10"></div>
      </div>
    </div>
  );
}
