import React from "react";
import { User } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export function AccountProfile({ user }) {
  return (
    <Link to="/account">
      <Button
        variant="ghost"
        size="sm"
        className="w-10 h-10 rounded-full p-0 hover:bg-accent/50"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-chart-1 to-chart-2 rounded-full flex items-center justify-center">
          <User className="h-4 w-4 text-white" />
        </div>
      </Button>
    </Link>
  );
}
