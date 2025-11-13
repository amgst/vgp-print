import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { services } from '../data/services';
import { ArrowRight, CheckCircle2, Clock, Award, Users } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function Home() {
  const featuredServices = services.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6">
                Professional Printing Services
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                High-quality printing solutions for businesses of all sizes. From business cards to large format printing, we've got you covered.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild variant="secondary">
                  <Link to="/services">
                    Browse Services
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
                  <Link to="/contact">Get a Quote</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1503694978374-8a2fa686963a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmludGluZyUyMGJ1c2luZXNzfGVufDF8fHx8MTc2MzAxOTc1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Printing Services"
                className="rounded-lg shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="mb-2">Fast Turnaround</h3>
              <p className="text-gray-600">Quick production times without compromising quality</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="mb-2">Premium Quality</h3>
              <p className="text-gray-600">State-of-the-art printing technology and materials</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="mb-2">Expert Support</h3>
              <p className="text-gray-600">Dedicated team to help with your printing needs</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="mb-2">Satisfaction Guarantee</h3>
              <p className="text-gray-600">100% satisfaction or we'll make it right</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Our Popular Services</h2>
            <p className="text-xl text-gray-600">
              Professional printing solutions for every need
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredServices.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="aspect-video bg-gray-100 rounded-md mb-4 overflow-hidden">
                    <ImageWithFallback
                      src={`https://images.unsplash.com/photo-${service.image}`}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle>{service.name}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={`/services/${service.id}`}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" asChild>
              <Link to="/services">
                View All Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Get a free quote today and experience professional printing services
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/contact">Request a Quote</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
