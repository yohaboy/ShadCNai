'use client'

import { Button } from '@/components/ui/button'

export default function ContactUs() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Contact Us</h2>
          <p className="text-lg text-white">
            Have questions or feedback? Just send it here and we'll get back to you as soon as possible.
          </p>
        </div>

        {/* Contact Form */}
        <form className="space-y-6 bg-white/4 p-8 rounded-xl shadow-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-2 text-sm font-medium text-white">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                className="rounded-md border border-border/50 px-4 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="mb-2 text-sm font-medium text-white">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                className="rounded-md border border-border/50 px-4 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="subject" className="mb-2 text-sm font-medium text-white">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              placeholder="Subject"
              className="rounded-md border border-border/50 px-4 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="message" className="mb-2 text-sm font-medium text-white">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="Your message..."
              className="rounded-md border border-border/50 px-4 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none"
            />
          </div>

          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>
      </div>
    </section>
  )
}
