import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useToast } from '../components/ui/use-toast';
import { Lock } from 'lucide-react';

export function Admin() {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if already authenticated
    const storedAuth = sessionStorage.getItem('admin_authenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Default PIN is 1234 - should be changed in production
    const ADMIN_PIN = '1234';
    
    if (pin === ADMIN_PIN) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      toast({
        title: 'Access Granted',
        description: 'Welcome to the admin panel'
      });
    } else {
      toast({
        title: 'Access Denied',
        description: 'Incorrect PIN',
        variant: 'destructive'
      });
      setPin('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
    setPin('');
    toast({
      title: 'Logged Out',
      description: 'You have been logged out of the admin panel'
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen py-16 bg-gray-50">
        <div className="max-w-md mx-auto px-4">
          <Card>
            <CardHeader className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mx-auto mb-4">
                <Lock className="h-8 w-8" />
              </div>
              <CardTitle>Admin Access</CardTitle>
              <CardDescription>Enter your PIN to access the admin panel</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pin">Admin PIN</Label>
                  <Input
                    id="pin"
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="Enter PIN"
                    maxLength={6}
                    required
                    autoFocus
                  />
                </div>
                <Button type="submit" className="w-full">
                  Access Admin Panel
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  Default PIN: 1234 (Change in production)
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl">Admin Panel</h1>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl">-</p>
              <p className="text-sm text-gray-500">View in Orders tab</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Galleries</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl">-</p>
              <p className="text-sm text-gray-500">View in Galleries tab</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full" asChild>
                  <a href="/#/admin/galleries">Manage Galleries</a>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <a href="/#/admin/orders">View Orders</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
