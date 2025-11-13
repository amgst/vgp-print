import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../components/ui/use-toast';
import { GoogleDrivePicker } from '../components/GoogleDrivePicker';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Plus, Trash2, Edit, ArrowLeft, FolderOpen } from 'lucide-react';
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

export function AdminGalleries() {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingGallery, setEditingGallery] = useState<Gallery | null>(null);
  
  const [galleryForm, setGalleryForm] = useState({
    name: '',
    description: '',
    images: [] as GoogleDriveImage[]
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const storedAuth = sessionStorage.getItem('admin_authenticated');
    if (storedAuth !== 'true') {
      navigate('/admin');
      return;
    }
    setIsAuthenticated(true);
    loadGalleries();
  }, [navigate]);

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
      setIsLoading(false);
    }
  };

  const handleCreateGallery = async () => {
    if (!galleryForm.name.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Gallery name is required',
        variant: 'destructive'
      });
      return;
    }

    try {
      const galleryData = {
        ...galleryForm,
        id: editingGallery?.id || `gallery_${Date.now()}`,
        createdAt: editingGallery?.createdAt || new Date().toISOString()
      };

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2c6a0ca3/galleries`,
        {
          method: editingGallery ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(galleryData),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to save gallery');
      }

      toast({
        title: editingGallery ? 'Gallery Updated' : 'Gallery Created',
        description: `${galleryForm.name} has been ${editingGallery ? 'updated' : 'created'} successfully`
      });

      setGalleryForm({ name: '', description: '', images: [] });
      setEditingGallery(null);
      setIsDialogOpen(false);
      loadGalleries();
    } catch (error) {
      console.error('Error saving gallery:', error);
      toast({
        title: 'Error',
        description: 'Failed to save gallery',
        variant: 'destructive'
      });
    }
  };

  const handleEditGallery = (gallery: Gallery) => {
    setEditingGallery(gallery);
    setGalleryForm({
      name: gallery.name,
      description: gallery.description,
      images: gallery.images
    });
    setIsDialogOpen(true);
  };

  const handleDeleteGallery = async (galleryId: string) => {
    if (!confirm('Are you sure you want to delete this gallery?')) {
      return;
    }

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2c6a0ca3/galleries/${galleryId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete gallery');
      }

      toast({
        title: 'Gallery Deleted',
        description: 'The gallery has been removed'
      });

      loadGalleries();
    } catch (error) {
      console.error('Error deleting gallery:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete gallery',
        variant: 'destructive'
      });
    }
  };

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setEditingGallery(null);
      setGalleryForm({ name: '', description: '', images: [] });
    }
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
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/admin')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Admin
            </Button>
            <h1 className="text-3xl">Gallery Management</h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Gallery
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingGallery ? 'Edit Gallery' : 'Create New Gallery'}
                </DialogTitle>
                <DialogDescription>
                  Add images from Google Drive to create a gallery
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <Label htmlFor="gallery-name">Gallery Name *</Label>
                  <Input
                    id="gallery-name"
                    value={galleryForm.name}
                    onChange={(e) => setGalleryForm({ ...galleryForm, name: e.target.value })}
                    placeholder="e.g., Product Photos, Marketing Materials"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gallery-description">Description</Label>
                  <Textarea
                    id="gallery-description"
                    value={galleryForm.description}
                    onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })}
                    placeholder="Brief description of this gallery"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Gallery Images</Label>
                  <GoogleDrivePicker
                    selectedImages={galleryForm.images}
                    onImagesSelected={(images) => setGalleryForm({ ...galleryForm, images })}
                  />
                </div>

                <div className="flex gap-3 justify-end">
                  <Button variant="outline" onClick={() => handleDialogOpenChange(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateGallery}>
                    {editingGallery ? 'Update Gallery' : 'Create Gallery'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {galleries.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <FolderOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl mb-2">No Galleries Yet</h3>
              <p className="text-gray-600 mb-6">
                Create your first gallery by connecting Google Drive
              </p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create First Gallery
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleries.map((gallery) => (
              <Card key={gallery.id} className="overflow-hidden">
                <CardHeader>
                  <CardTitle>{gallery.name}</CardTitle>
                  <CardDescription>
                    {gallery.description || 'No description'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                      {gallery.images.slice(0, 6).map((image, idx) => (
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
                    
                    <div className="text-sm text-gray-600">
                      {gallery.images.length} image{gallery.images.length !== 1 ? 's' : ''}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleEditGallery(gallery)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleDeleteGallery(gallery.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
