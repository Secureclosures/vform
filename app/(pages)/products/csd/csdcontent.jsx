'use client'
import Image from "next/image";
import Link from "next/link";
import { Toaster, toast } from 'react-hot-toast';

const csdProducts = [
    {
        name: "1810 (2-PIECE)",
        image: "https://www.secureclosures.com/wp-content/uploads/2019/05/1810-2-PIECE.jpg",
        description:
            "1810 (2-PIECE) is a high-performance closure for carbonated soft drink bottles, featuring a two-piece design for enhanced sealing and tamper-evidence.",
        specs: [
            { label: "Neck Finish", value: "28mm" },
            { label: "Material", value: "Food Grade Polypropylene (PP)" },
            { label: "Design", value: "2-Piece" },
            { label: "Features", value: "Tamper-Evident, Leak-Proof, Custom Colors" },
            { label: "Applications", value: "CSD Bottles, Carbonated Drinks" },
        ],
    },
    {
        name: "PC1881-(2 PIECE)",
        image: "https://www.secureclosures.com/wp-content/uploads/2019/05/PC1881-2-PIECE.jpg",
        description:
            "PC1881-(2 PIECE) closure is engineered for PET bottles used in carbonated soft drinks, offering a secure two-piece construction and reliable tamper-evidence.",
        specs: [
            { label: "Neck Finish", value: "28mm" },
            { label: "Material", value: "Food Grade Polypropylene (PP)" },
            { label: "Design", value: "2-Piece" },
            { label: "Features", value: "Tamper-Evident, Leak-Proof, Custom Colors" },
            { label: "Applications", value: "CSD Bottles, PET Bottles" },
        ],
    },
    {
        name: "A1881CSD6",
        image: "https://www.secureclosures.com/wp-content/uploads/2019/05/A1881CSD6.jpg",
        description:
            "A1881CSD6 is a specialized closure for carbonated soft drink bottles, designed for high-pressure sealing and tamper-evidence.",
        specs: [
            { label: "Neck Finish", value: "28mm" },
            { label: "Material", value: "Food Grade Polypropylene (PP)" },
            { label: "Features", value: "High-Pressure Sealing, Tamper-Evident, Custom Colors" },
            { label: "Applications", value: "CSD Bottles, Carbonated Drinks" },
        ],
    },
    {
        name: "S1881CSD001",
        image: "https://www.secureclosures.com/wp-content/uploads/2019/05/S1881CSD001.jpg",
        description:
            "S1881CSD001 is a robust closure for carbonated soft drink bottles, offering secure sealing, tamper-evidence, and compatibility with high-speed bottling lines.",
        specs: [
            { label: "Neck Finish", value: "28mm" },
            { label: "Material", value: "Food Grade Polypropylene (PP)" },
            { label: "Features", value: "High-Speed Compatible, Tamper-Evident, Leak-Proof" },
            { label: "Applications", value: "CSD Bottles, Carbonated Drinks" },
        ],
    },
    {
        name: "25/19 CAP",
        image: "https://www.secureclosures.com/wp-content/uploads/2019/05/A1881CSD6.jpg",
        description:
            "25/19 CAP is a versatile closure for carbonated soft drink bottles, designed for secure sealing, tamper-evidence, and leak-proof performance.",
        specs: [
            { label: "Neck Finish", value: "25mm / 19mm" },
            { label: "Material", value: "Food Grade Polypropylene (PP)" },
            { label: "Features", value: "Tamper-Evident, Leak-Proof, Custom Colors" },
            { label: "Applications", value: "CSD Bottles, Carbonated Drinks" },
        ],
    },
];

export default function CSDClosuresPage() {
    const handleEnquireClick = () => {
        toast('Opening your mail app for product enquiry. Please wait...', {
            icon: '📧',
            position: 'top-center',
            duration: 3500,
            style: {
                fontWeight: 'bold',
                fontSize: '1rem',
                background: '#e0f2fe',
                color: '#0e7490',
                borderRadius: '0.75rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }
        });
    };
    return (
        <main className="min-h-screen">
            <Toaster />
            {/* Hero Section */}
            <section
                className="relative overflow-hidden flex flex-col items-center justify-center text-center pt-24 md:pt-32 pb-12 min-h-[60vh] sm:min-h-[70vh]"
                style={{ paddingTop: "clamp(4rem, 10vw, 6rem)" }}
            >
                <div className="absolute inset-0 -z-10">
                    <Image
                        src="/producthero.webp"
                        alt="CSD Closures Hero"
                        fill
                        priority
                        className="w-full h-full object-cover object-center opacity-80"
                    />
                    <div className="absolute inset-0 bg-black/45" />
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-cyan-300 via-blue-400 to-blue-700 bg-clip-text text-transparent mb-6 drop-shadow-xl">
                    CSD Closures
                </h1>
                <p className="text-xl md:text-2xl font-semibold text-blue-100 max-w-2xl mx-auto mb-8">
                    Tamper-evident, leak-proof, and high-performance closures for carbonated soft drink packaging.
                </p>
                <Link
                    href="/contact"
                    className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-extrabold text-lg shadow-lg hover:from-blue-700 hover:to-cyan-600 focus:ring-4 focus:ring-cyan-300 transition-all duration-200"
                >
                    Request a Quote
                </Link>
            </section>

            {/* CSD Product Cards */}
            <section className="max-w-7xl mx-auto px-4 py-12">
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-10 text-center tracking-tight">
                    Our CSD Closures Range
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                    {csdProducts.map((prod, idx) => (
                        <div
                            key={prod.name}
                            className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 flex flex-col items-center text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group focus-within:ring-4 focus-within:ring-cyan-200"
                            tabIndex={0}
                        >
                            <div className="relative w-64 h-64 mb-6 rounded-2xl overflow-hidden shadow-lg">
                                <Image
                                    src={prod.image}
                                    alt={prod.name}
                                    fill
                                    className="object-contain rounded-xl group-hover:scale-110 transition-transform duration-300 cursor-zoom-in"
                                    style={{ zIndex: 1 }}
                                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.18)'}
                                    onMouseOut={e => e.currentTarget.style.transform = ''}
                                />
                                <div className="absolute inset-0 pointer-events-none" />
                            </div>
                            <h3 className="text-2xl font-extrabold text-blue-700 dark:text-cyan-300 mb-2 tracking-tight">
                                {prod.name}
                            </h3>
                            <p className="text-base font-medium text-gray-700 dark:text-gray-200 mb-4 min-h-[60px]">
                                {prod.description}
                            </p>
                            <ul className="text-left text-gray-800 dark:text-gray-100 text-base font-semibold mb-4 space-y-2 w-full max-w-xs mx-auto">
                                {prod.specs.map((spec, i) => (
                                    <li key={i} className="flex justify-between border-b border-dashed border-blue-100 dark:border-blue-900 py-1">
                                        <span className="font-bold text-blue-700 dark:text-cyan-300">{spec.label}:</span>
                                        <span className="text-right font-semibold">{spec.value}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href={`mailto:sales@secureclosures.com?subject=Enquiry%20for%20${encodeURIComponent(prod.name)}%20CSD%20Closure&body=${encodeURIComponent(`Hello Secure Closures Team,  I am interested in the ${prod.name} CSD closure. Please provide more details and pricing for the following specifications: ${prod.specs.map(s => `- ${s.label}: ${s.value}`).join(' ')}\n Thank you. `)}`}
                                target="_blank"
                                className="mt-auto inline-block px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold shadow hover:from-blue-700 hover:to-cyan-600 focus:ring-2 focus:ring-cyan-300 transition-all duration-200"
                                onClick={handleEnquireClick}
                            >
                                Enquire Now
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 bg-gradient-to-r from-blue-700 to-cyan-500 text-white text-center">
                <h3 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">
                    Need a custom closure or bulk order?
                </h3>
                <p className="text-lg font-semibold mb-8 max-w-2xl mx-auto">
                    Contact our team for tailored solutions, technical support, and the highest quality standards in the industry.
                </p>
                <Link
                    href="/contact"
                    className="inline-block px-8 py-4 rounded-xl bg-white text-blue-700 font-extrabold text-lg shadow-lg hover:bg-blue-100 focus:ring-4 focus:ring-cyan-300 transition-all duration-200"
                >
                    Get in Touch
                </Link>
            </section>
        </main>
    );
}