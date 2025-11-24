'use client';

import { Mail, Calendar, User2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { auth } from '@/lib/auth';
import { updateUser, changeEmail, changePassword } from '@/lib/auth-client';
import { useState } from 'react';

type Session = typeof auth.$Infer.Session;

export default function Profile({ session }: { session: Session | null }) {
  const [name, setName] = useState(session?.user.name || '');
  const [email, setEmail] = useState(session?.user.email || '');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async () => {
    if (!session) return;
    setLoading(true);

    try {
      // Update name
      if (name !== session.user.name) {
        await updateUser({ name });
      }

      // Update email
      if (email !== session.user.email) {
        await changeEmail({ newEmail: email });
      }

      // Update password
      if (newPassword && oldPassword) {
        await changePassword({
          newPassword: newPassword,
          currentPassword: oldPassword,
          revokeOtherSessions: true,
        })
      }

      alert('Profile updated successfully!');
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
    <div className="flex justify-center w-full px-4 py-6">
      <div className="w-full max-w-5xl space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6 flex items-start gap-6">
            <div className="w-24 h-24 rounded-lg bg-primary flex items-center justify-center text-4xl font-bold text-primary-foreground">
              <User2 size={34} />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{session?.user.name}</h2>
              <p className="text-muted-foreground mt-1">{session?.user.tokens} Tokens</p>
            </div>
          </CardContent>
        </Card>

        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>View and manage your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-black/20 rounded-lg">
              <Mail className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{session?.user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-black/20 rounded-lg">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Joined</p>
                <p className="font-medium">
                  {session?.user.createdAt
                    ? new Date(session.user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })
                    : '—'}
                </p>
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
              <div className="flex flex-col gap-4">
                <div>
                  <Label htmlFor="full-name">Full Name</Label>
                  <Input
                    id="full-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4">
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
              </div>
            </div>

            <Button
              className="mt-2 hover:cursor-pointer"
              onClick={handleUpdateProfile}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
