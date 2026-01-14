function Contact() {
  return (
    <section className="w-full mx-auto bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-900 to-purple-800 min-h-[300px] md:min-h-[400px] flex flex-col justify-center items-center px-4 md:px-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-0"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h3 className="text-sm md:text-base text-orange-400 font-bold uppercase tracking-widest mb-2">
            Connect With Us
          </h3>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Get In Touch
          </h2>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">
            We're here to help and answer any questions you might have.
          </p>
        </div>
      </div>

      {/* Contact Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full">
            <div className="p-6 md:p-8 lg:p-10 bg-gradient-to-br from-indigo-600 to-purple-600 text-white h-full">
              <div className="max-w-md mx-auto">
                <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center lg:text-left">
                  Contact Information
                </h3>
                
                <div className="space-y-5 md:space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-white/10 p-2.5 rounded-lg">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg md:text-xl font-semibold">Phone</h4>
                      <a href="tel:+923025089439" className="mt-1 text-white/90 hover:text-white hover:underline block">
                        0302-5089439
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-white/10 p-2.5 rounded-lg">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg md:text-xl font-semibold">Email</h4>
                      <a href="mailto:aqib@darwazypy.com" className="mt-1 text-white/90 hover:text-white hover:underline block"> 
                      azlangarment@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-white/10 p-2.5 rounded-lg">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg md:text-xl font-semibold">Address</h4>
                      <p className="mt-1 text-white/90">
                        <a 
                          href="https://maps.google.com/?q=I-10+Markaz,+Islamabad,+Pakistan" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-white hover:underline"
                        >
                          I-10 Markaz, Islamabad, Pakistan
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 md:mt-12">
                  <h4 className="text-lg md:text-xl font-semibold mb-4 text-center lg:text-left">Follow Us</h4>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-3 md:gap-4">
                    {[
                      { name: 'Facebook', icon: 'facebook', url: 'https://facebook.com' },
                      { name: 'Twitter', icon: 'twitter', url: 'https://twitter.com' },
                      { name: 'Instagram', icon: 'instagram', url: 'https://instagram.com' },
                      { name: 'LinkedIn', icon: 'linkedin', url: 'https://linkedin.com' },
                      { name: 'YouTube', icon: 'youtube', url: 'https://youtube.com' },
                      { name: 'TikTok', icon: 'tiktok', url: 'https://tiktok.com' },
                    ].map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/10 hover:bg-white/20 p-2.5 md:p-3 rounded-full transition flex-shrink-0"
                        aria-label={social.name}
                      >
                        <img 
                          src={`https://img.icons8.com/ios-filled/24/ffffff/${social.icon}.png`} 
                          alt={social.name}
                          className="w-5 h-5"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Map and Form) */}
          <div className="space-y-8 md:space-y-10">
       
            {/* Google Map */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-64 sm:h-80 md:h-96 w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3319.7373839894773!2d73.15906571517846!3d33.65995048069086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbfbe4f2d1b17%3A0x3b1c6c0c7f5b1a2d!2sI-10%20Markaz%2C%20Islamabad%2C%20Islamabad%20Capital%20Territory%2C%20Pakistan!5e0!3m2!1sen!2s!4v1642234567890!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Azlan Garments - I-10 Islamabad Location"
                ></iframe>
              </div>
              <div className="p-6 md:p-8">
                <h4 className="text-lg md:text-xl font-semibold text-gray-800">Our Location</h4>
                <p className="text-gray-600 mt-1.5">I-10 Markaz, Islamabad, Pakistan</p>
                <p className="text-sm text-gray-500 mt-1">Visit our store for the latest fashion collection</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;