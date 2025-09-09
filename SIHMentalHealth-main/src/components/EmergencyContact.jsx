import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export function EmergencyContact() {
  const navigate = useNavigate();
  const therapists = [
    {
      name: "Dr. Sarah Mitchell",
      role: "Lead College Therapist",
      phone: "(555) 123-4567",
      email: "sarah.mitchell@college.edu",
      availability: "Mon-Fri: 8AM-6PM",
      emergency: true,
    },
    {
      name: "Dr. Michael Chen",
      role: "Crisis Counselor",
      phone: "(555) 123-4568",
      email: "michael.chen@college.edu",
      availability: "24/7 On-Call",
      emergency: true,
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Campus Therapist",
      phone: "(555) 123-4569",
      email: "emily.rodriguez@college.edu",
      availability: "Mon-Wed-Fri: 9AM-5PM",
      emergency: false,
    },
  ];

  const handleCall = (phoneNumber) => {
    window.open(`tel:${phoneNumber}`, "_self");
  };

  const handleEmail = (email) => {
    window.open(
      `mailto:${email}?subject=Urgent Mental Health Support Request`,
      "_self",
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-emerald-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6 text-chart-1 hover:text-chart-1/80 hover:bg-chart-1/10 rounded-full"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>

          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-destructive/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <h1 className="text-3xl text-foreground">
                Emergency Support
              </h1>
              <p className="text-lg text-muted-foreground">
                Immediate access to college mental health
                professionals
              </p>
            </div>
          </div>
        </div>

        {/* Emergency Therapists */}
        <div className="mb-8">
          <h2 className="text-2xl text-foreground mb-6">
            Emergency-Available Therapists
          </h2>
          <div className="grid gap-6">
            {therapists
              .filter((therapist) => therapist.emergency)
              .map((therapist, index) => (
                <Card
                  key={index}
                  className="bg-white/90 backdrop-blur-sm border-border shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-foreground mb-1">
                          {therapist.name}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {therapist.role}
                        </p>
                      </div>
                      <div className="flex items-center space-x-1 px-2 py-1 bg-chart-1/20 rounded-full">
                        <div className="w-2 h-2 bg-chart-1 rounded-full animate-pulse"></div>
                        <span className="text-xs text-chart-1">
                          Available Now
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center space-x-3 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-foreground">
                          {therapist.phone}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-foreground">
                          {therapist.email}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm md:col-span-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-foreground">
                          {therapist.availability}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button
                        onClick={() =>
                          handleCall(therapist.phone)
                        }
                        className="bg-chart-1 hover:bg-chart-1/90 text-white rounded-full"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Call Now
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() =>
                          handleEmail(therapist.email)
                        }
                        className="border-chart-2 text-chart-2 hover:bg-chart-2/10 rounded-full"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Whatsapp
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>

        {/* Regular Therapists */}
        <div>
          <h2 className="text-2xl text-foreground mb-6">
            Additional College Therapists
          </h2>
          <div className="grid gap-6">
            {therapists
              .filter((therapist) => !therapist.emergency)
              .map((therapist, index) => (
                <Card
                  key={index}
                  className="bg-white/80 backdrop-blur-sm border-border shadow-md hover:shadow-lg transition-all duration-200 rounded-xl"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-foreground mb-1">
                          {therapist.name}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {therapist.role}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center space-x-3 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-foreground">
                          {therapist.phone}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-foreground">
                          {therapist.email}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm md:col-span-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-foreground">
                          {therapist.availability}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button
                        variant="outline"
                        onClick={() =>
                          handleCall(therapist.phone)
                        }
                        className="border-chart-1 text-chart-1 hover:bg-chart-1/10 rounded-full"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() =>
                          handleEmail(therapist.email)
                        }
                        className="text-chart-2 hover:text-chart-2/80 hover:bg-chart-2/10 rounded-full"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>

        {/* Campus Location */}
        <Card className="mt-8 bg-gradient-to-r from-chart-2/10 to-chart-1/10 backdrop-blur-sm border-border shadow-lg rounded-xl">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <MapPin className="h-5 w-5 text-chart-2" />
              <h3 className="text-xl text-foreground">
                Campus Counseling Center
              </h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Student Services Building, 2nd Floor, Room 204
            </p>
            <p className="text-muted-foreground mb-4">
              Walk-in hours: Monday-Friday 9AM-12PM and 1PM-4PM
            </p>
            <Button
              variant="outline"
              size="sm"
              className="border-chart-2 text-chart-2 hover:bg-chart-2/10 rounded-full"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Get Directions
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}