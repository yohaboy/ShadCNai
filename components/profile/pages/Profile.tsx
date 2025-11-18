'use client';

import { Mail, MapPin, Calendar, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Profile() {
  return (
      <div className='flex justify-center w-full px-4 py-6'>
        <div className="w-full max-w-5xl space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 rounded-lg bg-primary flex items-center justify-center text-4xl font-bold text-primary-foreground">
                JD
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">John Doe</h2>
                <p className="text-muted-foreground mt-1">Product Manager</p>
                <div className="flex gap-4 mt-4">
                  <Button>Edit Profile</Button>
                  <Button variant="outline">Download Data</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>View and manage your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-accent rounded-lg">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">john@example.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-accent rounded-lg">
                <Shield className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Account Type</p>
                  <p className="font-medium">Pro</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-accent rounded-lg">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Joined</p>
                  <p className="font-medium">Jan 15, 2023</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-accent rounded-lg">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">San Francisco, CA</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit Form */}
        <Card>
          <CardHeader>
            <CardTitle>Edit Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" defaultValue="John" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" defaultValue="Doe" className="mt-2" />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue="john@example.com" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Input id="bio" placeholder="Tell us about yourself" className="mt-2" />
            </div>
            <Button className="w-full">Save Changes</Button>
          </CardContent>
        </Card>
    </div>
      </div>
  );
}
