"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface User {
  id: string;
  email: string;
  username: string;
  has_paid: boolean;
  is_staff: boolean;
  subscription_type: string;
  subscription_status: string;
  subscription_expires_at: string | null;
  email_verified: boolean;
  payment_method?: string;
  created_at: string;
  updated_at: string;
  total_receipts?: number;
  last_login?: string;
}

interface UserDetailsProps {
  user: User;
  onClose: () => void;
  onUpdate: () => void;
}

export function UserDetails({ user, onClose, onUpdate }: UserDetailsProps) {
  const [loading, setLoading] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getUserStatus = () => {
    if (user.is_staff) return { label: "Staff", color: "bg-purple-100 text-purple-800" };
    if (user.has_paid) return { label: "Premium", color: "bg-green-100 text-green-800" };
    return { label: "Free", color: "bg-gray-100 text-gray-800" };
  };

  const getSubscriptionStatus = () => {
    if (user.is_staff) return "Staff Account";
    if (!user.has_paid) return "Free Account";
    
    if (user.subscription_expires_at) {
      const expiresAt = new Date(user.subscription_expires_at);
      const now = new Date();
      return expiresAt > now ? "Active Subscription" : "Expired Subscription";
    }
    
    return user.subscription_status || "Unknown";
  };

  const updateUserStatus = async (newStatus: { is_staff?: boolean; has_paid?: boolean }) => {
    setLoading(true);
    try {
      const sessionToken = localStorage.getItem('session_token');
      const response = await fetch(`/api/admin/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${sessionToken}`
        },
        body: JSON.stringify(newStatus),
      });

      if (response.ok) {
        onUpdate();
        onClose();
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleStaffStatus = () => {
    updateUserStatus({ is_staff: !user.is_staff });
  };

  const togglePremiumStatus = () => {
    updateUserStatus({ has_paid: !user.has_paid });
  };

  const userStatus = getUserStatus();

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>User Details</span>
            <Badge className={userStatus.color}>{userStatus.label}</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Username</label>
                  <p className="text-sm">{user.username}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-sm">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">User ID</label>
                  <p className="text-xs font-mono">{user.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email Verified</label>
                  <Badge variant={user.email_verified ? "default" : "destructive"}>
                    {user.email_verified ? "Verified" : "Not Verified"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Account Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Account Type</label>
                  <p className="text-sm">{userStatus.label}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Subscription Status</label>
                  <p className="text-sm">{getSubscriptionStatus()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Subscription Type</label>
                  <p className="text-sm capitalize">{user.subscription_type || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Payment Method</label>
                  <p className="text-sm">{user.payment_method || "N/A"}</p>
                </div>
              </div>

              {user.subscription_expires_at && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Subscription Expires</label>
                  <p className="text-sm">{formatDate(user.subscription_expires_at)}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Activity Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Member Since</label>
                  <p className="text-sm">{formatDate(user.created_at)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Last Updated</label>
                  <p className="text-sm">{formatDate(user.updated_at)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Total Receipts</label>
                  <p className="text-sm">{user.total_receipts || 0}</p>
                </div>
                {user.last_login && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Last Login</label>
                    <p className="text-sm">{formatDate(user.last_login)}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Admin Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Admin Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant={user.is_staff ? "destructive" : "default"}
                  onClick={toggleStaffStatus}
                  disabled={loading}
                >
                  {user.is_staff ? "Remove Staff" : "Make Staff"}
                </Button>
                
                {!user.is_staff && (
                  <Button
                    variant={user.has_paid ? "destructive" : "default"}
                    onClick={togglePremiumStatus}
                    disabled={loading}
                  >
                    {user.has_paid ? "Remove Premium" : "Grant Premium"}
                  </Button>
                )}

                <Button variant="outline" disabled={loading}>
                  Send Email
                </Button>
                
                <Button variant="outline" disabled={loading}>
                  View Activity Log
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Close Button */}
          <div className="flex justify-end">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
