'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollAnimation from '@/components/ScrollAnimation'

export default function TermsOfServicePage() {
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
              Terms of Service
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
                <div className="mb-8 p-6 bg-gray-50 rounded-xl border-l-4 border-ablr-primary">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    These Terms of Service ("Terms") govern your access to and use of the website, 
                    programmes, training services and institutional offerings provided by The Method Lab 
                    (Applied Behavioural Learning and Research), an initiative based in India ("TML," "we," "us," 
                    or "our").
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    By accessing our website or enrolling in any programme, you agree to be bound by these 
                    Terms in accordance with the Information Technology Act, 2000 and applicable Indian 
                    laws.
                  </p>
                  <p className="text-gray-700 leading-relaxed font-semibold">
                    If you do not agree, you must not use our services.
                  </p>
                </div>

                {/* Section 1 */}
                <div className="mb-10">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ablr-primary mb-4">
                    1. Eligibility
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our services are intended for:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
                    <li>Students and professionals in the behavioural and health sciences</li>
                    <li>Institutional partners and organisations</li>
                    <li>Faculty collaborators</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    Participants must be at least 18 years of age or have appropriate institutional 
                    authorisation.
                  </p>
                </div>

                {/* Section 2 */}
                <div className="mb-10">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ablr-primary mb-4">
                    2. Nature of Services
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The Method Lab provides professional training and capacity-building services, including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
                    <li>Live cohort programmes</li>
                    <li>Self-paced learning modules</li>
                    <li>Institutional training programmes</li>
                    <li>Faculty development initiatives</li>
                    <li>Applied practice and research methodology training</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    We reserve the right to modify, suspend or discontinue any programme or service at our 
                    discretion.
                  </p>
                </div>

                {/* Section 3 */}
                <div className="mb-10">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ablr-primary mb-4">
                    3. Professional Disclaimer
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The Method Lab provides educational and professional development services only. 
                    Participation in our programmes:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
                    <li>Does not constitute clinical supervision unless expressly stated</li>
                    <li>Does not create a therapeutic, medical or legal relationship</li>
                    <li>Does not replace professional licensing requirements</li>
                    <li>Does not substitute for regulatory or institutional obligations</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    Participants remain solely responsible for their professional decisions and implementation 
                    of training.
                  </p>
                </div>

                {/* Section 4 */}
                <div className="mb-10">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ablr-primary mb-4">
                    4. Payment Terms
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    All programme fees must be paid in full prior to commencement unless otherwise agreed 
                    in writing.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Applicable taxes, including GST where relevant, will be charged in accordance with Indian 
                    tax regulations.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Refund policies will be specified at the time of enrolment. Institutional contracts may 
                    contain separate payment terms.
                  </p>
                </div>

                {/* Section 5 */}
                <div className="mb-10">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ablr-primary mb-4">
                    5. Intellectual Property
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    All materials, including but not limited to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
                    <li>Course content</li>
                    <li>Presentations</li>
                    <li>Training frameworks</li>
                    <li>Recorded sessions</li>
                    <li>Written materials</li>
                    <li>Digital modules</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    are the intellectual property of The Method Lab and/or its faculty unless otherwise stated. 
                    Participants may not reproduce, distribute, record, modify, resell or share materials 
                    without prior written consent.
                  </p>
                  <p className="text-gray-700 leading-relaxed font-semibold">
                    Unauthorised use may result in legal action.
                  </p>
                </div>

                {/* Section 6 */}
                <div className="mb-10">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ablr-primary mb-4">
                    6. Confidentiality
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Participants agree to maintain confidentiality regarding:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
                    <li>Case discussions</li>
                    <li>Peer contributions</li>
                    <li>Institutional information</li>
                    <li>Proprietary materials</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    We commit to handling personal information in accordance with applicable Indian data 
                    protection laws.
                  </p>
                </div>

                {/* Section 7 */}
                <div className="mb-10">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ablr-primary mb-4">
                    7. Code of Conduct
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Participants must:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
                    <li>Engage respectfully and professionally</li>
                    <li>Refrain from harassment, discrimination or disruptive behaviour</li>
                    <li>Maintain ethical standards appropriate to their profession</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    We reserve the right to remove participants who violate this code without refund.
                  </p>
                </div>

                {/* Section 8 */}
                <div className="mb-10">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ablr-primary mb-4">
                    8. Limitation of Liability
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    To the fullest extent permitted under Indian law:
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The Method Lab shall not be liable for:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
                    <li>Indirect, incidental or consequential damages</li>
                    <li>Professional decisions made by participants</li>
                    <li>Institutional or business outcomes</li>
                    <li>Regulatory consequences arising from application of training</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    Participation is at the participant's own professional discretion.
                  </p>
                </div>

                {/* Section 9 */}
                <div className="mb-10">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ablr-primary mb-4">
                    9. Institutional Agreements
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    Separate written agreements may govern institutional partnerships, outlining scope, 
                    deliverables, payment terms and confidentiality obligations. 
                    In case of conflict, the written institutional agreement shall prevail.
                  </p>
                </div>

                {/* Section 10 */}
                <div className="mb-10">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ablr-primary mb-4">
                    10. Governing Law & Jurisdiction
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    These Terms shall be governed by the laws of India.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Any disputes arising out of or relating to these Terms shall be subject to the exclusive 
                    jurisdiction of the courts of Kolkata, India.
                  </p>
                </div>

                {/* Section 11 */}
                <div className="mb-10">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ablr-primary mb-4">
                    11. Modifications
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We reserve the right to update these Terms at any time.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Continued use of services constitutes acceptance of the updated Terms.
                  </p>
                </div>

                {/* Section 12 */}
                <div className="mb-10">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ablr-primary mb-4">
                    12. Contact
                  </h2>
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <p className="text-gray-700 leading-relaxed mb-2">
                      <span className="font-semibold">The Method Lab</span>
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-2">
                      Registered Address: 42/138, New Ballygunge Road, Kolkata 700039
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Email: <a href="mailto:info@themethodlab.in" className="text-ablr-primary hover:underline">info@themethodlab.in</a>
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




