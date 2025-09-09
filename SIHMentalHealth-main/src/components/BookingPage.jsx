
import React, { useState } from "react";
import { CheckCircle, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export function BookingPage() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedCounsellor, setSelectedCounsellor] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    concern: "",
  });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const counsellors = [
    {
      id: "1",
      name: "Dr. Sarah Mitchell",
      specialties: ["Anxiety", "Depression", "Academic Stress"],
      availability: "Mon-Fri: 9AM-5PM",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      specialties: ["Relationship Issues", "Self-Esteem", "Life Transitions"],
      availability: "Tue-Thu: 10AM-6PM",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      specialties: ["Trauma", "PTSD", "Grief Counseling"],
      availability: "Mon-Wed-Fri: 11AM-7PM",
      image:
        "https://images.unsplash.com/photo-1594824694409-7099b7f3b9b9?w=150&h=150&fit=crop&crop=face",
    },
  ];

  const timeSlots = [
    { time: "9:00 AM", available: true },
    { time: "10:00 AM", available: true },
    { time: "11:00 AM", available: false },
    { time: "12:00 PM", available: true },
    { time: "1:00 PM", available: false },
    { time: "2:00 PM", available: true },
    { time: "3:00 PM", available: true },
    { time: "4:00 PM", available: false },
    { time: "5:00 PM", available: true },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBooking = () => {
    setBookingConfirmed(true);
  };

  if (bookingConfirmed) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="border-0 shadow-xl bg-card/95 backdrop-blur-sm text-center">
          <CardContent className="p-12">
            <div className="w-16 h-16 bg-chart-2/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-chart-2" />
            </div>
            <h1 className="text-3xl text-foreground mb-4">Booking Confirmed!</h1>
            <p className="text-muted-foreground mb-8">
              Your appointment has been successfully scheduled. You'll receive a confirmation email shortly.
            </p>
            <div className="bg-accent/50 rounded-lg p-6 mb-8">
              <h3 className="text-foreground mb-4">Appointment Details</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Date:</strong> {selectedDate}</p>
                <p><strong>Time:</strong> {selectedTime}</p>
                <p><strong>Counsellor:</strong> {counsellors.find(c => c.id === selectedCounsellor)?.name}</p>
                <p><strong>Type:</strong> Video Call</p>
              </div>
            </div>
            {/* <Button href="src/components/HomePage.jsx" className="bg-chart-1 hover:bg-chart-1/90 text-white rounded-full">
              Return to Dashboard
            </Button> */}
            <a
              href="/HomePage.jsx"
              className="bg-chart-1 hover:bg-chart-1/90 text-white rounded-full px-6 py-2 inline-block text-center"
            >
              Return to Dashboard
            </a>

          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-4xl w-full space-y-6">
        {/* Choose Therapist */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Choose Your Counsellor</CardTitle>
            <CardDescription>
              Select a counsellor based on their specialties and availability
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {counsellors.map((counsellor) => (
              <div
                key={counsellor.id}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedCounsellor === counsellor.id
                    ? "border-chart-1 bg-chart-1/5"
                    : "border-border hover:border-chart-1/50"
                  }`}
                onClick={() => setSelectedCounsellor(counsellor.id)}
              >
                <div className="flex space-x-4">
                  <img
                    src={counsellor.image}
                    alt={counsellor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-foreground">{counsellor.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {counsellor.availability}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {counsellor.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-chart-1/20 text-chart-1 text-xs rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Date & Time */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Select Date & Time</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Select Date</Label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="rounded-full"
              />
            </div>
            <div className="space-y-2">
              <Label>Available Time Slots</Label>
              <div className="grid grid-cols-3 gap-3">
                {timeSlots.map((slot, index) => (
                  <Button
                    key={index}
                    variant={selectedTime === slot.time ? "default" : "outline"}
                    disabled={!slot.available}
                    onClick={() => setSelectedTime(slot.time)}
                    className="rounded-full"
                  >
                    {slot.time}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Info */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="rounded-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="rounded-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="concern">What would you like to discuss? (Optional)</Label>
              <Textarea
                id="concern"
                value={formData.concern}
                onChange={(e) => handleInputChange("concern", e.target.value)}
                placeholder="Brief description of what you'd like to talk about..."
                className="rounded-lg"
              />
            </div>
          </CardContent>
        </Card>

        {/* Confirm Button */}
        <div className="flex justify-end mt-6">
          <Button
            onClick={handleBooking}
            disabled={!selectedCounsellor || !selectedDate || !selectedTime || !formData.name || !formData.email}
            className="bg-chart-1 hover:bg-chart-1/90 text-white rounded-full"
          >
            Confirm Booking
          </Button>
        </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card/90 backdrop-blur-sm border-t border-border mt-12">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-chart-1/5 to-chart-2/5">
            <CardHeader>
              <CardTitle className="flex items-center justify-center space-x-2 text-center">
                <Shield className="h-6 w-6 text-chart-1" />
                <span className="text-xl">Confidential & Secure</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-chart-1/20 rounded-full flex items-center justify-center mx-auto">
                    <Shield className="h-6 w-6 text-chart-1" />
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">All sessions are confidential</p>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-chart-2/20 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="h-6 w-6 text-chart-2" />
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">Licensed professionals</p>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-chart-3/20 rounded-full flex items-center justify-center mx-auto">
                    <Shield className="h-6 w-6 text-chart-3" />
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">Secure video platform</p>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-chart-4/20 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="h-6 w-6 text-chart-4" />
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">24-hour cancellation policy</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </footer>
    </div>
  );
}
