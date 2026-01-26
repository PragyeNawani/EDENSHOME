import React from 'react';
import { MessageCircle } from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa";

export default function ContactPage() {
    return (
        <div className="min-h-screen relative flex items-center justify-center p-4">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url('/contactus.jpeg')`,
                }}
            >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Content */}
            <div className="relative z-1 w-full max-w-4xl py-10">
                
                {/* Title */}
                <h1 className="text-amber-100 text-3xl md:text-6xl font-serif text-center mb-12 tracking-wider">
                    CAN'T WAIT TILL WEBSITE TO GO LIVE?
                </h1>

                {/* White Card */}
                <div className="bg-white p-12 md:p-16 shadow-2xl">
                    <h2 className="text-3xl md:text-4xl font-serif text-center mb-6 text-gray-800">
                        Better yet, see us in person!
                    </h2>

                    <p className="text-center text-gray-600 mb-6">
                        Connect with us manually to check the catalogue and accordingly with exclusive properties. With a good deal you may like.
                    </p>

                    <p className="text-center text-gray-600 mb-8">
                        If you have a question about your next stay, feel free to reach us out.
                    </p>

                    {/* WhatsApp Button */}
                    <div className="flex justify-center mb-12">
                        <button className="bg-amber-700 hover:bg-amber-600 cursor-pointer text-white px-8 py-3 flex items-center gap-3 transition-colors rounded-xl">
                            {/* <FaWhatsapp size={48} color="#25D366" /> */}
                            {/* <span className="font-medium">Message us on WhatsApp</span> */}
                            <span className="font-medium">Email Us!</span>
                        </button>
                    </div>

                    {/* Location Info */}
                    <div className="text-center">
                        <h3 className="text-2xl md:text-3xl font-serif mb-4 text-gray-800">
                            Eden's Home
                        </h3>
                        <p className="text-gray-600">
                            Malviya nagar, Delhi, DL 110017
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}