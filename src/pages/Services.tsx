import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { services } from '../data/services';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const imageMap: Record<string, string> = {
  'product-labels': 'https://images.unsplash.com/photo-1700893417216-964c63854eda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwbGFiZWxzfGVufDF8fHx8MTc2MzAxOTc0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'concert-poster': 'https://images.unsplash.com/photo-1582091652153-eb8f55ff7cd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwcG9zdGVyfGVufDF8fHx8MTc2MzAxOTc0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'marketing-flyer': 'https://images.unsplash.com/photo-1717994818193-266ff93e3396?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjBmbHllcnxlbnwxfHx8fDE3NjI5MzAxODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'business-marketing': 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1hcmtldGluZ3xlbnwxfHx8fDE3NjI5NjU5ODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'professional-business': 'https://images.unsplash.com/photo-1425421669292-0c3da3b8f529?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzc3xlbnwxfHx8fDE3NjI5MDYxODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'product-packaging': 'https://images.unsplash.com/photo-1603712521905-3c68898026f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwcGFja2FnaW5nfGVufDF8fHx8MTc2MzAxOTc1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'creative-design': 'https://images.unsplash.com/photo-1611241893603-3c359704e0ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGRlc2lnbnxlbnwxfHx8fDE3NjI5NjM0NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'office-workspace': 'https://images.unsplash.com/photo-1462826303086-329426d1aef5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzYyOTU5NDE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'business-signage': 'https://images.unsplash.com/photo-1762787863004-767d5d7eac07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHNpZ25hZ2V8ZW58MXx8fHwxNzYzMDE5NzUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'magazine-publication': 'https://images.unsplash.com/photo-1598113226787-55dbeaeed8e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWdhemluZSUyMHB1YmxpY2F0aW9ufGVufDF8fHx8MTc2MzAxOTc1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'trade-show': 'https://images.unsplash.com/photo-1560439514-4e9645039924?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkZSUyMHNob3d8ZW58MXx8fHwxNjMwMTk3NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'custom-apparel': 'https://images.unsplash.com/photo-1754072387911-6036c4d4e135?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b20lMjBhcHBhcmVsfGVufDF8fHx8MTc2MzAxOTc1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'desk-calendar': 'https://images.unsplash.com/photo-1542271484-f163235efa6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNrJTIwY2FsZW5kYXJ8ZW58MXx8fHwxNzYzMDE5NzUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'business-presentation': 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByZXNlbnRhdGlvbnxlbnwxfHx8fDE3NjI5MjMxOTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'restaurant-menu': 'https://images.unsplash.com/photo-1551489186-c892fa1428c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwbWVudXxlbnwxfHx8fDE3NjMwMTk3NTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'media-packaging': 'https://images.unsplash.com/photo-1658511629019-39e55d37515a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpYSUyMHBhY2thZ2luZ3xlbnwxfHx8fDE3NjMwMTk3NTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'promotional-products': 'https://images.unsplash.com/photo-1610824352934-c10d87b700cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9tb3Rpb25hbCUyMHByb2R1Y3RzfGVufDF8fHx8MTc2MzAxOTc1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
};

export function Services() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl mb-4">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive printing solutions for all your business and personal needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="aspect-video bg-gray-100 rounded-md mb-4 overflow-hidden">
                  <ImageWithFallback
                    src={imageMap[service.image] || imageMap['product-labels']}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle>{service.name}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <p className="text-sm">Starting from:</p>
                  <p className="text-2xl text-blue-600">{service.pricing[0].price}</p>
                </div>
                <Button asChild className="w-full">
                  <Link to={`/services/${service.id}`}>
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl md:text-3xl mb-4">
            Don't See What You're Looking For?
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            We offer custom printing solutions. Contact us to discuss your specific needs.
          </p>
          <Button size="lg" asChild>
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
