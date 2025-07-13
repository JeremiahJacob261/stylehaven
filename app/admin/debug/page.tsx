"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminDebugPage() {
  const { user, loading, refreshUser } = useAuth();
  const router = useRouter();
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [sessionCheck, setSessionCheck] = useState<any>(null);
  const [userCheck, setUserCheck] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user || !user.is_staff) {
        router.push("/");
        return;
      }
      setIsAuthorized(true);
    }
    
    // Log current user state
    console.log('Current user state:', { user, loading });
    setDebugInfo({ user, loading });
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-4">You need staff privileges to access debug information.</p>
          <Button onClick={() => router.push('/')}>Return to Home</Button>
        </div>
      </div>
    );
  }

  const checkSession = async () => {
    try {
      const sessionToken = localStorage.getItem('session_token');
      console.log('Session token exists:', !!sessionToken);
      
      const response = await fetch('/api/debug/session', {
        headers: {
          'Authorization': `Bearer ${sessionToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      console.log('Session check response:', data);
      setSessionCheck(data);
    } catch (error) {
      console.error('Session check error:', error);
      setSessionCheck({ error: error.message });
    }
  };

  const checkUser = async () => {
    try {
      const sessionToken = localStorage.getItem('session_token');
      const response = await fetch('/api/debug/user', {
        headers: {
          'Authorization': `Bearer ${sessionToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      console.log('User check response:', data);
      setUserCheck(data);
    } catch (error) {
      console.error('User check error:', error);
      setUserCheck({ error: error.message });
    }
  };

  const makeStaff = async () => {
    try {
      const response = await fetch('/api/debug/make-staff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      
      const data = await response.json();
      console.log('Make staff response:', data);
      
      if (data.success) {
        alert('User made staff successfully! Please refresh the page or re-login.');
        await refreshUser(); // Refresh the user context
      } else {
        alert('Failed to make user staff: ' + data.error);
      }
    } catch (error) {
      console.error('Make staff error:', error);
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Admin Access Debug</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Current User State</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(debugInfo, null, 2)}
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Session Token Check</CardTitle>
            <Button onClick={checkSession}>Check Session</Button>
          </CardHeader>
          <CardContent>
            {sessionCheck && (
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                {JSON.stringify(sessionCheck, null, 2)}
              </pre>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Database Check</CardTitle>
            <Button onClick={checkUser}>Check User in DB</Button>
          </CardHeader>
          <CardContent>
            {userCheck && (
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                {JSON.stringify(userCheck, null, 2)}
              </pre>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Make User Staff (For Testing)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email:</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="user@example.com"
                />
              </div>
              <Button onClick={makeStaff} disabled={!email}>
                Make Staff
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Local Storage Info</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Session Token:</strong> {localStorage.getItem('session_token') ? 'Exists' : 'Missing'}</p>
              <p><strong>Token Preview:</strong> {localStorage.getItem('session_token')?.substring(0, 20)}...</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Access Checks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>User Object:</strong> {user ? 'Exists' : 'Missing'}</p>
              <p><strong>Loading State:</strong> {loading ? 'True' : 'False'}</p>
              <p><strong>Is Staff:</strong> {user?.is_staff ? 'True' : 'False'}</p>
              <p><strong>Has Paid:</strong> {user?.has_paid ? 'True' : 'False'}</p>
              <p><strong>Email Verified:</strong> {user?.email_verified ? 'True' : 'False'}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
