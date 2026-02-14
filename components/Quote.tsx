import ScrollAnimation from './ScrollAnimation'

export default function Quote() {
  return (
    <section className="section-spacing bg-gradient-to-b from-white via-gray-50/30 to-white relative overflow-hidden">
      {/* Very soft gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-ablr-primary/3 via-transparent to-ablr-primary/3"></div>
      
      {/* Oversized quotation mark watermark - positioned behind text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="text-[200px] sm:text-[300px] md:text-[350px] lg:text-[400px] relative -top-36 md:-top-36 lg:-top-36 font-serif text-ablr-dark opacity-[0.5] select-none" style={{ lineHeight: 1 }}>
          "
        </div>
      </div>
      
      <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <ScrollAnimation direction="fade" delay={200}>
          <div className="max-w-5xl mx-auto text-center py-12 sm:py-16 md:py-20 relative z-20">
            {/* Thin line above */}
            <div className="w-16 sm:w-20 md:w-24 h-px bg-ablr-dark/20 mx-auto mb-8 sm:mb-10 md:mb-12"></div>
            
            {/* Center aligned serif italic quote */}
            <blockquote className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl italic text-ablr-dark mb-8 sm:mb-10 md:mb-12 font-serif leading-relaxed font-medium relative z-20 px-4 sm:px-6">
              "The measure of a profession is not in its knowledge alone, but in the rigour with which that knowledge is applied."
            </blockquote>
            
            {/* Thin line below */}
            <div className="w-16 sm:w-20 md:w-24 h-px bg-ablr-dark/20 mx-auto mb-6 sm:mb-7 md:mb-8"></div>
            
            <p className="text-base sm:text-lg text-ablr-dark/85 label-small-caps relative z-20 px-4">ABLR Training Principle</p>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
