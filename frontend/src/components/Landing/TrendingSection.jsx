const TrendingSection = () => {
  const words = [
    { word: 'Rizz', trending: true },
    { word: 'Cap', trending: false },
    { word: 'Sus', trending: false },
  ]

  return (
    <section className="px-6 lg:px-12 py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
          Daily Trending Slang
        </h2>
        <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
          {words.map((item) => (
            <div
              key={item.word}
              className={`relative px-8 py-6 rounded-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-800`}
            >
              {item.trending && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-yellow-900">#</span>
                </div>
              )}
              <span className="text-xl font-semibold">{item.word}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrendingSection
