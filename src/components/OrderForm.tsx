import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from './ui/use-toast';
import { Card } from './ui/card';
import { FolderOpen, CheckCircle2 } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface GoogleDriveImage {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink?: string;
  webContentLink?: string;
  iconLink?: string;
}

interface Gallery {
  id: string;
  name: string;
  description: string;
  images: GoogleDriveImage[];
  createdAt: string;
}

interface OrderFormProps {
  serviceName: string;
}

export function OrderForm({ serviceName }: OrderFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    quantity: '',
    timeline: '',
    message: ''
  });
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [selectedGalleryId, setSelectedGalleryId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingGalleries, setIsLoadingGalleries] = useState(true);

  useEffect(() => {
    loadGalleries();
  }, []);

  const loadGalleries = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2c6a0ca3/galleries`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setGalleries(data.galleries || []);
      }
    } catch (error) {
      console.error('Error loading galleries:', error);
    } finally {
      setIsLoadingGalleries(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const selectedGallery = galleries.find(g => g.id === selectedGalleryId);
      
      // Create order with selected gallery
      const orderData = {
        ...formData,
        serviceName,
        galleryId: selectedGalleryId,
        galleryName: selectedGallery?.name,
        imageCount: selectedGallery?.images.length || 0
      };

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2c6a0ca3/orders`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to submit order');
      }

      const result = await response.json();

      toast({
        title: 'Quote Request Submitted!',
        description: `Order #${result.orderId.slice(-8)} created. We will contact you within 24 hours with a detailed quote.`
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        quantity: '',
        timeline: '',
        message: ''
      });
      setSelectedGalleryId('');
    } catch (error) {
      console.error('Error submitting order:', error);
      toast({
        title: 'Submission Failed',
        description: 'There was an error submitting your request. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const selectedGallery = galleries.find(g => g.id === selectedGalleryId);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input type="hidden" value={serviceName} />
      
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="John Doe"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="(555) 123-4567"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="company">Company Name</Label>
          <Input
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Your Company"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="e.g., 500"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="timeline">Timeline</Label>
          <Select
            value={formData.timeline}
            onValueChange={(value) => setFormData({ ...formData, timeline: value })}
          >
            <SelectTrigger id="timeline">
              <SelectValue placeholder="Select timeline" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="urgent">Urgent (1-3 days)</SelectItem>
              <SelectItem value="standard">Standard (1-2 weeks)</SelectItem>
              <SelectItem value="flexible">Flexible (2-4 weeks)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Additional Details</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          placeholder="Please provide any specific requirements, design details, or questions..."
        />
      </div>

      {/* Gallery Selection */}
      <div className="space-y-2">
        <Label htmlFor="gallery">Select Design Gallery (Optional)</Label>
        {isLoadingGalleries ? (
          <div className="p-4 bg-gray-50 rounded-lg text-center">
            <p className="text-sm text-gray-600">Loading galleries...</p>
          </div>
        ) : galleries.length > 0 ? (
          <>
            <Select value={selectedGalleryId} onValueChange={setSelectedGalleryId}>
              <SelectTrigger id="gallery">
                <SelectValue placeholder="Choose from our design galleries" />
              </SelectTrigger>
              <SelectContent>
                {galleries.map((gallery) => (
                  <SelectItem key={gallery.id} value={gallery.id}>
                    {gallery.name} ({gallery.images.length} images)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedGallery && (
              <Card className="mt-4 p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        {selectedGallery.name}
                      </h4>
                      {selectedGallery.description && (
                        <p className="text-sm text-gray-600 mt-1">
                          {selectedGallery.description}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {selectedGallery.images.slice(0, 12).map((image) => (
                      <div
                        key={image.id}
                        className="aspect-square bg-gray-100 rounded overflow-hidden"
                      >
                        {image.thumbnailLink ? (
                          <img
                            src={image.thumbnailLink}
                            alt={image.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FolderOpen className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <p className="text-sm text-gray-600">
                    {selectedGallery.images.length} image{selectedGallery.images.length !== 1 ? 's' : ''} in this gallery
                  </p>
                </div>
              </Card>
            )}
          </>
        ) : (
          <div className="p-6 bg-gray-50 rounded-lg text-center border-2 border-dashed border-gray-300">
            <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">No galleries available</p>
            <p className="text-sm text-gray-500 mt-1">
              Contact us directly to discuss your design needs
            </p>
          </div>
        )}
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
      </Button>
    </form>
  );
}