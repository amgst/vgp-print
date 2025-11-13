import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Package, Mail, Phone, Calendar } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface Order {
  orderId: string;
  serviceName: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  quantity?: string;
  timeline?: string;
  message?: string;
  galleryId?: string;
  galleryName?: string;
  imageCount?: number;
  createdAt: string;
}

export function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAuth = sessionStorage.getItem('admin_authenticated');
    if (storedAuth !== 'true') {
      navigate('/admin');
      return;
    }
    setIsAuthenticated(true);
    loadOrders();
  }, [navigate]);

  const loadOrders = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2c6a0ca3/orders`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (!isAuthenticated || isLoading) {
    return (
      <div className="min-h-screen py-16 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate('/admin')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Admin
          </Button>
          <h1 className="text-3xl">Orders Management</h1>
        </div>

        {orders.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl mb-2">No Orders Yet</h3>
              <p className="text-gray-600">
                Orders will appear here when customers submit quote requests
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.orderId}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Package className="h-5 w-5" />
                        Order #{order.orderId.slice(-8)}
                      </CardTitle>
                      <CardDescription>
                        {formatDate(order.createdAt)}
                      </CardDescription>
                    </div>
                    <Badge>{order.serviceName}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="text-sm text-gray-500">Customer Information</h4>
                      <div className="space-y-2">
                        <p><strong>Name:</strong> {order.name}</p>
                        {order.company && (
                          <p><strong>Company:</strong> {order.company}</p>
                        )}
                        <p className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          {order.email}
                        </p>
                        <p className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          {order.phone}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm text-gray-500">Order Details</h4>
                      <div className="space-y-2">
                        {order.quantity && (
                          <p><strong>Quantity:</strong> {order.quantity}</p>
                        )}
                        {order.timeline && (
                          <p className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            Timeline: {order.timeline}
                          </p>
                        )}
                        {order.galleryName && (
                          <p><strong>Gallery:</strong> {order.galleryName}</p>
                        )}
                        {order.imageCount !== undefined && order.imageCount > 0 && (
                          <p><strong>Images:</strong> {order.imageCount} file(s)</p>
                        )}
                        {order.message && (
                          <div>
                            <strong>Message:</strong>
                            <p className="text-sm text-gray-600 mt-1">{order.message}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}