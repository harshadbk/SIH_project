import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  User,
  AlertTriangle,
  Heart,
  Lightbulb,
  Phone,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";

export function AIChat() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hi there! I'm Alex, your AI wellness companion. I'm here to listen and provide support. How are you feeling today?",
      sender: "ai",
      timestamp: new Date(),
      suggestions: [
        "Feeling stressed about exams",
        "Having trouble sleeping",
        "Feeling lonely",
        "Just want to chat",
      ],
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (!isInitialLoad) {
      scrollToBottom();
    } else {
      setIsInitialLoad(false);
    }
  }, [messages]);

  const quickResponses = [
    {
      text: "Coping Tips",
      icon: Lightbulb,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      text: "Relaxation Exercises",
      icon: Heart,
      color: "bg-green-100 text-green-700",
    },
    {
      text: "Need Counsellor",
      icon: Phone,
      color: "bg-blue-100 text-blue-700",
    },
  ];

  const getAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    if (
      lowerMessage.includes("stress") ||
      lowerMessage.includes("exam")
    ) {
      return {
        text: "I understand exam stress can be overwhelming. It's completely normal to feel this way. Here are some strategies that many students find helpful: breaking study sessions into smaller chunks, practicing deep breathing exercises, and remembering that your worth isn't defined by grades. Would you like me to guide you through a quick relaxation exercise?",
        suggestions: [
          "Yes, guide me through relaxation",
          "Tell me about study techniques",
          "I need to talk to someone",
        ],
      };
    } else if (
      lowerMessage.includes("sleep") ||
      lowerMessage.includes("tired")
    ) {
      return {
        text: "Sleep issues are very common among college students. Poor sleep can affect both your mental and physical health. Some helpful sleep hygiene tips include: maintaining a consistent sleep schedule, limiting screen time before bed, and creating a relaxing bedtime routine. Have you noticed any specific patterns with your sleep difficulties?",
        suggestions: [
          "I stay up too late studying",
          "My mind races at night",
          "I want sleep tips",
        ],
      };
    } else if (
      lowerMessage.includes("lonely") ||
      lowerMessage.includes("alone")
    ) {
      return {
        text: "Feeling lonely in college is more common than you might think. Many students experience this, especially during transitions. Remember that feeling lonely doesn't mean you're alone - there are people who care and want to help. Would you like some suggestions for connecting with others or would you prefer to talk about what's making you feel this way?",
        suggestions: [
          "Ways to meet people",
          "Talk about my feelings",
          "Find campus activities",
        ],
      };
    } else if (
      lowerMessage.includes("anxiety") ||
      lowerMessage.includes("anxious")
    ) {
      return {
        text: "Anxiety can feel really overwhelming, but you're taking a positive step by reaching out. Anxiety is treatable and manageable. Some immediate techniques that can help include: the 5-4-3-2-1 grounding technique (5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste), deep breathing, and progressive muscle relaxation. Would you like me to walk you through one of these techniques?",
        suggestions: [
          "Try the 5-4-3-2-1 technique",
          "Learn breathing exercises",
          "I think I need professional help",
        ],
      };
    } else {
      return {
        text: "Thank you for sharing that with me. I'm here to listen and support you. Everyone's experience is unique, and your feelings are valid. Is there a particular aspect of what you're going through that you'd like to explore together?",
        suggestions: [
          "Tell me more about coping strategies",
          "I want to talk to a counsellor",
          "Share resources",
        ],
      };
    }
  };

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(
      () => {
        const aiResponse = getAIResponse(text);
        const aiMessage = {
          id: (Date.now() + 1).toString(),
          text: aiResponse.text,
          sender: "ai",
          timestamp: new Date(),
          suggestions: aiResponse.suggestions,
        };
        setMessages((prev) => [...prev, aiMessage]);
        setIsTyping(false);
      },
      1000 + Math.random() * 1000,
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputText);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-chart-1 to-chart-2 rounded-full flex items-center justify-center">
            <Bot className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl text-foreground mb-2">
          AI Wellness Chat
        </h1>
        <p className="text-muted-foreground">
          Safe, confidential, and available 24/7
        </p>
      </div>

      
      {/* Quick Response Buttons */}
      <div className="flex flex-wrap gap-3 mb-6 justify-center">
        {quickResponses.map((response, index) => {
          const Icon = response.icon;
          return (
            <Button
              key={index}
              variant="outline"
              onClick={() => sendMessage(response.text)}
              className={`${response.color} border-transparent hover:shadow-md rounded-full`}
            >
              <Icon className="h-4 w-4 mr-2" />
              {response.text}
            </Button>
          );
        })}
      </div>

      {/* Chat Container */}
      <Card className="h-96 overflow-hidden border-0 bg-white/80 shadow-lg">
        <CardContent className="p-0 h-full flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex max-w-xs lg:max-w-md ${message.sender === "user" ? "flex-row-reverse" : "flex-row"} items-start space-x-2`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gradient-to-br from-blue-400 to-green-400 text-white"
                    }`}
                  >
                    {message.sender === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div
                    className={`px-4 py-3 rounded-2xl ${
                      message.sender === "user"
                        ? "bg-blue-500 text-white rounded-br-md"
                        : "bg-gray-100 text-gray-800 rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">
                      {message.text}
                    </p>
                    {message.suggestions && (
                      <div className="mt-3 space-y-2">
                        {message.suggestions.map(
                          (suggestion, index) => (
                            <Button
                              key={index}
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                sendMessage(suggestion)
                              }
                              className="block w-full text-left text-xs bg-white/50 hover:bg-white/80 text-gray-700 rounded-lg p-2"
                            >
                              {suggestion}
                            </Button>
                          ),
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-4">
            <form
              onSubmit={handleSubmit}
              className="flex space-x-3"
            >
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message here..."
                className="flex-1 rounded-full border-gray-200 focus:border-blue-400 focus:ring-blue-400"
              />
              <Button
                type="submit"
                disabled={!inputText.trim()}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>

      {/* Professional Help Notice */}
      <div className="text-center mt-6 p-4 bg-blue-50 rounded-2xl">
        <p className="text-blue-800 text-sm mb-3">
          While I'm here to support you, I'm not a replacement
          for professional mental health care.
        </p>
        <Button
          variant="outline"
          className="border-blue-500 text-blue-600 hover:bg-blue-50 rounded-full"
        >
          <Phone className="h-4 w-4 mr-2" />
          Escalate to Professional Help
        </Button>
      </div>
    </div>
  );
}