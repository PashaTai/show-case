export default function BioHero() {
  return (
    <div className="relative bg-primary pt-24">
      <div className="absolute inset-0">
        <img 
          className="w-full h-full object-cover" 
          src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
          alt="Marketing expert working" 
        />
        <div className="absolute inset-0 bg-primary mix-blend-multiply" aria-hidden="true"></div>
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">About Andrew Ivanov</h1>
        <p className="mt-6 max-w-3xl text-xl text-slate-100">
          A journey through two decades of marketing innovation, strategy development, and business transformation.
        </p>
      </div>
    </div>
  );
}
