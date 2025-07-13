"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
  const { login, register, user } = useAuth();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      let result;
      if (isRegister) {
        // Register as staff
        result = await register(email, username, password, true, false);
      } else {
        // Login
        result = await login(email, password, false);
      }

      if (result.success) {
        // Check if the user is actually staff
        if (result.user && result.user.is_staff) {
          setMessage('Success! Redirecting to admin dashboard...');
          setTimeout(() => {
            window.location.href = '/admin';
          }, 1000);
        } else {
          setMessage('Error: This account does not have staff privileges.');
        }
      } else {
        setMessage(result.error || 'Authentication failed');
      }
    } catch (error: any) {
      setMessage('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Current User Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Staff Status:</strong> 
                  <span className={user.is_staff ? 'text-green-600 font-semibold' : 'text-red-600'}>
                    {user.is_staff ? ' ✓ Staff Member' : ' ✗ Not Staff'}
                  </span>
                </p>
                <p><strong>Subscription:</strong> {user.has_paid ? '✓ Active' : '✗ Inactive'}</p>
              </div>
              
              {user.is_staff ? (
                <div className="space-y-2">
                  <Button 
                    onClick={() => window.location.href = '/admin'}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Access Admin Dashboard
                  </Button>
                  <Button 
                    onClick={() => window.location.href = '/'}
                    variant="outline"
                    className="w-full"
                  >
                    Return to Home
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
                    ⚠️ This account does not have staff privileges and cannot access the admin area.
                  </div>
                  <Button 
                    onClick={() => window.location.href = '/'}
                    className="w-full"
                  >
                    Return to Home
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{isRegister ? 'Create Staff Account' : 'Admin Login'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            {isRegister && (
              <div>
                <label className="block text-sm font-medium mb-2">Username</label>
                <input 
                  type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Processing...' : (isRegister ? 'Create Staff Account' : 'Login')}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="text-blue-600 hover:underline text-sm"
              >
                {isRegister ? 'Already have an account? Login' : 'Need to create a staff account?'}
              </button>
            </div>

            {message && (
              <div className={`p-3 rounded text-sm ${
                message.includes('Success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {message}
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
