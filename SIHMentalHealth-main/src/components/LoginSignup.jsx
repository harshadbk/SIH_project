// import React, { useState } from "react";
// import {
//   BookOpen,
//   GraduationCap,
//   Building2,
//   Mail,
//   Lock,
//   User,
//   Eye,
//   EyeOff,
// } from "lucide-react";
// import { Button } from "./ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "./ui/card";
// import { Input } from "./ui/input";
// import { Label } from "./ui/label";

// export function LoginSignup({ onLogin }) {
//   const [isLogin, setIsLogin] = useState(true);
//   const [userType, setUserType] = useState("student");
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     studentId: "",
//     institution: "",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const mockUser = {
//       id: Math.random().toString(36).substr(2, 9),
//       name: formData.name || "John Doe",
//       email: formData.email,
//       type: userType,
//       hasCompletedAssessment: isLogin ? Math.random() > 0.5 : false,
//       assessmentResults: undefined,
//     };

//     onLogin(mockUser);
//   };

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   return (
//       <div
//   className="min-h-screen flex items-center justify-center p-4 bg-contain bg-center bg-no-repeat"
//   style={{
//     backgroundImage:
//       "url('src/images/water.jpg')", // replace with your link
//   }}
// >

//       <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white/70 rounded-2xl shadow-lg backdrop-blur-sm p-6">
//         {/* Left Side */}
//         <div className="text-center lg:text-left space-y-6">
//           <div className="space-y-4">
//             <div className="flex items-center justify-center lg:justify-start space-x-3">
//               <div className="w-12 h-12 bg-gradient-to-br from-chart-1 to-chart-2 rounded-full flex items-center justify-center">
//                 <BookOpen className="h-6 w-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl text-foreground">MindCare</h1>
//                 <p className="text-sm text-muted-foreground">
//                   Mental Wellness Companion
//                 </p>
//               </div>
//             </div>

//             <h2 className="text-3xl lg:text-4xl text-foreground">
//               Welcome to Your Mental Wellness Journey
//             </h2>
//           </div>

//           <div className="flex justify-center lg:justify-start">
//             <div className="relative">
//               <div className="w-64 h-64 bg-gradient-to-br from-chart-1/20 to-chart-2/20 rounded-3xl flex items-center justify-center">
//                 <div className="text-center space-y-4">
//                   <div className="w-20 h-20 bg-chart-1/30 rounded-full flex items-center justify-center mx-auto">
//                     <GraduationCap className="h-10 w-10 text-chart-1" />
//                   </div>
//                   <div className="space-y-2">
//                     <div className="flex space-x-2 justify-center">
//                       <div className="w-8 h-10 bg-chart-2/40 rounded-sm flex items-center justify-center">
//                         <BookOpen className="h-4 w-4 text-chart-2" />
//                       </div>
//                       <div className="w-8 h-10 bg-chart-1/40 rounded-sm"></div>
//                       <div className="w-8 h-10 bg-chart-2/40 rounded-sm"></div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="absolute -top-4 -right-4 w-8 h-8 bg-chart-2/30 rounded-full flex items-center justify-center animate-bounce">
//                 <span className="text-chart-2">✓</span>
//               </div>
//               <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-chart-1/30 rounded-full flex items-center justify-center animate-pulse">
//                 <span className="text-chart-1">💙</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Side */}
//         <div className="w-full max-w-md mx-auto">
//           <Card className="border-0 shadow-xl bg-card/95 backdrop-blur-sm">
//             <CardHeader className="text-center space-y-4">
//               <div className="flex justify-center space-x-4">
//                 <Button
//                   variant={userType === "student" ? "default" : "outline"}
//                   size="sm"
//                   onClick={() => setUserType("student")}
//                   className="rounded-full"
//                 >
//                   <GraduationCap className="h-4 w-4 mr-2" />
//                   Student
//                 </Button>
//                 <Button
//                   variant={userType === "college" ? "default" : "outline"}
//                   size="sm"
//                   onClick={() => setUserType("college")}
//                   className="rounded-full"
//                 >
//                   <Building2 className="h-4 w-4 mr-2" />
//                   College
//                 </Button>
//               </div>

//               <div>
//                 <CardTitle className="text-2xl text-foreground">
//                   {isLogin ? "Welcome Back" : "Get Started"}
//                 </CardTitle>
//                 <CardDescription className="text-muted-foreground">
//                   {isLogin
//                     ? `Sign in to your ${userType} account`
//                     : `Create your ${userType} account`}
//                 </CardDescription>
//               </div>
//             </CardHeader>

//             <CardContent>
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 {!isLogin && (
//                   <div className="space-y-2">
//                     <Label htmlFor="name" className="text-foreground">
//                       Full Name
//                     </Label>
//                     <div className="relative">
//                       <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                       <Input
//                         id="name"
//                         type="text"
//                         placeholder="Enter your full name"
//                         value={formData.name}
//                         onChange={(e) =>
//                           handleInputChange("name", e.target.value)
//                         }
//                         className="pl-10 bg-input-background border-border"
//                         required={!isLogin}
//                       />
//                     </div>
//                   </div>
//                 )}

//                 <div className="space-y-2">
//                   <Label htmlFor="email" className="text-foreground">
//                     Email
//                   </Label>
//                   <div className="relative">
//                     <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                     <Input
//                       id="email"
//                       type="email"
//                       placeholder="Enter your email"
//                       value={formData.email}
//                       onChange={(e) =>
//                         handleInputChange("email", e.target.value)
//                       }
//                       className="pl-10 bg-input-background border-border"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="password" className="text-foreground">
//                     Password
//                   </Label>
//                   <div className="relative">
//                     <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                     <Input
//                       id="password"
//                       type={showPassword ? "text" : "password"}
//                       placeholder="Enter your password"
//                       value={formData.password}
//                       onChange={(e) =>
//                         handleInputChange("password", e.target.value)
//                       }
//                       className="pl-10 pr-10 bg-input-background border-border"
//                       required
//                     />
//                     <Button
//                       type="button"
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
//                     >
//                       {showPassword ? (
//                         <EyeOff className="h-4 w-4 text-muted-foreground" />
//                       ) : (
//                         <Eye className="h-4 w-4 text-muted-foreground" />
//                       )}
//                     </Button>
//                   </div>
//                 </div>

//                 {!isLogin && userType === "student" && (
//                   <div className="space-y-2">
//                     <Label htmlFor="studentId" className="text-foreground">
//                       Student ID (Optional)
//                     </Label>
//                     <div className="relative">
//                       <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                       <Input
//                         id="studentId"
//                         type="text"
//                         placeholder="Enter your student ID"
//                         value={formData.studentId}
//                         onChange={(e) =>
//                           handleInputChange("studentId", e.target.value)
//                         }
//                         className="pl-10 bg-input-background border-border"
//                       />
//                     </div>
//                   </div>
//                 )}

//                 {!isLogin && userType === "college" && (
//                   <div className="space-y-2">
//                     <Label htmlFor="institution" className="text-foreground">
//                       Institution
//                     </Label>
//                     <div className="relative">
//                       <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                       <Input
//                         id="institution"
//                         type="text"
//                         placeholder="Enter institution name"
//                         value={formData.institution}
//                         onChange={(e) =>
//                           handleInputChange("institution", e.target.value)
//                         }
//                         className="pl-10 bg-input-background border-border"
//                         required={!isLogin && userType === "college"}
//                       />
//                     </div>
//                   </div>
//                 )}

//                 <Button
//                   type="submit"
//                   className="w-full bg-chart-1 hover:bg-chart-1/90 text-white rounded-full py-6"
//                   size="lg"
//                 >
//                   {isLogin ? "Sign In" : "Create Account"}
//                 </Button>

//                 <div className="text-center">
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     onClick={() => setIsLogin(!isLogin)}
//                     className="text-muted-foreground hover:text-foreground"
//                   >
//                     {isLogin
//                       ? "Don't have an account? Sign up"
//                       : "Already have an account? Sign in"}
//                   </Button>
//                 </div>
//               </form>
//             </CardContent>
//           </Card>

//           {/* Quick Demo Access */}
//           <div className="mt-6 text-center">
//             <p className="text-sm text-muted-foreground mb-2">
//               Quick Demo Access
//             </p>
//             <div className="flex space-x-2 justify-center">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() =>
//                   onLogin({
//                     id: "demo-student",
//                     name: "Demo Student",
//                     email: "demo@student.edu",
//                     type: "student",
//                     hasCompletedAssessment: false,
//                   })
//                 }
//                 className="text-xs"
//               >
//                 Demo Student (New)
//               </Button>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() =>
//                   onLogin({
//                     id: "demo-returning",
//                     name: "Returning Student",
//                     email: "returning@student.edu",
//                     type: "student",
//                     hasCompletedAssessment: true,
//                   })
//                 }
//                 className="text-xs"
//               >
//                 Returning Student
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import {
  BookOpen,
  GraduationCap,
  Building2,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function LoginSignup({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    studentId: "",
    institution: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const mockUser = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || "John Doe",
      email: formData.email,
      type: userType,
      hasCompletedAssessment: isLogin ? Math.random() > 0.5 : false,
      hasSeenSummary: false,
      assessmentResults: undefined,
    };

    onLogin(mockUser);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Logo above the card */}
      <div className="relative z-20 mb-8">
        <img
          src="/images/Logo.png"
          alt="MindCare Logo"
          className="w-21 h-auto"
        />
      </div>

      {/* Full background image */}
      <img
        src="/images/water.jpg" // replace with your image path or link
        alt="Background"
        className="absolute inset-0 w-full h-full object-contain bg-black"
      />
      
      {/* Main content */}
      <div className="relative z-10 max-w-4xl w-full grid grid-cols-1 lg:grid-cols-1 gap-8 items-center bg-white/70 rounded-2xl shadow-lg backdrop-blur-sm p-6">
        {/* Left Side */}
        <div className="text-center lg:text-left space-y-6">
          <div className="space-y-4">
           </div>
        </div>
        
        {/* Right Side (Form) */}
        <div className="w-full max-w-md mx-auto">
          <Card className="border-0 shadow-xl bg-card/95 backdrop-blur-sm">
            <CardHeader className="text-center space-y-4">
              <div className="flex justify-center space-x-4">
                <Button
                  variant={userType === "student" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUserType("student")}
                  className="rounded-full"
                >
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Student
                </Button>
                <Button
                  variant={userType === "college" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUserType("college")}
                  className="rounded-full"
                >
                  <Building2 className="h-4 w-4 mr-2" />
                  College
                </Button>
              </div>

              <div>
                <CardTitle className="text-2xl text-foreground">
                  {isLogin ? "Welcome Back" : "Get Started"}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {isLogin
                    ? `Sign in to your ${userType} account`
                    : `Create your ${userType} account`}
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className="pl-10 bg-input-background border-border"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="pl-10 bg-input-background border-border"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      className="pl-10 pr-10 bg-input-background border-border"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                {!isLogin && userType === "student" && (
                  <div className="space-y-2">
                    <Label htmlFor="studentId" className="text-foreground">
                      Student ID (Optional)
                    </Label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="studentId"
                        type="text"
                        placeholder="Enter your student ID"
                        value={formData.studentId}
                        onChange={(e) =>
                          handleInputChange("studentId", e.target.value)
                        }
                        className="pl-10 bg-input-background border-border"
                      />
                    </div>
                  </div>
                )}

                {!isLogin && userType === "college" && (
                  <div className="space-y-2">
                    <Label htmlFor="institution" className="text-foreground">
                      Institution
                    </Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="institution"
                        type="text"
                        placeholder="Enter institution name"
                        value={formData.institution}
                        onChange={(e) =>
                          handleInputChange("institution", e.target.value)
                        }
                        className="pl-10 bg-input-background border-border"
                        required={!isLogin && userType === "college"}
                      />
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-chart-1 hover:bg-chart-1/90 text-white rounded-full py-6"
                  size="lg"
                >
                  {isLogin ? "Sign In" : "Create Account"}
                </Button>

                <div className="text-center">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {isLogin
                      ? "Don't have an account? Sign up"
                      : "Already have an account? Sign in"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Quick Demo Access */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Quick Demo Access
            </p>
            <div className="flex space-x-2 justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  onLogin({
                    id: "demo-student",
                    name: "Demo Student",
                    email: "demo@student.edu",
                    type: "student",
                    hasCompletedAssessment: false,
                    hasSeenSummary: false,
                  })
                }
                className="text-xs"
              >
                Demo Student (New)
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  onLogin({
                    id: "demo-returning",
                    name: "Returning Student",
                    email: "returning@student.edu",
                    type: "student",
                    hasCompletedAssessment: true,
                    hasSeenSummary: true,
                  })
                }
                className="text-xs"
              >
                Returning Student
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

