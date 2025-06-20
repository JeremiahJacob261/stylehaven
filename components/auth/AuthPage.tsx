"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { AlertCircle, User, Mail, Lock, Shield, Crown } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface AuthPageProps {
  onAuthSuccess: () => void
}

export default function AuthPage({ onAuthSuccess }: AuthPageProps) {
  const { login, register } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  
  // Staff code verification dialog state
  const [showStaffDialog, setShowStaffDialog] = useState(false)
  const [staffCode, setStaffCode] = useState('')
  const [staffCodeError, setStaffCodeError] = useState<string | null>(null)
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  const [registerData, setRegisterData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    isStaff: false
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const result = await login(loginData.email, loginData.password)
      
      if (result.success) {
        setSuccess('Login successful! Welcome back!')
        onAuthSuccess()
      } else {
        setError(result.error || 'Login failed')
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    if (registerData.password.length < 6) {
      setError('Password must be at least 6 characters')
      setIsLoading(false)
      return
    }

    try {
      const result = await register(
        registerData.email,
        registerData.username,
        registerData.password,
        registerData.isStaff
      )

      if (result.success) {
        setSuccess('Registration successful! Welcome to NateTube!')
        onAuthSuccess()
      } else {
        setError(result.error || 'Registration failed')
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStaffCheckboxChange = (checked: boolean) => {
    if (checked) {
      // Show staff code dialog
      setShowStaffDialog(true)
      setStaffCode('')
      setStaffCodeError(null)
    } else {
      // Uncheck staff status
      setRegisterData({ ...registerData, isStaff: false })
    }
  }

  const handleStaffCodeSubmit = () => {
    const CORRECT_STAFF_CODE = "nocaps!"
    
    if (staffCode === CORRECT_STAFF_CODE) {
      // Valid staff code
      setRegisterData({ ...registerData, isStaff: true })
      setShowStaffDialog(false)
      setStaffCode('')
      setStaffCodeError(null)
    } else {
      // Invalid staff code
      setStaffCodeError('Invalid staff code. Please try again.')
    }
  }

  const handleStaffDialogCancel = () => {
    // Reset staff status and close dialog
    setRegisterData({ ...registerData, isStaff: false })
    setShowStaffDialog(false)
    setStaffCode('')
    setStaffCodeError(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0">
          <CardHeader className="space-y-1 pb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center text-gray-900">
              Welcome to NateTube
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              Sign in to your account or create a new one to get started
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <span className="text-red-800 text-sm">{error}</span>
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start space-x-2">
                <Crown className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-green-800 text-sm">{success}</span>
              </div>
            )}

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="register">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="Enter your password"
                        className="pl-10"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10"
                        value={registerData.email}
                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-username">Username</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-username"
                        type="text"
                        placeholder="Choose a username"
                        className="pl-10"
                        value={registerData.username}
                        onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="Enter your password"
                        className="pl-10"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm your password"
                        className="pl-10"
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <Checkbox
                      id="is-staff"
                      checked={registerData.isStaff}
                      onCheckedChange={handleStaffCheckboxChange}
                    />
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-amber-600" />
                      <Label htmlFor="is-staff" className="text-sm font-medium text-amber-800">
                        I am a staff member (free access)
                      </Label>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Creating account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Staff Code Verification Dialog */}
        <Dialog open={showStaffDialog} onOpenChange={() => {}}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <span>Staff Verification Required</span>
              </DialogTitle>
              <DialogDescription>
                Please enter the staff code to verify your staff status and gain free access to NateTube.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="staff-code">Staff Code</Label>
                <Input
                  id="staff-code"
                  type="password"
                  placeholder="Enter staff code"
                  value={staffCode}
                  onChange={(e) => {
                    setStaffCode(e.target.value)
                    setStaffCodeError(null) // Clear error when typing
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleStaffCodeSubmit()
                    }
                  }}
                  className={staffCodeError ? 'border-red-300 focus:border-red-500' : ''}
                />
                {staffCodeError && (
                  <div className="flex items-center space-x-1 text-red-600 text-sm">
                    <AlertCircle className="w-3 h-3" />
                    <span>{staffCodeError}</span>
                  </div>
                )}
              </div>
              
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <div className="flex items-start space-x-2">
                  <Shield className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium">Staff Benefits:</p>
                    <ul className="mt-1 list-disc list-inside text-blue-700">
                      <li>Free lifetime access to all features</li>
                      <li>Priority customer support</li>
                      <li>Access to admin features</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={handleStaffDialogCancel}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleStaffCodeSubmit}
                disabled={!staffCode.trim()}
                className="flex-1"
              >
                Verify Code
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}