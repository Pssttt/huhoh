import LandingNavBar from '@/components/Landing/LandingNavBar'
import FooterSection from '@/components/Landing/FooterSection'

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <LandingNavBar />
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">
          Privacy Policy
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="mb-4 text-gray-700">
            At HuhOh, we take your privacy seriously. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your
            information when you use our service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
            1. Information We Collect
          </h2>
          <p className="mb-4 text-gray-700">
            We may collect personal information that you voluntarily provide to
            us when you register for our service, express interest in obtaining
            information about us or our products, or otherwise contact us. The
            personal information we collect may include names, email addresses,
            and other contact information.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
            2. How We Use Your Information
          </h2>
          <p className="mb-4 text-gray-700">
            We use the information we collect to provide, maintain, and improve
            our services, to develop new features, and to protect HuhOh and our
            users. We may also use the information for communication purposes,
            such as responding to your inquiries or providing updates about our
            service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
            3. Cookies and Tracking Technologies
          </h2>
          <p className="mb-4 text-gray-700">
            We may use cookies and similar tracking technologies to track
            activity on our service and hold certain information. Cookies are
            files with a small amount of data which may include an anonymous
            unique identifier.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
            4. Third-Party Services
          </h2>
          <p className="mb-4 text-gray-700">
            Our service may contain links to third-party websites or services
            that are not owned or controlled by HuhOh. We have no control over,
            and assume no responsibility for, the content, privacy policies, or
            practices of any third-party websites or services.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
            5. Data Security
          </h2>
          <p className="mb-4 text-gray-700">
            We use administrative, technical, and physical security measures to
            help protect your personal information. While we have taken
            reasonable steps to secure the personal information you provide to
            us, please be aware that no security measures are perfect or
            impenetrable.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
            6. Children's Privacy
          </h2>
          <p className="mb-4 text-gray-700">
            Our service is not intended for individuals under the age of 13. We
            do not knowingly collect personal information from children under
            13.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
            7. Changes to This Privacy Policy
          </h2>
          <p className="mb-4 text-gray-700">
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the "Last Updated" date.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
            8. Contact Us
          </h2>
          <p className="mb-4 text-gray-700">
            If you have any questions about this Privacy Policy, please contact
            us at privacy@huhoh.com.
          </p>
        </div>
      </div>
      <FooterSection />
    </div>
  )
}

export default PrivacyPage
