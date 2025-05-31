import { Button } from '@/components/ui/button'
import { Input } from '../ui/input'
import { Search } from 'lucide-react'

const HeroSection = () => {
  return (
    <section className="px-6 lg:px-12 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <img src="/hero/hero-img.png" alt="" className="rounded-3xl" />

              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-purple-400 rounded-full opacity-60 animate-bounce"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-blue-400 rounded-full opacity-60 animate-bounce delay-300"></div>
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Where{' '}
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Gen Z speaks
                </span>
                , and{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Gen X finally gets it
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                Decode the latest slang and stay in the loop with the
                ever-evolving language of the youth.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-2 top-5 " />
                <Input
                  type="text"
                  placeholder="Enter slang or standard English"
                  className="w-full h-16 px-12 py-3 pr-12 rounded-lg border-0 bg-[#EDE8F2] focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Button className="w-36 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                    Decode Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
