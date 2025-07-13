"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Analytics {
  totalUsers: number;
  freeUsers: number;
  paidUsers: number;
  staffUsers: number;
  monthlySignups: number;
  totalReceipts: number;
  revenueThisMonth: number;
}

interface AnalyticsDashboardProps {
  analytics: Analytics | null;
}

export function AnalyticsDashboard({ analytics }: AnalyticsDashboardProps) {
  if (!analytics) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </CardHeader>
            <CardContent className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const conversionRate = analytics.totalUsers > 0 
    ? ((analytics.paidUsers / analytics.totalUsers) * 100).toFixed(1)
    : 0;

  const freeUserPercentage = analytics.totalUsers > 0
    ? ((analytics.freeUsers / analytics.totalUsers) * 100).toFixed(1)
    : 0;

  const staffPercentage = analytics.totalUsers > 0
    ? ((analytics.staffUsers / analytics.totalUsers) * 100).toFixed(1)
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Analytics Overview</h2>
        <p className="text-gray-600">Detailed insights into user engagement and revenue</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Badge variant="outline">All Time</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              Registered accounts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Premium Users</CardTitle>
            <Badge className="bg-green-100 text-green-800">Paid</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.paidUsers}</div>
            <p className="text-xs text-muted-foreground">
              {conversionRate}% conversion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Signups</CardTitle>
            <Badge className="bg-blue-100 text-blue-800">This Month</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.monthlySignups}</div>
            <p className="text-xs text-muted-foreground">
              New registrations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Receipts</CardTitle>
            <Badge className="bg-orange-100 text-orange-800">Generated</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalReceipts}</div>
            <p className="text-xs text-muted-foreground">
              All time receipts
            </p>
          </CardContent>
        </Card>
      </div>

      {/* User Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span className="text-sm">Free Users</span>
              </div>
              <div className="text-right">
                <span className="font-medium">{analytics.freeUsers}</span>
                <span className="text-xs text-gray-500 ml-1">({freeUserPercentage}%)</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">Premium Users</span>
              </div>
              <div className="text-right">
                <span className="font-medium">{analytics.paidUsers}</span>
                <span className="text-xs text-gray-500 ml-1">({conversionRate}%)</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm">Staff Users</span>
              </div>
              <div className="text-right">
                <span className="font-medium">{analytics.staffUsers}</span>
                <span className="text-xs text-gray-500 ml-1">({staffPercentage}%)</span>
              </div>
            </div>

            {/* Visual representation */}
            <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
              <div className="flex h-full rounded-full overflow-hidden">
                <div 
                  className="bg-gray-400" 
                  style={{ width: `${freeUserPercentage}%` }}
                ></div>
                <div 
                  className="bg-green-500" 
                  style={{ width: `${conversionRate}%` }}
                ></div>
                <div 
                  className="bg-purple-500" 
                  style={{ width: `${staffPercentage}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Revenue This Month</span>
              <span className="font-bold text-lg">${analytics.revenueThisMonth}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Average Revenue Per User</span>
              <span className="font-medium">
                ${analytics.paidUsers > 0 ? (analytics.revenueThisMonth / analytics.paidUsers).toFixed(2) : "0.00"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Receipts per Premium User</span>
              <span className="font-medium">
                {analytics.paidUsers > 0 ? (analytics.totalReceipts / analytics.paidUsers).toFixed(1) : "0"}
              </span>
            </div>

            <div className="pt-4 border-t">
              <div className="text-sm text-gray-600 mb-2">Conversion Insights</div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Total Signups</span>
                  <span>{analytics.totalUsers}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Converted to Premium</span>
                  <span>{analytics.paidUsers}</span>
                </div>
                <div className="flex justify-between text-xs font-medium">
                  <span>Conversion Rate</span>
                  <span>{conversionRate}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Indicators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{analytics.monthlySignups}</div>
              <div className="text-sm text-gray-600">New Users This Month</div>
              <div className="text-xs text-gray-500 mt-1">
                {analytics.totalUsers > 0 ? ((analytics.monthlySignups / analytics.totalUsers) * 100).toFixed(1) : 0}% of total users
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{conversionRate}%</div>
              <div className="text-sm text-gray-600">Conversion Rate</div>
              <div className="text-xs text-gray-500 mt-1">
                Free to Premium conversion
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {analytics.totalUsers > 0 ? (analytics.totalReceipts / analytics.totalUsers).toFixed(1) : 0}
              </div>
              <div className="text-sm text-gray-600">Receipts per User</div>
              <div className="text-xs text-gray-500 mt-1">
                Average engagement
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
