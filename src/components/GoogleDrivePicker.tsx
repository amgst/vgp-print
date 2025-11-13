import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { FolderOpen, X, Image as ImageIcon } from 'lucide-react';
import { useToast } from './ui/use-toast';

declare global {
  interface Window {
    gapi: any;
    google: any;
  }
}

interface GoogleDriveImage {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink?: string;
  webContentLink?: string;
  iconLink?: string;
}

interface GoogleDrivePickerProps {
  onImagesSelected: (images: GoogleDriveImage[]) => void;
  selectedImages?: GoogleDriveImage[];
}

export function GoogleDrivePicker({ onImagesSelected, selectedImages = [] }: GoogleDrivePickerProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { toast } = useToast();

  // You'll need to set these in your environment or configuration
  const CLIENT_ID = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_GOOGLE_CLIENT_ID : '';
  const API_KEY = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_GOOGLE_API_KEY : '';
  const APP_ID = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_GOOGLE_APP_ID : '';
  
  const SCOPES = 'https://www.googleapis.com/auth/drive.readonly';

  // Check if credentials are configured
  const isConfigured = CLIENT_ID && API_KEY && APP_ID;

  useEffect(() => {
    if (!isConfigured) {
      return;
    }

    // Load Google API
    const script1 = document.createElement('script');
    script1.src = 'https://apis.google.com/js/api.js';
    script1.async = true;
    script1.defer = true;
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = 'https://accounts.google.com/gsi/client';
    script2.async = true;
    script2.defer = true;
    document.body.appendChild(script2);

    script1.onload = () => {
      window.gapi?.load('client:picker', () => {
        setIsLoaded(true);
      });
    };

    return () => {
      if (document.body.contains(script1)) {
        document.body.removeChild(script1);
      }
      if (document.body.contains(script2)) {
        document.body.removeChild(script2);
      }
    };
  }, [isConfigured]);

  const handleAuthClick = async () => {
    if (!isConfigured) {
      toast({
        title: 'Configuration Required',
        description: 'Google Drive credentials are not configured. Please see instructions below.',
        variant: 'destructive'
      });
      return;
    }

    try {
      const tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: async (response: any) => {
          if (response.error !== undefined) {
            throw response;
          }
          setIsAuthorized(true);
          await showPicker(response.access_token);
        },
      });

      tokenClient.requestAccessToken({ prompt: 'consent' });
    } catch (error) {
      console.error('Error during authorization:', error);
      toast({
        title: 'Authorization Failed',
        description: 'Please check your Google API credentials and try again.',
        variant: 'destructive'
      });
    }
  };

  const showPicker = async (accessToken: string) => {
    if (!window.google || !window.gapi) {
      toast({
        title: 'Error',
        description: 'Google Picker API not loaded',
        variant: 'destructive'
      });
      return;
    }

    const view = new window.google.picker.DocsView(window.google.picker.ViewId.DOCS_IMAGES)
      .setMode(window.google.picker.DocsViewMode.GRID)
      .setIncludeFolders(true);

    const picker = new window.google.picker.PickerBuilder()
      .setAppId(APP_ID)
      .setOAuthToken(accessToken)
      .addView(view)
      .addView(new window.google.picker.DocsUploadView())
      .setDeveloperKey(API_KEY)
      .setCallback(async (data: any) => {
        if (data.action === window.google.picker.Action.PICKED) {
          const files: GoogleDriveImage[] = data.docs.map((doc: any) => ({
            id: doc.id,
            name: doc.name,
            mimeType: doc.mimeType,
            thumbnailLink: doc.thumbnailUrl || doc.iconUrl,
            webContentLink: doc.url,
            iconLink: doc.iconUrl,
          }));
          
          onImagesSelected([...selectedImages, ...files]);
          
          toast({
            title: 'Images Added',
            description: `${files.length} image(s) selected from Google Drive`
          });
        }
      })
      .setTitle('Select Images from Google Drive')
      .enableFeature(window.google.picker.Feature.MULTISELECT_ENABLED)
      .build();

    picker.setVisible(true);
  };

  const removeImage = (imageId: string) => {
    onImagesSelected(selectedImages.filter(img => img.id !== imageId));
  };

  if (!isConfigured) {
    return (
      <div className="space-y-4">
        <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="text-yellow-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-sm mb-2">Google Drive Integration Not Configured</h4>
              <p className="text-sm text-gray-700 mb-3">
                To enable Google Drive image selection, you need to set up Google Cloud credentials.
              </p>
              <details className="text-sm">
                <summary className="cursor-pointer text-blue-600 hover:text-blue-700 mb-2">
                  Show setup instructions
                </summary>
                <ol className="list-decimal ml-4 space-y-1 text-gray-600">
                  <li>Go to <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Cloud Console</a></li>
                  <li>Create a new project or select an existing one</li>
                  <li>Enable the "Google Drive API" and "Google Picker API"</li>
                  <li>Create OAuth 2.0 Client ID credentials</li>
                  <li>Create an API Key</li>
                  <li>Set environment variables:
                    <ul className="list-disc ml-4 mt-1">
                      <li><code className="bg-white px-1 py-0.5 rounded text-xs">VITE_GOOGLE_CLIENT_ID</code></li>
                      <li><code className="bg-white px-1 py-0.5 rounded text-xs">VITE_GOOGLE_API_KEY</code></li>
                      <li><code className="bg-white px-1 py-0.5 rounded text-xs">VITE_GOOGLE_APP_ID</code></li>
                    </ul>
                  </li>
                </ol>
              </details>
            </div>
          </div>
        </div>
        
        <div className="p-8 bg-gray-50 rounded-lg text-center border-2 border-dashed border-gray-300">
          <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600">Google Drive picker is not available</p>
          <p className="text-sm text-gray-500 mt-1">Please configure Google Cloud credentials to enable this feature</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg text-center">
        <p className="text-gray-600">Loading Google Drive...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FolderOpen className="h-5 w-5 text-blue-600" />
          <span>Google Drive Images</span>
        </div>
        <Button type="button" onClick={handleAuthClick} variant="outline">
          <ImageIcon className="mr-2 h-4 w-4" />
          Select from Google Drive
        </Button>
      </div>

      {selectedImages.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {selectedImages.map((image) => (
            <Card key={image.id} className="relative group overflow-hidden">
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                {image.thumbnailLink ? (
                  <img
                    src={image.thumbnailLink}
                    alt={image.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="h-12 w-12 text-gray-400" />
                )}
              </div>
              <button
                type="button"
                onClick={() => removeImage(image.id)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="p-2 bg-white">
                <p className="text-xs truncate" title={image.name}>
                  {image.name}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}

      {selectedImages.length === 0 && (
        <div className="p-8 bg-gray-50 rounded-lg text-center border-2 border-dashed border-gray-300">
          <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600">No images selected</p>
          <p className="text-sm text-gray-500 mt-1">Click the button above to select images from Google Drive</p>
        </div>
      )}
    </div>
  );
}