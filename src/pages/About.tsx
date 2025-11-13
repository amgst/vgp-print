import { Card, CardContent } from '../components/ui/card';
import { Users, Target, Award, Heart } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function About() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl mb-6">About PrintPro Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted partner in professional printing solutions since 2010
          </p>
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                PrintPro Services was founded with a simple mission: to provide businesses and individuals with the highest quality printing services at competitive prices. What started as a small local print shop has grown into a full-service printing company serving thousands of satisfied customers.
              </p>
              <p>
                Over the years, we've invested in state-of-the-art printing technology and built a team of skilled professionals who are passionate about delivering exceptional results. From small business cards to large-format banners, we treat every project with the same level of care and attention to detail.
              </p>
              <p>
                Today, we're proud to be a leading printing service provider, known for our quality, reliability, and customer-first approach. We continue to evolve with the industry, embracing new technologies and sustainable practices while maintaining the personal touch that our customers appreciate.
              </p>
            </div>
          </div>
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1503694978374-8a2fa686963a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmludGluZyUyMGJ1c2luZXNzfGVufDF8fHx8MTc2MzAxOTc1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Our printing facility"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl text-center mb-12">Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="text-xl mb-2">Quality First</h3>
                <p className="text-gray-600">
                  We never compromise on quality. Every print job meets our rigorous standards.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl mb-2">Customer Focus</h3>
                <p className="text-gray-600">
                  Your satisfaction is our priority. We go above and beyond for every client.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                  <Target className="h-8 w-8" />
                </div>
                <h3 className="text-xl mb-2">Innovation</h3>
                <p className="text-gray-600">
                  We stay ahead with the latest printing technology and techniques.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                  <Heart className="h-8 w-8" />
                </div>
                <h3 className="text-xl mb-2">Sustainability</h3>
                <p className="text-gray-600">
                  We're committed to eco-friendly practices and sustainable materials.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-blue-600 text-white rounded-lg p-12 mb-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl mb-2">15+</div>
              <div className="text-blue-100">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl mb-2">50K+</div>
              <div className="text-blue-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl mb-2">1M+</div>
              <div className="text-blue-100">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl mb-2">99%</div>
              <div className="text-blue-100">Satisfaction Rate</div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="text-3xl mb-6">Why Choose Us?</h2>
          <div className="max-w-3xl mx-auto space-y-4 text-gray-700">
            <p>
              At PrintPro Services, we understand that your printed materials represent your brand. That's why we're committed to delivering exceptional quality on every job, whether it's a small order of business cards or a large-scale marketing campaign.
            </p>
            <p>
              Our experienced team combines technical expertise with creative problem-solving to ensure your vision becomes reality. We use only premium materials and the latest printing technology to produce results that exceed expectations.
            </p>
            <p>
              With competitive pricing, fast turnaround times, and a commitment to customer satisfaction, we've become the go-to printing partner for businesses across the region. Experience the PrintPro difference today.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
