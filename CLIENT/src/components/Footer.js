import React from 'react'
import logo from './Assets/logo.jpg'

const Footer = () => {
  return (
    <div>

<div className="mx-auto mt-12 max-w-7xl bg-gray-50">
    <footer className="px-4 py-10">
      <div className="flex flex-col md:flex-row md:items-center">
        <span>
        <a  className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src={logo} className="h-8"  />
                      
        </a>
        </span>
        <div className="mt-4 grow md:ml-12 md:mt-0">
          <p className="text-base font-semibold text-gray-700">
            © 2024 Blogify
          </p>
        </div>
      </div>
      <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <div className="mb-8 lg:mb-0">
          <p className="mb-6 text-lg font-semibold text-gray-700">Company</p>
          <ul className="flex flex-col space-y-4 text-[14px] font-medium text-gray-500">
            <li>About us</li>
            <li>Company History</li>
            <li>Our Team</li>
            <li>Our Vision</li>
            <li>Press Release</li>
          </ul>
        </div>
        <div className="mb-8 lg:mb-0">
          <p className="mb-6 text-lg font-semibold text-gray-700">Our Stores</p>
          <ul className="flex flex-col space-y-4 text-[14px] font-medium text-gray-500">
            <li>Washington</li>
            <li>New Hampshire</li>
            <li>Maine</li>
            <li>Texas</li>
            <li>Indiana</li>
          </ul>
        </div>
        <div className="mb-8 lg:mb-0">
          <p className="mb-6 text-lg font-semibold text-gray-700">Services</p>
          <ul className="flex flex-col space-y-4 text-[14px] font-medium text-gray-500">
            <li>UI / UX Design</li>
            <li>App Development</li>
            <li>API reference</li>
            <li>API status</li>
            <li>Documentation</li>
          </ul>
        </div>
        <div className="mb-8 lg:mb-0">
          <p className="mb-6 text-lg font-semibold text-gray-700">Legal</p>
          <ul className="flex flex-col space-y-4 text-[14px] font-medium text-gray-500">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Cookie Policy</li>
            <li>Disclaimer</li>
            <li>Media Policy</li>
          </ul>
        </div>
        <div className="mb-8 lg:mb-0">
          <p className="mb-6 text-lg font-semibold text-gray-700">Social Links</p>
          <ul className="flex flex-col space-y-4 text-[14px] font-medium text-gray-500">
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
            <li>Linkedin</li>
            <li>YouTube</li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
    </div>
  )
}

export default Footer