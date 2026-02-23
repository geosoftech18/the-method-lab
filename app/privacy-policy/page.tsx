'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollAnimation from '@/components/ScrollAnimation'

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen">
      <ScrollProgress />
      <ScrollToTop />
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-ablr-primary via-ablr-primary/95 to-ablr-dark text-white py-16 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-ablr-secondary rounded-full blur-3xl"></div>
        </div>
        
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="label-small-caps text-white/80 mb-4 text-sm sm:text-base">Legal</p>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight">
              Privacy Policy
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Effective Date: 18.02.2026
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-spacing bg-white">
        <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <ScrollAnimation direction="up">
              <div className="prose prose-lg max-w-none">
                {/* Introduction */}
                <div className="mb-12 p-6 bg-gradient-to-br from-ablr-primary/5 via-ablr-terracotta/5 to-ablr-dark/5 rounded-xl border-l-4 border-ablr-primary">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The Method Lab ("TML," "we," "us," or "our") is committed to protecting your personal data 
                    and respecting your privacy.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    This Privacy Policy explains how we collect, use, process, store and protect personal 
                    information in accordance with the Information Technology Act, 2000, the IT (Reasonable 
                    Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 
                    2011, and the Digital Personal Data Protection Act, 2023 (India), as applicable.
                  </p>
                  <p className="text-gray-700 leading-relaxed font-semibold">
                    By using our website or services, you consent to this Privacy Policy.
                  </p>
                </div>

                {/* Information We Collect */}
                <div className="mb-12">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ablr-primary mb-6 pb-3 border-b-2 border-ablr-primary/20">
                    Information We Collect
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    We may collect the following types of information:
                  </p>
                  
                  <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200">
                    <h3 className="text-xl font-semibold text-ablr-primary mb-4">Personal Information</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>Full name</li>
                      <li>Email address</li>
                      <li>Phone number</li>
                      <li>Professional affiliation</li>
                      <li>Educational background</li>
                      <li>Billing and payment information</li>
                      <li>Institutional details</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h3 className="text-xl font-semibold text-ablr-primary mb-4">Sensitive Personal Data (if voluntarily provided)</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
                      <li>Professional licensure information</li>
                      <li>Case-related information shared in training contexts</li>
                      <li>Any data classified as sensitive under applicable Indian law</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed text-sm italic">
                      We do not intentionally collect sensitive personal data unless necessary for programme delivery.
                    </p>
                  </div>
                </div>

                {/* How We Collect Information */}
                <div className="mb-12">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ablr-primary mb-6 pb-3 border-b-2 border-ablr-primary/20">
                    How We Collect Information
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We collect information when you:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <p className="text-gray-700">Register for a programme</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <p className="text-gray-700">Fill out a contact form</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <p className="text-gray-700">Subscribe to communications</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <p className="text-gray-700">Enter into an institutional agreement</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <p className="text-gray-700">Participate in live sessions</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <p className="text-gray-700">Access self-paced modules</p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    We may also collect limited technical information through cookies and analytics tools.
                  </p>
                </div>

                {/* Purpose of Data Processing */}
                <div className="mb-12">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ablr-primary mb-6 pb-3 border-b-2 border-ablr-primary/20">
                    Purpose of Data Processing
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We use personal information for:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-ablr-primary mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">Programme registration and delivery</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-ablr-primary mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">Communication regarding training</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-ablr-primary mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">Payment processing and invoicing</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-ablr-primary mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">Issuing certificates</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-ablr-primary mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">Institutional coordination</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-ablr-primary mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">Improving our services</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-ablr-primary mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">Legal and regulatory compliance</p>
                    </div>
                  </div>
                  <div className="bg-ablr-primary/5 rounded-lg p-4 border border-ablr-primary/20">
                    <p className="text-gray-700 leading-relaxed font-semibold">
                      We do not sell or rent personal data to third parties.
                    </p>
                  </div>
                </div>

                {/* Data Sharing */}
                <div className="mb-12">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ablr-primary mb-6 pb-3 border-b-2 border-ablr-primary/20">
                    Data Sharing
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We may share information only with:
                  </p>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-4">
                      <div className="w-2 h-2 rounded-full bg-ablr-primary flex-shrink-0"></div>
                      <p className="text-gray-700">Payment processors</p>
                    </div>
                    <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-4">
                      <div className="w-2 h-2 rounded-full bg-ablr-primary flex-shrink-0"></div>
                      <p className="text-gray-700">IT service providers</p>
                    </div>
                    <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-4">
                      <div className="w-2 h-2 rounded-full bg-ablr-primary flex-shrink-0"></div>
                      <p className="text-gray-700">Learning management platforms</p>
                    </div>
                    <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-4">
                      <div className="w-2 h-2 rounded-full bg-ablr-primary flex-shrink-0"></div>
                      <p className="text-gray-700">Faculty involved in programme delivery</p>
                    </div>
                    <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-4">
                      <div className="w-2 h-2 rounded-full bg-ablr-primary flex-shrink-0"></div>
                      <p className="text-gray-700">Legal or regulatory authorities (if required by law)</p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    All service providers are required to maintain confidentiality and data protection standards.
                  </p>
                </div>

                {/* Data Storage & Security */}
                <div className="mb-12">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ablr-primary mb-6 pb-3 border-b-2 border-ablr-primary/20">
                    Data Storage & Security
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We implement reasonable security practices in accordance with Indian law, including:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-ablr-primary/5 to-transparent rounded-lg p-5 border border-ablr-primary/20">
                      <p className="text-gray-700 font-semibold">Secure hosting environments</p>
                    </div>
                    <div className="bg-gradient-to-br from-ablr-primary/5 to-transparent rounded-lg p-5 border border-ablr-primary/20">
                      <p className="text-gray-700 font-semibold">Restricted administrative access</p>
                    </div>
                    <div className="bg-gradient-to-br from-ablr-primary/5 to-transparent rounded-lg p-5 border border-ablr-primary/20">
                      <p className="text-gray-700 font-semibold">Password protection</p>
                    </div>
                    <div className="bg-gradient-to-br from-ablr-primary/5 to-transparent rounded-lg p-5 border border-ablr-primary/20">
                      <p className="text-gray-700 font-semibold">Encryption where applicable</p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed italic">
                    While we take reasonable steps to protect data, no system is completely secure.
                  </p>
                </div>

                {/* Data Retention */}
                <div className="mb-12">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ablr-primary mb-6 pb-3 border-b-2 border-ablr-primary/20">
                    Data Retention
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We retain personal information only as long as necessary for:
                  </p>
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-ablr-primary flex-shrink-0"></div>
                        <p className="text-gray-700">Programme completion</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-ablr-primary flex-shrink-0"></div>
                        <p className="text-gray-700">Certification records</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-ablr-primary flex-shrink-0"></div>
                        <p className="text-gray-700">Institutional reporting</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-ablr-primary flex-shrink-0"></div>
                        <p className="text-gray-700">Legal compliance</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Data may be securely deleted upon request unless retention is required by law.
                  </p>
                </div>

                {/* Your Rights */}
                <div className="mb-12">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ablr-primary mb-6 pb-3 border-b-2 border-ablr-primary/20">
                    Your Rights (Under Indian Law)
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Subject to applicable laws, you may:
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3 bg-white border-l-4 border-ablr-primary rounded-lg p-4">
                      <div className="w-2 h-2 rounded-full bg-ablr-primary mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">Request access to your personal data</p>
                    </div>
                    <div className="flex items-start gap-3 bg-white border-l-4 border-ablr-primary rounded-lg p-4">
                      <div className="w-2 h-2 rounded-full bg-ablr-primary mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">Request correction of inaccurate information</p>
                    </div>
                    <div className="flex items-start gap-3 bg-white border-l-4 border-ablr-primary rounded-lg p-4">
                      <div className="w-2 h-2 rounded-full bg-ablr-primary mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">Request deletion of your data</p>
                    </div>
                    <div className="flex items-start gap-3 bg-white border-l-4 border-ablr-primary rounded-lg p-4">
                      <div className="w-2 h-2 rounded-full bg-ablr-primary mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">Withdraw consent (where applicable)</p>
                    </div>
                    <div className="flex items-start gap-3 bg-white border-l-4 border-ablr-primary rounded-lg p-4">
                      <div className="w-2 h-2 rounded-full bg-ablr-primary mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">Request grievance redressal</p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Requests may be sent to the contact details below.
                  </p>
                </div>

                {/* Cookies & Analytics */}
                <div className="mb-12">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ablr-primary mb-6 pb-3 border-b-2 border-ablr-primary/20">
                    Cookies & Analytics
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our website may use cookies and analytics tools to:
                  </p>
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-ablr-primary flex-shrink-0"></div>
                        <p className="text-gray-700">Improve website functionality</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-ablr-primary flex-shrink-0"></div>
                        <p className="text-gray-700">Analyse user behaviour</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-ablr-primary flex-shrink-0"></div>
                        <p className="text-gray-700">Enhance user experience</p>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed mt-4 pt-4 border-t border-gray-200">
                      You may disable cookies through your browser settings.
                    </p>
                  </div>
                </div>

                {/* Recording of Sessions */}
                <div className="mb-12">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ablr-primary mb-6 pb-3 border-b-2 border-ablr-primary/20">
                    Recording of Sessions
                  </h2>
                  <div className="bg-ablr-primary/5 rounded-xl p-6 border border-ablr-primary/20">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Live sessions may be recorded for educational and archival purposes.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Participants will be informed in advance, and participation constitutes consent unless 
                      otherwise specified.
                    </p>
                  </div>
                </div>

                {/* International Users */}
                <div className="mb-12">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ablr-primary mb-6 pb-3 border-b-2 border-ablr-primary/20">
                    International Users
                  </h2>
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      As a global platform based in India, your data may be processed in India or other 
                      jurisdictions where our service providers operate.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      By using our services, you consent to such data transfer where legally permitted.
                    </p>
                  </div>
                </div>

                {/* Children's Data */}
                <div className="mb-12">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ablr-primary mb-6 pb-3 border-b-2 border-ablr-primary/20">
                    Children's Data
                  </h2>
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Our services are intended for adults and professional participants.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      We do not knowingly collect personal data from individuals under 18 years of age.
                    </p>
                  </div>
                </div>

                {/* Changes to This Policy */}
                <div className="mb-12">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ablr-primary mb-6 pb-3 border-b-2 border-ablr-primary/20">
                    Changes to This Policy
                  </h2>
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      We reserve the right to update this Privacy Policy.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Updated versions will be posted with a revised effective date.
                    </p>
                  </div>
                </div>

                {/* Grievance Officer */}
                <div className="mb-10">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ablr-primary mb-6 pb-3 border-b-2 border-ablr-primary/20">
                    Grievance Officer
                  </h2>
                  <div className="bg-gradient-to-br from-ablr-primary/10 via-ablr-terracotta/5 to-ablr-dark/5 rounded-xl p-8 border-2 border-ablr-primary/30">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      In accordance with Indian law, you may contact our designated Grievance Officer:
                    </p>
                    <div className="space-y-3">
                      <p className="text-gray-700 leading-relaxed">
                        <span className="font-semibold text-ablr-primary">Name:</span> Dr. Angana Nandy
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        <span className="font-semibold text-ablr-primary">Email:</span>{' '}
                        <a href="mailto:grievance@themethodlab.in" className="text-ablr-primary hover:underline">
                          grievance@themethodlab.in
                        </a>
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        <span className="font-semibold text-ablr-primary">Address:</span> 42/138, New Ballygunge Road, Kolkata 700039
                      </p>
                    </div>
                    <p className="text-gray-700 leading-relaxed mt-6 pt-6 border-t border-ablr-primary/20">
                      We will respond within the timelines prescribed under applicable law.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

