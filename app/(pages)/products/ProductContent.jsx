import React from "react";
import Link from "next/link";
import Image from "next/image";

const productCategories = [
	{
		label: "IMFL Closures",
		description:
			"Premium closures for the Indian Made Foreign Liquor industry, engineered for security and performance.",
		image: "/imfl.jpg",
		href: "/products/imfl",
	},
	{
		label: "Water Closures",
		description:
			"High-quality, tamper-evident caps for bottled water, ensuring purity and safety.",
		image: "/watercap.jpg",
		href: "/products/water",
	},
	{
		label: "Juice Closures",
		description:
			"Innovative closures for juice and beverage packaging, designed for freshness and convenience.",
		image: "/juice.jpg",
		href: "/products/juice",
	},
	{
		label: "CSD Closures",
		description:
			"Robust closures for carbonated soft drinks, built to withstand pressure and maintain carbonation.",
		image: "/csd.png",
		href: "/products/csd",
	},
];

const featuredProducts = [
	{
		name: "28mm 3-Piece Cap",
		desc: "Industry-standard closure for water and soft drink bottles, with advanced tamper-evidence.",
		image: "/servicecaps.webp",
	},
	{
		name: "29/21 Juice Cap",
		desc: "Specialized closure for juice bottles, ensuring leak-proof and hygienic sealing.",
		image: "/servicecaps.webp",
	},
	{
		name: "38mm Hot Fill Cap",
		desc: "Designed for hot fill applications, maintaining integrity under high temperatures.",
		image: "/featured2.jpg",
	},
	{
		name: "Alaska Cap",
		desc: "Premium closure for CSD bottles, engineered for high carbonation retention.",
		image: "/featured3.jpg",
	},
];

export default function ProductsPage() {
	return (
		<main className="min-h-screen  transition-colors">
			{/* Hero Section */}
			<section className="relative overflow-hidden py-65 md:py-50 flex flex-col items-center justify-center text-center">
				<div className="absolute inset-0 -z-10">
					<Image
						src="/producthero.webp"
						alt="Industrial Products Hero"
						fill
						priority
						className="w-full h-full object-cover object-center opacity-100"
					/>
					<div className="absolute inset-0 bg-black/40" />
				</div>
				<div className="relative">
  <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500/20 rounded-full blur-sm"></div>
  <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-cyan-500/20 rounded-full blur-md"></div>
  <h1 className="vital-stroke text-4xl md:text-6xl font-black bg-gradient-to-r from-cyan-300 via-blue-400 to-blue-700 bg-clip-text text-transparent mb-6 drop-shadow-xl relative z-10">
    Industrial-Grade Closures & Packaging Solutions
  </h1>
</div>
				<p className="text-lg md:text-2xl text-blue-100 max-w-2xl mx-auto mb-8 font-medium">
					Engineered for performance, security, and sustainability. Discover our
					range of world-class products trusted by leading brands.
				</p>
				<Link
					href="/contact"
					className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg shadow-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-200"
				>
					Request a Quote
				</Link>
			</section>

			{/* Product Categories */}
			<section className="max-w-7xl mx-auto px-4 py-12">
				<h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-10 text-center">
					Product Categories
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
					{productCategories.map((cat, idx) => (
						<Link
							key={cat.label}
							href={cat.href}
							className="group block bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:-translate-y-2"
						>
							<div className="relative h-40 sm:h-48 w-full overflow-hidden">
								{cat.image.endsWith(".webm") ? (
									<video
										src={cat.image}
										autoPlay
										loop
										muted
										playsInline
										className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
									/>
								) : (
									<Image
										src={cat.image}
										alt={cat.label}
										fill
										className="object-cover group-hover:scale-105 transition-transform duration-500"
									/>
								)}
								<div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-blue-800/20 to-transparent" />
							</div>
							<div className="p-6">
								<h3 className="text-xl font-bold text-blue-700 dark:text-cyan-300 mb-2 group-hover:underline">
									{cat.label}
								</h3>
								<p className="text-gray-600 dark:text-gray-300 text-sm mb-2 min-h-[48px]">
									{cat.description}
								</p>
								<span className="inline-block mt-2 text-blue-600 dark:text-cyan-400 font-semibold group-hover:underline">
									Explore &rarr;
								</span>
							</div>
						</Link>
					))}
				</div>
			</section>

			{/* Featured Products Grid */}
			<section className="max-w-7xl mx-auto px-4 py-12">
				<h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-10 text-center">
					Featured Products
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
					{featuredProducts.map((prod, idx) => (
						<div
							key={prod.name}
							className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 flex flex-col items-center text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
						>
							<div className="relative w-32 h-32 mb-4">
								<Image
									src={prod.image}
									alt={prod.name}
									fill
									className="object-contain rounded-xl shadow-md"
								/>
							</div>
							<h4 className="text-lg font-bold text-blue-700 dark:text-cyan-300 mb-2">
								{prod.name}
							</h4>
							<p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
								{prod.desc}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* Call to Action */}
			<section className="py-16 bg-gradient-to-r from-blue-700 to-cyan-500 text-white text-center">
				<h3 className="text-3xl md:text-4xl font-bold mb-4">
					Ready to elevate your packaging?
				</h3>
				<p className="text-lg mb-8 max-w-2xl mx-auto">
					Contact our team for custom solutions, technical support, and bulk
					orders. We deliver excellence for every industry.
				</p>
				<Link
					href="/contact"
					className="inline-block px-8 py-4 rounded-xl bg-white text-blue-700 font-bold text-lg shadow-lg hover:bg-blue-100 transition-all duration-200"
				>
					Get in Touch
				</Link>
			</section>
		</main>
	);
}
