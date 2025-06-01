const FooterSection = () => {
  return (
    <footer className="px-6 lg:px-12 py-12 bg-gray-900">
      <div className="flex flex-col md:flex-row md:justify-around gap-6">
        <a
          href="/terms"
          className="w-32 text-gray-300 hover:text-white transition-colors duration-200"
        >
          Terms of Service
        </a>
        <a
          href="/privacy"
          className="w-32 text-gray-300 hover:text-white transition-colors duration-200"
        >
          Privacy Policy
        </a>
        <a
          href="/contact"
          className="w-32 text-gray-300 hover:text-white transition-colors duration-200"
        >
          Contact Us
        </a>
      </div>

      <div className="border-t border-gray-800 pt-8">
        <p className="text-center text-gray-400">
          © 2025 HuhOh. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default FooterSection
