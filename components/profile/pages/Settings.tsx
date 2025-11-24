'use client';

import { Bell, Lock, Eye, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { changePassword } from '@/lib/auth-client';
import { auth } from '@/lib/auth';

type Session = typeof auth.$Infer.Session;

export default function Settings({ session }: { session: Session | null }) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordUpdate = async () => {
      if (!session) return;
        setLoading(true);
      try {  
        if (newPassword && oldPassword) {
          await changePassword({
            newPassword: newPassword,
            currentPassword: oldPassword,
            revokeOtherSessions: true,
          })
        }
        alert('Password updated successfully!');

      } catch (err) {
        console.error(err);
        alert('Failed to update profile. Check console for details.');
      } finally {
        setLoading(false);
        setOldPassword('');
        setNewPassword('');
      }
    };

  return (
      <div className='flex justify-center w-full px-4 py-6'>
        <div className="w-full max-w-5xl space-y-6">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Protect your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-black/20 rounded-lg flex items-start gap-3">
                    <Lock className="w-5 h-5 text-primary mt-1" />
                    <div className="flex-1">
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground mt-1">Add an extra layer of security to your account</p>
                      <Button variant="outline" className="mt-3">
                        comming soon ...
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 bg-black/20 rounded-lg flex items-start gap-3">
                    <Eye className="w-5 h-5 text-primary mt-1" />
                    <div className="flex-1">
                      <p className="font-medium">Active Sessions</p>
                      <p className="text-sm text-muted-foreground mt-1">Manage your active sessions across devices</p>
                      <Button variant="outline" className="mt-3">
                        comming soon ...
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="oldpassword">Old Password</Label>
                    <Input
                      type="password"
                      id="oldpassword"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="newpassword">New Password</Label>
                    <Input
                      type="password"
                      id="newpassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <Button className="mt-2 bg-black/20 hover:bg-black/80 hover:cursor-pointer" onClick={handlePasswordUpdate}>{loading ? 'Updating...' : 'Update Password'}</Button>
                </CardContent>
              </Card>
            </div>
        </div>
      </div>
  );
}
