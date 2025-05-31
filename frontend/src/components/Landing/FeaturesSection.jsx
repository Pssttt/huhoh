const FeaturesSection = () => {
  const features = [
    {
      icon: '/icons/translate.svg',
      title: 'Slang to English Translation',
      description:
        'Instantly translate Gen Z slang into standard English for clear understanding.',
    },
    {
      icon: '/icons/world.svg',
      title: 'English to Slang Translation',
      description:
        'Convert standard English phrases into the latest Gen Z slang to fit right in.',
    },
    {
      icon: '/icons/dictionary.svg',
      title: 'Searchable Slang Dictionary',
      description: 'Comprehensive database with definitions and examples',
    },
  ]

  return (
    <section className="px-6 lg:px-12 py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
            How it Works
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Decode the Language of{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Gen Z
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our platform offers a comprehensive solution for understanding and
            using Gen Z slang effectively. Whether you're a parent, educator, or
            just curious, we've got you covered.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <img src={feature.icon} alt="" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
