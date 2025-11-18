'use client';

import { Bell, Lock, Eye, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState<'general' | 'notifications' | 'security'>('general');

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        {(['general', 'notifications', 'security'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* General Settings */}
      {activeTab === 'general' && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <select className="w-full p-2 rounded-lg border border-border bg-background text-foreground">
                  <option>Light</option>
                  <option>Dark</option>
                  <option>System</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <select className="w-full p-2 rounded-lg border border-border bg-background text-foreground">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <select className="w-full p-2 rounded-lg border border-border bg-background text-foreground">
                  <option>UTC-8 (Pacific Time)</option>
                  <option>UTC-5 (Eastern Time)</option>
                  <option>UTC (Greenwich Mean Time)</option>
                  <option>UTC+1 (Central European Time)</option>
                </select>
              </div>

              <Button>Save Preferences</Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Notification Settings */}
      {activeTab === 'notifications' && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: 'Email Notifications', description: 'Receive updates via email', icon: <Mail className="w-5 h-5" /> },
                { title: 'Push Notifications', description: 'Get instant alerts on your device', icon: <Bell className="w-5 h-5" /> },
                { title: 'Weekly Digest', description: 'Get a summary of your activity', icon: <Eye className="w-5 h-5" /> },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between p-4 rounded-lg bg-accent hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-primary">{item.icon}</div>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
                </div>
              ))}
              <Button>Save Notification Settings</Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Security Settings */}
      {activeTab === 'security' && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Protect your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-accent rounded-lg flex items-start gap-3">
                <Lock className="w-5 h-5 text-primary mt-1" />
                <div className="flex-1">
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground mt-1">Add an extra layer of security to your account</p>
                  <Button variant="outline" className="mt-3">
                    Enable 2FA
                  </Button>
                </div>
              </div>

              <div className="p-4 bg-accent rounded-lg flex items-start gap-3">
                <Eye className="w-5 h-5 text-primary mt-1" />
                <div className="flex-1">
                  <p className="font-medium">Active Sessions</p>
                  <p className="text-sm text-muted-foreground mt-1">Manage your active sessions across devices</p>
                  <Button variant="outline" className="mt-3">
                    View Sessions
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" placeholder="Enter current password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" placeholder="Enter new password" />
              </div>

              <Button>Update Password</Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
