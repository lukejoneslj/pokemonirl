import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  return (
    <div className="min-h-screen relative bg-white text-gray-800 overflow-hidden">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-red-600 to-blue-700 text-white">
        {/* Decorative Pokeballs */}
        <div className="absolute top-10 right-10 opacity-20 w-40 h-40 rounded-full bg-white border-8 border-red-600 before:content-[''] before:absolute before:top-1/2 before:left-0 before:w-full before:h-4 before:bg-red-600 before:-translate-y-1/2 after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:w-12 after:h-12 after:bg-white after:rounded-full after:border-4 after:border-red-600 after:-translate-x-1/2 after:-translate-y-1/2" />
        <div className="absolute bottom-20 left-10 opacity-20 w-28 h-28 rounded-full bg-white border-8 border-red-600 before:content-[''] before:absolute before:top-1/2 before:left-0 before:w-full before:h-3 before:bg-red-600 before:-translate-y-1/2 after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:w-8 after:h-8 after:bg-white after:rounded-full after:border-4 after:border-red-600 after:-translate-x-1/2 after:-translate-y-1/2" />
        
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[length:20px_20px]" />
        </div>
        
        <div className="container mx-auto px-4 pt-24 pb-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <Badge className="px-3 py-1 text-sm bg-yellow-400 text-gray-900 hover:bg-yellow-400 rounded-xl">Beta Version</Badge>
            
            <div className="relative">
              <h1 className="text-5xl md:text-7xl font-extrabold">
                <span className="text-yellow-300 drop-shadow-lg">PokemonIRL</span>
              </h1>
              <p className="text-2xl md:text-3xl mt-4 font-medium text-white drop-shadow">
                Collect Real-Life Gym Badges
              </p>
              <p className="text-lg text-blue-100 mt-2">
                Transform yourself like a Pokémon evolving
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <Button
                asChild
                size="lg"
                className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-bold text-lg px-8 py-6 rounded-xl shadow-lg transition-transform hover:scale-105 relative overflow-hidden group"
              >
                <Link href="/auth">
                  <span className="relative z-10">Start Your Journey</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </Button>
              
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20 font-medium text-lg px-8 py-6 rounded-xl shadow-lg transition-transform hover:scale-105"
              >
                <Link href="#badges">View Badges</Link>
              </Button>
            </div>
            
            {/* Floating Pokemons */}
            <div className="hidden md:block absolute top-20 right-10 animate-float-slow">
              <div className="w-16 h-16 bg-blue-500 rounded-full opacity-50" />
            </div>
            <div className="hidden md:block absolute bottom-20 left-20 animate-float-medium">
              <div className="w-12 h-12 bg-red-500 rounded-full opacity-50" />
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="relative h-24">
          <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 74" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0,0 C240,70 480,100 720,70 C960,40 1200,10 1440,50 L1440,120 L0,120 Z" fill="#f8fafc" />
          </svg>
        </div>
      </div>
      
      {/* Badges Section */}
      <div id="badges" className="bg-slate-50 text-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">8 Gym Badges for Personal Evolution</h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">Just like in the Pokémon world, collect these badges to mark your progress toward becoming your ultimate self</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { name: 'Stillness', color: 'bg-blue-500', icon: '🧘‍♂️', desc: 'Inner calm through mindfulness and prayer' },
                { name: 'Charity', color: 'bg-red-500', icon: '❤️', desc: 'Selfless acts of kindness' },
                { name: 'Virtue', color: 'bg-yellow-500', icon: '⭐', desc: 'Daily practice of moral character' },
                { name: 'Courage', color: 'bg-amber-500', icon: '🦁', desc: 'Face fears, stand for truth' },
                { name: 'Discipline', color: 'bg-orange-500', icon: '⏰', desc: 'Build self-control through habits' },
                { name: 'Gratitude', color: 'bg-green-500', icon: '🙏', desc: 'Cultivate a thankful heart' },
                { name: 'Purpose', color: 'bg-indigo-500', icon: '🌱', desc: 'Discover your unique mission' },
                { name: 'Light', color: 'bg-gray-800', icon: '💡', desc: 'Become your best self' }
              ].map((badge, index) => (
                <div key={`badge-${badge.name}`} className="bg-white rounded-xl shadow-lg p-4 text-center transform transition-transform hover:scale-105 hover:shadow-xl relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <div className={`w-14 h-14 md:w-20 md:h-20 mx-auto transform rotate-45 ${badge.color} flex items-center justify-center text-3xl mb-3 rounded-sm group-hover:scale-110 transition-transform`}>
                      <span className="-rotate-45">{badge.icon}</span>
                    </div>
                    <h3 className="font-bold text-lg">{badge.name} Badge</h3>
                    <p className="text-sm text-gray-600 mt-1">{badge.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <Button
                asChild
                size="lg"
                className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-bold text-lg px-8 py-6 rounded-xl shadow-lg transition-transform hover:scale-105"
              >
                <Link href="/auth">Begin Your Journey</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* App Preview Section */}
      <div className="py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="relative rounded-2xl border-8 border-gray-800 shadow-2xl mx-auto max-w-[300px] h-[600px] bg-blue-600 overflow-hidden">
                  {/* Phone Content */}
                  <div className="relative h-full bg-white overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-red-600 to-red-500 p-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-white border border-red-600 flex items-center justify-center relative">
                          <div className="absolute w-full h-1 bg-red-600 top-1/2 -translate-y-1/2" />
                          <div className="absolute w-2 h-2 rounded-full bg-white border border-red-600 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        </div>
                        <span className="text-white font-bold">PokemonIRL</span>
                      </div>
                      <div className="text-white text-xs">1:30 PM</div>
                    </div>
                    
                    {/* App Content */}
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-4">Your Badge Progress</h3>
                      
                      {/* Progress Cards */}
                      {[
                        { name: 'Stillness', progress: 75, color: 'bg-blue-500' },
                        { name: 'Charity', progress: 45, color: 'bg-red-500' },
                        { name: 'Discipline', progress: 30, color: 'bg-orange-500' }
                      ].map((badge, i) => (
                        <div key={`app-badge-${i}`} className="mb-4 bg-gray-50 p-3 rounded-lg shadow-sm">
                          <div className="flex justify-between mb-1">
                            <span className="font-medium text-sm">{badge.name} Badge</span>
                            <span className="text-xs text-gray-500">{badge.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 h-2 rounded-full">
                            <div className={`h-full rounded-full ${badge.color}`} style={{ width: `${badge.progress}%` }} />
                          </div>
                        </div>
                      ))}
                      
                      <h3 className="font-bold text-lg mt-6 mb-4">Today's Challenges</h3>
                      
                      {/* Daily Challenges */}
                      {[
                        { name: 'Morning Meditation', badge: 'Stillness', completed: true },
                        { name: 'Help Someone Today', badge: 'Charity', completed: false },
                        { name: 'Evening Reflection', badge: 'Discipline', completed: false }
                      ].map((challenge, i) => (
                        <div key={`challenge-${i}`} className="mb-3 flex items-center gap-3 bg-gray-50 p-3 rounded-lg shadow-sm">
                          <div className={`w-5 h-5 rounded-full border ${challenge.completed ? 'bg-green-500 border-green-600' : 'bg-white border-gray-300'} flex items-center justify-center`}>
                            {challenge.completed && (
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-sm">{challenge.name}</div>
                            <div className="text-xs text-gray-500">{challenge.badge} Badge</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="order-1 md:order-2">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Take Your Journey Anywhere</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Your evolution continues wherever you go. Track your progress, complete daily challenges, and earn badges on your mobile device.
                </p>
                
                <ul className="space-y-4 mb-8">
                  {[
                    'Daily challenges tailored to your goals',
                    'Track badge progress in real-time',
                    'Receive motivational notifications',
                    'Connect with other trainers'
                  ].map((feature, i) => (
                    <li key={`feature-${i}`} className="flex items-start gap-3">
                      <div className="mt-1 w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex flex-wrap gap-4">
                  <Button
                    asChild
                    className="bg-gray-900 text-white hover:bg-gray-800 font-medium px-6 py-3 rounded-xl"
                  >
                    <Link href="/auth">Get Started</Link>
                  </Button>
                  
                  <Button
                    asChild
                    variant="outline"
                    className="border-gray-900 text-gray-900 hover:bg-gray-100 font-medium px-6 py-3 rounded-xl"
                  >
                    <Link href="#features">Learn More</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* How It Works Section */}
      <div id="features" className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How PokemonIRL Works</h2>
            <p className="text-lg mb-12 text-blue-100">Our unique system helps you grow and evolve in real life</p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-md relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full" />
                <div className="w-16 h-16 mx-auto rounded-full bg-yellow-400 text-gray-900 flex items-center justify-center text-2xl font-bold mb-4 group-hover:scale-110 transition-transform">1</div>
                <h3 className="text-xl font-bold mb-2">Choose Your Path</h3>
                <p>Select which gym badges you want to pursue first based on your personal goals</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-md relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full" />
                <div className="w-16 h-16 mx-auto rounded-full bg-yellow-400 text-gray-900 flex items-center justify-center text-2xl font-bold mb-4 group-hover:scale-110 transition-transform">2</div>
                <h3 className="text-xl font-bold mb-2">Complete Challenges</h3>
                <p>Practice daily habits and complete real-world challenges to level up</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-md relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full" />
                <div className="w-16 h-16 mx-auto rounded-full bg-yellow-400 text-gray-900 flex items-center justify-center text-2xl font-bold mb-4 group-hover:scale-110 transition-transform">3</div>
                <h3 className="text-xl font-bold mb-2">Earn Badges</h3>
                <p>Master each area of personal growth and collect all 8 badges</p>
              </div>
            </div>
            
            <div className="mt-12">
              <Button
                asChild
                size="lg"
                className="bg-white text-blue-700 hover:bg-gray-100 font-bold text-lg px-8 py-6 rounded-xl shadow-lg transition-transform hover:scale-105"
              >
                <Link href="/auth">Start Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Trainer Testimonials</h2>
            <p className="text-center text-gray-600 mb-12">See what others have achieved on their journey</p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { id: 'ash', name: 'Ash K.', role: 'Courage Badge Holder', quote: 'This journey has given me the strength to face my biggest fears and grow stronger every day.' },
                { id: 'misty', name: 'Misty W.', role: 'Discipline Badge Holder', quote: 'I\'ve developed consistent habits that have completely transformed my productivity and focus.' },
                { id: 'brock', name: 'Brock S.', role: 'Charity Badge Holder', quote: 'Learning to serve others selflessly has brought more joy to my life than I could have imagined.' }
              ].map((testimonial) => (
                <div key={testimonial.id} className="bg-slate-50 p-6 rounded-xl shadow-sm relative group hover:shadow-md transition-shadow">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold text-xl">
                      {testimonial.name[0]}
                    </div>
                    <div className="ml-3">
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600">"{testimonial.quote}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Feature Comparison */}
      <div className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Why Choose PokemonIRL</h2>
            <p className="text-center text-gray-600 mb-12">The ultimate platform for personal growth</p>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="p-3 text-left">Features</th>
                    <th className="p-3 text-center bg-blue-50 rounded-tl-lg">
                      <div className="font-bold text-lg">PokemonIRL</div>
                      <div className="text-sm text-gray-500">Ultimate Growth</div>
                    </th>
                    <th className="p-3 text-center">
                      <div className="font-bold">Regular Habits App</div>
                      <div className="text-sm text-gray-500">Basic Tracking</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 'gamified', feature: 'Gamified Experience', pokemonirl: true, regular: false },
                    { id: 'structured', feature: 'Structured Growth Path', pokemonirl: true, regular: false },
                    { id: 'development', feature: 'Deep Personal Development', pokemonirl: true, regular: false },
                    { id: 'achievement', feature: 'Achievement Recognition', pokemonirl: true, regular: true },
                    { id: 'community', feature: 'Community Support', pokemonirl: true, regular: false }
                  ].map((item) => (
                    <tr key={item.id} className="border-b border-gray-200">
                      <td className="p-3 font-medium">{item.feature}</td>
                      <td className="p-3 text-center bg-blue-50">
                        {item.pokemonirl ? (
                          <span className="text-green-500 text-xl">✓</span>
                        ) : (
                          <span className="text-red-500 text-xl">✗</span>
                        )}
                      </td>
                      <td className="p-3 text-center">
                        {item.regular ? (
                          <span className="text-green-500 text-xl">✓</span>
                        ) : (
                          <span className="text-red-500 text-xl">✗</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Frequently Asked Questions</h2>
            <p className="text-center text-gray-600 mb-12">Everything you need to know about your journey</p>
            
            <div className="space-y-6">
              {[
                { 
                  question: 'What makes PokemonIRL different from other habit trackers?',
                  answer: 'PokemonIRL combines the addictive collection mechanics of Pokémon with genuine personal development. Instead of just tracking habits, you follow a structured path to personal growth through gym badges that represent different virtues and skills.'
                },
                { 
                  question: 'Do I need to be familiar with Pokémon to use this app?',
                  answer: 'Not at all! While the app is inspired by Pokémon\'s gym badge system, you don\'t need any prior knowledge of Pokémon to benefit from the platform. We explain everything you need to know to get started.'
                },
                { 
                  question: 'How long does it take to earn a badge?',
                  answer: 'Badge completion time varies based on the badge type and your commitment level. Most users can earn their first badge within 3-4 weeks of consistent effort, while mastering all 8 badges is a journey that typically takes 6-12 months.'
                },
                { 
                  question: 'Can I work on multiple badges at once?',
                  answer: 'Yes! You can work on up to three badges simultaneously. However, we recommend focusing on one badge at a time when you first start to build momentum and see tangible results faster.'
                },
                { 
                  question: 'Is there a community aspect to PokemonIRL?',
                  answer: 'Absolutely! You can connect with other trainers, share your progress, and even participate in group challenges. Our community is supportive and focused on helping everyone evolve together.'
                }
              ].map((faq, i) => (
                <div key={`faq-${i}`} className="bg-slate-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Newsletter Section */}
      <div className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Join the Trainer Community</h2>
            <p className="text-gray-600 mb-8">Get tips, updates, and exclusive content to help your evolution journey</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow max-w-md"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl">
                Subscribe
              </Button>
            </div>
            
            <p className="text-sm text-gray-500 mt-4">We respect your privacy and will never share your information.</p>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-br from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="relative">
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full bg-white border-8 border-red-600 before:content-[''] before:absolute before:top-1/2 before:left-0 before:w-full before:h-4 before:bg-red-600 before:-translate-y-1/2 after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:w-8 after:h-8 after:bg-white after:rounded-full after:border-4 after:border-red-600 after:-translate-x-1/2 after:-translate-y-1/2" />
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mt-12 mb-4">Ready to Begin Your Evolution?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of trainers who are becoming their best selves through the PokemonIRL journey.</p>
            
            <Button
              asChild
              size="lg"
              className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-bold text-lg px-10 py-6 rounded-xl shadow-lg transition-transform hover:scale-105"
            >
              <Link href="/auth">Start Your Journey Today</Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-full bg-white border-2 border-red-600 flex items-center justify-center relative">
                <div className="absolute w-full h-1.5 bg-red-600 top-1/2 -translate-y-1/2" />
                <div className="absolute w-3 h-3 rounded-full bg-white border-2 border-red-600 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <span className="font-bold text-lg">PokemonIRL</span>
            </div>
            
            <div className="text-sm text-gray-400">
              © 2024 PokemonIRL. All rights reserved.
            </div>
            
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="/terms" className="text-gray-400 hover:text-white">Terms</a>
              <a href="/privacy" className="text-gray-400 hover:text-white">Privacy</a>
              <a href="/contact" className="text-gray-400 hover:text-white">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
