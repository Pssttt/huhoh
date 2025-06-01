import LandingNavBar from '@/components/Landing/LandingNavBar'
import FooterSection from '@/components/Landing/FooterSection'

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <LandingNavBar />
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">
          Terms of Service
        </h1>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
            1. Acceptance of Terms
          </h2>
          <p className="mb-4 text-gray-700">
            By accessing or using HuhOh's services, you agree to be bound by
            these Terms of Service. If you do not agree to these terms, please
            do not use our services.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
            2. Description of Service
          </h2>
          <p className="mb-4 text-gray-700">
            HuhOh provides a platform for translating and understanding slang
            terms and expressions. Our service is designed to help users decode
            modern language and communicate more effectively.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
            3. User Accounts
          </h2>
          <p className="mb-4 text-gray-700">
            Some features of our service require you to create an account. You
            are responsible for maintaining the confidentiality of your account
            information and for all activities that occur under your account.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
            4. User Content
          </h2>
          <p className="mb-4 text-gray-700">
            Users may submit content to our platform. By submitting content, you
            grant HuhOh a worldwide, non-exclusive, royalty-free license to use,
            reproduce, modify, and display such content in connection with our
            services.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
            5. Prohibited Conduct
          </h2>
          <p className="mb-4 text-gray-700">
            Users may not use our service for any illegal or unauthorized
            purpose. Users agree not to violate any laws or regulations when
            using our service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
            6. Termination
          </h2>
          <p className="mb-4 text-gray-700">
            HuhOh reserves the right to terminate or suspend access to our
            service immediately, without prior notice or liability, for any
            reason whatsoever, including without limitation if you breach the
            Terms.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
            7. Changes to Terms
          </h2>
          <p className="mb-4 text-gray-700">
            We reserve the right to modify or replace these Terms at any time.
            It is your responsibility to check our Terms periodically for
            changes.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
            8. Contact Us
          </h2>
          <p className="mb-4 text-gray-700">
            If you have any questions about these Terms, please contact us at
            support@huhoh.com.
          </p>
        </div>
      </div>
      <FooterSection />
    </div>
  )
}

export default TermsPage
