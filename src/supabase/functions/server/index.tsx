import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const app = new Hono();

// Middleware
app.use('*', cors());
app.use('*', logger(console.log));

// Google Drive OAuth configuration
const GOOGLE_CLIENT_ID = Deno.env.get('GOOGLE_CLIENT_ID');
const GOOGLE_CLIENT_SECRET = Deno.env.get('GOOGLE_CLIENT_SECRET');
const REDIRECT_URI = Deno.env.get('GOOGLE_REDIRECT_URI') || 'http://localhost:3000/auth/callback';

// Initialize Supabase client
function getSupabaseClient() {
  return createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );
}

// Store Google Drive image selection
app.post('/make-server-2c6a0ca3/drive/save-images', async (c) => {
  try {
    const { userId, orderId, images } = await c.req.json();
    
    if (!userId || !orderId || !images) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    const supabase = getSupabaseClient();
    const { data: kvData } = await supabase
      .from('kv_store_2c6a0ca3')
      .select('value')
      .eq('key', `order_images_${orderId}`)
      .single();

    const imageData = {
      userId,
      orderId,
      images,
      timestamp: new Date().toISOString()
    };

    if (kvData) {
      await supabase
        .from('kv_store_2c6a0ca3')
        .update({ value: imageData })
        .eq('key', `order_images_${orderId}`);
    } else {
      await supabase
        .from('kv_store_2c6a0ca3')
        .insert({ key: `order_images_${orderId}`, value: imageData });
    }

    return c.json({ success: true, data: imageData });
  } catch (error) {
    console.error('Error saving images:', error);
    return c.json({ error: 'Failed to save images', details: error.message }, 500);
  }
});

// Get saved images for an order
app.get('/make-server-2c6a0ca3/drive/get-images/:orderId', async (c) => {
  try {
    const orderId = c.req.param('orderId');
    
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('kv_store_2c6a0ca3')
      .select('value')
      .eq('key', `order_images_${orderId}`)
      .single();

    if (error || !data) {
      return c.json({ images: [] });
    }

    return c.json({ success: true, data: data.value });
  } catch (error) {
    console.error('Error fetching images:', error);
    return c.json({ error: 'Failed to fetch images', details: error.message }, 500);
  }
});

// Gallery Management Routes

// Create or update gallery
app.post('/make-server-2c6a0ca3/galleries', async (c) => {
  try {
    const galleryData = await c.req.json();
    
    if (!galleryData.id || !galleryData.name) {
      return c.json({ error: 'Gallery ID and name are required' }, 400);
    }

    const supabase = getSupabaseClient();
    await supabase
      .from('kv_store_2c6a0ca3')
      .upsert({ key: `gallery_${galleryData.id}`, value: galleryData });

    return c.json({ success: true, gallery: galleryData });
  } catch (error) {
    console.error('Error creating/updating gallery:', error);
    return c.json({ error: 'Failed to save gallery', details: error.message }, 500);
  }
});

// Update gallery (same as create with upsert)
app.put('/make-server-2c6a0ca3/galleries', async (c) => {
  try {
    const galleryData = await c.req.json();
    
    if (!galleryData.id || !galleryData.name) {
      return c.json({ error: 'Gallery ID and name are required' }, 400);
    }

    const supabase = getSupabaseClient();
    await supabase
      .from('kv_store_2c6a0ca3')
      .upsert({ key: `gallery_${galleryData.id}`, value: galleryData });

    return c.json({ success: true, gallery: galleryData });
  } catch (error) {
    console.error('Error updating gallery:', error);
    return c.json({ error: 'Failed to update gallery', details: error.message }, 500);
  }
});

// Get all galleries
app.get('/make-server-2c6a0ca3/galleries', async (c) => {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('kv_store_2c6a0ca3')
      .select('*')
      .like('key', 'gallery_%');

    if (error) {
      throw error;
    }

    const galleries = data?.map(item => item.value) || [];
    return c.json({ success: true, galleries });
  } catch (error) {
    console.error('Error fetching galleries:', error);
    return c.json({ error: 'Failed to fetch galleries', details: error.message }, 500);
  }
});

// Get single gallery
app.get('/make-server-2c6a0ca3/galleries/:galleryId', async (c) => {
  try {
    const galleryId = c.req.param('galleryId');
    
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('kv_store_2c6a0ca3')
      .select('value')
      .eq('key', `gallery_${galleryId}`)
      .single();

    if (error || !data) {
      return c.json({ error: 'Gallery not found' }, 404);
    }

    return c.json({ success: true, gallery: data.value });
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return c.json({ error: 'Failed to fetch gallery', details: error.message }, 500);
  }
});

// Delete gallery
app.delete('/make-server-2c6a0ca3/galleries/:galleryId', async (c) => {
  try {
    const galleryId = c.req.param('galleryId');
    
    const supabase = getSupabaseClient();
    await supabase
      .from('kv_store_2c6a0ca3')
      .delete()
      .eq('key', `gallery_${galleryId}`);

    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting gallery:', error);
    return c.json({ error: 'Failed to delete gallery', details: error.message }, 500);
  }
});

// Save order with images
app.post('/make-server-2c6a0ca3/orders', async (c) => {
  try {
    const orderData = await c.req.json();
    
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const order = {
      ...orderData,
      orderId,
      createdAt: new Date().toISOString()
    };

    const supabase = getSupabaseClient();
    await supabase
      .from('kv_store_2c6a0ca3')
      .insert({ key: orderId, value: order });

    return c.json({ success: true, orderId, order });
  } catch (error) {
    console.error('Error creating order:', error);
    return c.json({ error: 'Failed to create order', details: error.message }, 500);
  }
});

// Get all orders
app.get('/make-server-2c6a0ca3/orders', async (c) => {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('kv_store_2c6a0ca3')
      .select('*')
      .like('key', 'order_%');

    if (error) {
      throw error;
    }

    const orders = data?.map(item => item.value) || [];
    return c.json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return c.json({ error: 'Failed to fetch orders', details: error.message }, 500);
  }
});

// Health check
app.get('/make-server-2c6a0ca3/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

Deno.serve(app.fetch);