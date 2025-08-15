import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const testimonialData = [
    {
        text: "The dashboard is a game-changer! Being able to see which products are low on stock and our top sellers in a single glance has saved us so much time.",
        author: "Sarah L., E-commerce Store Owner"
    },
    {
        text: "Managing orders is finally simple. Creating an order automatically updates our inventory, and tracking the status from 'Pending' to 'Complete' is incredibly intuitive.",
        author: "Mike R., Warehouse Lead"
    },
    {
        text: "We used to track everything in spreadsheets. StoreTrack has streamlined our entire process. The search and filter on the products page is a lifesaver.",
        author: "Jessica P., Small Business Owner"
    },
    {
        text: "The low-stock notification feature when creating an order has prevented us from overselling multiple times. It's a simple feature that has a huge impact.",
        author: "David Chen, Operations Manager"
    }
];

const Testimonials = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 768, // On mobile screens
                settings: {
                    slidesToShow: 1, // Show one testimonial at a time
                }
            }
        ]
    };

    return (
        <div>
            {/* Testimonials Section */}
            <section className="bg-gray-100 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center">What Our Clients Say</h2>
                    <Slider {...settings}>
                        {testimonialData.map((testimonial, index) => (
                            <div key={index} className="p-4">
                                <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col justify-between">
                                    <p className="text-lg mb-4 italic">"{testimonial.text}"</p>
                                    <p className="text-gray-600 font-semibold text-right">- {testimonial.author}</p>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </section>
        </div>
    );
}

export default Testimonials;
