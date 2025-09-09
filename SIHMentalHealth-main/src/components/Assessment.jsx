import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Heart, Brain, Shield, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

// PHQ-9 Questions
const phq9Questions = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless", 
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself or that you are a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading the newspaper or watching television",
  "Moving or speaking so slowly that other people could have noticed, or the opposite being so fidgety or restless that you have been moving around a lot more than usual",
  "Thoughts that you would be better off dead, or of hurting yourself"
];

// GAD-7 Questions  
const gad7Questions = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things", 
  "Trouble relaxing",
  "Being so restless that it is hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid, as if something awful might happen"
];

// GHQ-12 Questions
const ghq12Questions = [
  "Been able to concentrate on whatever you're doing",
  "Lost much sleep over worry",
  "Felt that you were playing a useful part in things",
  "Felt capable of making decisions about things",
  "Felt constantly under strain",
  "Felt you couldn't overcome your difficulties",
  "Been able to enjoy your normal day-to-day activities",
  "Been able to face up to problems",
  "Been feeling unhappy or depressed",
  "Been losing confidence in yourself",
  "Been thinking of yourself as a worthless person",
  "Been feeling reasonably happy, all things considered"
];

const responseOptions = [
  "Not at all",
  "Several days", 
  "More than half the days",
  "Nearly every day"
];

const ghqResponseOptions = [
  "Better than usual",
  "Same as usual",
  "Less than usual", 
  "Much less than usual"
];

export function Assessment({ onComplete, user }) {
  const [currentTest, setCurrentTest] = useState("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [answers, setAnswers] = useState({
    phq9: {},
    gad7: {},
    ghq12: {}
  });

  const tests = [
    { id: "phq9", name: "PHQ-9", description: "Depression Assessment", questions: phq9Questions, icon: Heart },
    { id: "gad7", name: "GAD-7", description: "Anxiety Assessment", questions: gad7Questions, icon: Brain },
    { id: "ghq12", name: "GHQ-12", description: "General Mental Health", questions: ghq12Questions, icon: Shield }
  ];

  const getCurrentQuestions = () => {
    switch (currentTest) {
      case "phq9": return phq9Questions;
      case "gad7": return gad7Questions; 
      case "ghq12": return ghq12Questions;
      default: return [];
    }
  };

  const getCurrentAnswers = () => {
    switch (currentTest) {
      case "phq9": return answers.phq9;
      case "gad7": return answers.gad7;
      case "ghq12": return answers.ghq12;
      default: return {};
    }
  };

  const getResponseOptions = () => {
    return currentTest === "ghq12" ? ghqResponseOptions : responseOptions;
  };

  const handleAnswer = (value) => {
    const numValue = parseInt(value);
    const currentAnswers = getCurrentAnswers();
    currentAnswers[currentQuestion] = numValue;
    
    setAnswers(prev => ({
      ...prev,
      [currentTest]: currentAnswers
    }));
  };

  const nextQuestion = () => {
    const questions = getCurrentQuestions();
    console.log("nextQuestion called - currentQuestion:", currentQuestion, "questions.length:", questions.length, "currentTest:", currentTest);
    console.log("currentAnswers:", getCurrentAnswers());
    console.log("currentAnswers[currentQuestion]:", getCurrentAnswers()[currentQuestion]);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      console.log("Moving to next test or completing assessment");
      moveToNextTest();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const moveToNextTest = () => {
    console.log("moveToNextTest called - currentTest:", currentTest);
    if (currentTest === "phq9") {
      console.log("Moving from phq9 to gad7");
      setCurrentTest("gad7");
      setCurrentQuestion(0);
    } else if (currentTest === "gad7") {
      console.log("Moving from gad7 to ghq12");
      setCurrentTest("ghq12"); 
      setCurrentQuestion(0);
    } else if (currentTest === "ghq12") {
      console.log("Completing assessment - calling completeAssessment()");
      completeAssessment();
    }
  };

  const completeAssessment = () => {
    console.log("completeAssessment called");
    console.log("Current answers:", answers);
    
    // Show loading state
    setIsLoading(true);
    
    // Calculate scores
    const phq9Score = Object.values(answers.phq9).reduce((sum, val) => sum + val, 0);
    const gad7Score = Object.values(answers.gad7).reduce((sum, val) => sum + val, 0);
    const ghq12Score = Object.values(answers.ghq12).reduce((sum, val) => sum + val, 0);

    const results = {
      phq9Score,
      gad7Score,
      ghq12Score,
      completedAt: new Date().toISOString(),
      answers
    };

    // Wait 2 seconds before completing
    setTimeout(() => {
      console.log("Calling onComplete with results:", results);
      onComplete(results);
    }, 2000);
  };

  const getTotalProgress = () => {
    const totalQuestions = phq9Questions.length + gad7Questions.length + ghq12Questions.length;
    let completedQuestions = 0;
    
    if (currentTest === "phq9") {
      completedQuestions = currentQuestion;
    } else if (currentTest === "gad7") {
      completedQuestions = phq9Questions.length + currentQuestion;
    } else if (currentTest === "ghq12") {
      completedQuestions = phq9Questions.length + gad7Questions.length + currentQuestion;
    }
    
    return (completedQuestions / totalQuestions) * 100;
  };

  if (currentTest === "intro") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <Card className="border-0 shadow-xl bg-card/95 backdrop-blur-sm">
            <CardHeader className="text-center space-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-chart-1 to-chart-2 rounded-full flex items-center justify-center mx-auto">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-3xl text-foreground">Welcome {user?.name}!</CardTitle>
                <CardDescription className="text-lg text-muted-foreground mt-2">
                  Let's start with a brief mental wellness assessment
                </CardDescription>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-8">
              <div className="text-center space-y-4">
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  This assessment will help us understand your current mental health status and provide 
                  personalized recommendations. It consists of three standardized questionnaires that 
                  are widely used by mental health professionals.
                </p>
                <div className="bg-chart-1/10 rounded-lg p-4 max-w-2xl mx-auto">
                  <p className="text-sm text-chart-1">
                    ✓ Completely confidential and secure<br/>
                    ✓ Takes approximately 5-10 minutes<br/>
                    ✓ Results are used only to help you
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tests.map((test, index) => {
                  const Icon = test.icon;
                  return (
                    <Card key={test.id} className="border border-border hover:border-chart-1/50 transition-colors">
                      <CardContent className="p-6 text-center space-y-4">
                        <div className="w-12 h-12 bg-chart-1/20 rounded-full flex items-center justify-center mx-auto">
                          <Icon className="h-6 w-6 text-chart-1" />
                        </div>
                        <div>
                          <h3 className="text-foreground">{test.name}</h3>
                          <p className="text-sm text-muted-foreground">{test.description}</p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {test.questions.length} questions
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="text-center space-y-4">
                <Button 
                  onClick={() => setCurrentTest("phq9")}
                  size="lg"
                  className="bg-chart-1 hover:bg-chart-1/90 text-white rounded-full px-12 py-6"
                >
                  Begin Assessment
                </Button>
                
                {/* Development Button - Skip to Last Question */}
                <div className="pt-4 border-t border-border/50">
                  <p className="text-xs text-muted-foreground mb-2">Development Mode</p>
                  <Button 
                    onClick={() => {
                      // Set up mock answers for all tests
                      const mockAnswers = {
                        phq9: { 0: 1, 1: 2, 2: 1, 3: 0, 4: 1, 5: 2, 6: 1, 7: 0, 8: 1 },
                        gad7: { 0: 1, 1: 2, 2: 1, 3: 0, 4: 1, 5: 2, 6: 1 },
                        ghq12: { 0: 1, 1: 2, 2: 1, 3: 0, 4: 1, 5: 2, 6: 1, 7: 0, 8: 1, 9: 2, 10: 1, 11: 0 }
                      };
                      setAnswers(mockAnswers);
                      setCurrentTest("ghq12");
                      setCurrentQuestion(11); // Last question of GHQ-12
                      console.log("Dev button clicked - set answers:", mockAnswers);
                      console.log("Current test set to ghq12, question 11");
                    }}
                    size="sm"
                    variant="outline"
                    className="text-xs border-orange-500 text-orange-500 hover:bg-orange-50"
                  >
                    🚀 Skip to Last Question (Dev)
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const questions = getCurrentQuestions();
  const currentAnswers = getCurrentAnswers();
  const progress = getTotalProgress();

  // Show loading screen when assessment is completing
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center space-y-8">
          {/* Loading Animation */}
          <div className="relative">
            <div className="w-24 h-24 mx-auto">
              {/* Spinning Circle */}
              <div className="w-full h-full border-4 border-chart-1/20 rounded-full animate-spin border-t-chart-1"></div>
              {/* Inner Pulse */}
              <div className="absolute inset-4 border-2 border-chart-2/30 rounded-full animate-pulse"></div>
              {/* Center Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-chart-1 animate-bounce" />
              </div>
            </div>
          </div>
          
          {/* Loading Text */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Processing Your Assessment</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              We're analyzing your responses and preparing personalized recommendations for your mental wellness journey.
            </p>
          </div>
          
          {/* Progress Dots */}
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-chart-1 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-chart-2 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-chart-3 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-emerald-50 p-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl text-foreground">Mental Wellness Assessment</h1>
              <p className="text-muted-foreground">
                {currentTest.toUpperCase()} • Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Overall Progress</p>
              <p className="text-lg text-foreground">{Math.round(progress)}%</p>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="border-0 shadow-xl bg-card/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-foreground">
              Over the last 2 weeks, how often have you been bothered by:
            </CardTitle>
            <CardDescription className="text-lg text-foreground mt-4">
              {questions[currentQuestion]}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <RadioGroup 
              value={currentAnswers[currentQuestion]?.toString() || ""}
              onValueChange={handleAnswer}
              className="space-y-4"
            >
              {getResponseOptions().map((option, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 rounded-lg hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label 
                    htmlFor={`option-${index}`}
                    className="flex-1 cursor-pointer text-foreground"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={prevQuestion}
                disabled={currentQuestion === 0 && currentTest === "phq9"}
                className="rounded-full"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              
              <Button
                onClick={() => {
                  console.log("Complete/Next button clicked");
                  console.log("Button disabled:", currentAnswers[currentQuestion] === undefined);
                  console.log("currentAnswers[currentQuestion]:", currentAnswers[currentQuestion]);
                  nextQuestion();
                }}
                disabled={currentAnswers[currentQuestion] === undefined}
                className="bg-chart-1 hover:bg-chart-1/90 text-white rounded-full"
              >
                {currentQuestion === questions.length - 1 && currentTest === "ghq12" ? "Complete" : "Next"}
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Test Navigation */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          {tests.map((test, index) => {
            const Icon = test.icon;
            const isActive = currentTest === test.id;
            const isCompleted = (currentTest === "gad7" && test.id === "phq9") || 
                              (currentTest === "ghq12" && (test.id === "phq9" || test.id === "gad7"));
            
            return (
              <Card key={test.id} className={`${isActive ? "border-chart-1 bg-chart-1/5" : isCompleted ? "border-chart-2 bg-chart-2/5" : "border-border"}`}>
                <CardContent className="p-4 text-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 ${
                    isActive ? "bg-chart-1 text-white" : isCompleted ? "bg-chart-2 text-white" : "bg-muted text-muted-foreground"
                  }`}>
                    {isCompleted ? <CheckCircle className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                  </div>
                  <p className={`text-sm ${isActive ? "text-chart-1" : isCompleted ? "text-chart-2" : "text-muted-foreground"}`}>
                    {test.name}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}