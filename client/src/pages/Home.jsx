import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-76px)] bg-black relative overflow-hidden font-sans flex items-center justify-center">
      
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center mt-[-10vh]">
        
        <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-white md:text-7xl">
          The Ultimate <span className="text-transparent text-blue-500 bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Tech Conference</span>
        </h1>
        
        <p className="max-w-2xl mb-12 text-lg leading-relaxed text-gray-400 md:text-xl">
          Level up your SDE skills, meet top recruiters, and secure your 9LPA dream
          job. Register now to get your exclusive QR Entry Pass!
        </p>
        
        <Link 
          to="/register" 
          className="bg-blue-600 text-white text-lg font-semibold px-10 py-4 rounded-full hover:bg-blue-500 transition-all duration-300 shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:shadow-[0_0_50px_rgba(37,99,235,0.6)] transform hover:-translate-y-1"
        >
          Secure Your Spot Now
        </Link>

      </div>
    </div>
  );
};

export default Home;