import React from 'react'; 
import { useRef } from 'react';
import { useTheme } from '../Context/ThemeContext';

import Card from './Card';
import GpImage from '../assets/PromptImage.png';
import TjImage from '../assets/Tj.png';
import RLImage from '../assets/RL.png';
import FEImage from '../assets/FE.png';
import ReactImage from '../assets/science.png';
import PollinationsLogo from '../assets/pollinations-logo.svg';
import tailwindcssImage from '../assets/tailwindcss.png';
import DragonVideo from '../assets/Dragon_Soars_Through_Sunset_Sky.mp4';

const AboutSection = ({ onNavigate }) => {
  const { colors, isDark } = useTheme();

 const FeaturesRef = useRef(null);
 const TechRef = useRef(null);
 const HowItWorksRef = useRef(null);
 const ExampleRef = useRef(null);

  return (
    <div className="w-full">
      {/* Section 1: Hero */}
      <section className="relative min-h-screen w-full bg-gradient-to-br from-purple-700 via-fuchsia-600 to-orange-500 flex flex-col items-center justify-center overflow-hidden px-4">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-32 right-32 w-24 h-24 bg-purple-300/20 rounded-full blur-lg animate-bounce"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-orange-300/30 rounded-full blur-md animate-ping"></div>
        </div>
        <div className="absolute inset-0 backdrop-blur-sm" style={{ backgroundColor: isDark ? 'rgba(48, 48, 48, 0.3)' : 'rgba(248, 249, 250, 0.2)' }} />
        
        <div className="relative z-10 text-center px-4 md:px-6 max-w-5xl">
          <div className="mb-8">
            <div className="text-6xl md:text-8xl mb-4 animate-bounce">🚀</div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 tracking-wide text-white drop-shadow-2xl">
              Welcome to <span className="text-orange-300 animate-pulse">Prompt<span className="text-purple-300">AI</span></span>
            </h1>
          </div>
          
          <div className="backdrop-blur-md bg-white/10 rounded-2xl p-4 md:p-8 mb-8 md:mb-10 border border-white/20 shadow-2xl">
            <p className="text-base md:text-lg lg:text-xl leading-relaxed text-white/95 font-medium">
              Your personal AI prompt engineer, built with <span className="font-bold text-purple-200 bg-purple-500/30 px-2 py-1 rounded">React</span> & 
              <span className="font-bold text-orange-200 bg-orange-500/30 px-2 py-1 rounded">Tailwind CSS</span>. Transform raw ideas into optimized prompts that deliver exceptional AI results.
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-8">
            <button 
              onClick={() => onNavigate('home')}
              className="group relative bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-12 py-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-purple-500/50 font-bold text-lg"
            >
              <span className="relative z-10">🎯 Start Generating</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            </button>
            
            <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-2 md:gap-4 mt-6">
              <button 
                onClick={() => FeaturesRef.current?.scrollIntoView({ behavior:'smooth' })}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-3 md:px-6 py-2 md:py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-orange-500/50 font-semibold text-sm md:text-base"
              >
                ✨ View Features
              </button>
              <button 
                onClick={() => TechRef.current?.scrollIntoView({ behavior:'smooth' })}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-3 md:px-6 py-2 md:py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-orange-500/50 font-semibold text-sm md:text-base"
              >
                🛠️ Tech Stack
              </button>
              <button 
                onClick={() => HowItWorksRef.current?.scrollIntoView({ behavior:'smooth' })}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-3 md:px-6 py-2 md:py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-orange-500/50 font-semibold text-sm md:text-base"
              >
                ⚡ How it Works
              </button>
              <button 
                onClick={() => ExampleRef.current?.scrollIntoView({ behavior:'smooth' })}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-3 md:px-6 py-2 md:py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-orange-500/50 font-semibold text-sm md:text-base"
              >
                🎬 See Example
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Features */}
      <section ref={FeaturesRef} className="min-h-screen w-full flex flex-col items-center justify-center px-4 md:px-6 py-12 md:py-20 relative" style={{ backgroundColor: colors.primary }}>
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-10" style={{ background: `linear-gradient(45deg, ${colors.accent}, ${colors.accentSecondary})` }}></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full opacity-10" style={{ background: `linear-gradient(-45deg, ${colors.accentSecondary}, ${colors.accent})` }}></div>
        </div>
        
        <div className="relative z-10 w-full max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-wide text-center" style={{ color: colors.text }}>
              What Makes <span className="text-orange-300">Prompt<span className="text-purple-600">AI</span></span> Special
            </h2>
            <div className="w-24 h-1 mx-auto rounded-full" style={{ background: `linear-gradient(90deg, ${colors.accent}, ${colors.accentSecondary})` }}></div>
          </div>

          {/* Enhanced Card Layout */}
          <div className="space-y-12">
            {/* First Row: 3 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-6 md:gap-8 w-full max-w-6xl">
              <div className="group transform transition-all duration-500 hover:scale-105">
                <Card
                  Imgsrc={GpImage}
                  AltImg="PromptImage"
                  Title="🧠 Smart Prompt Builder"
                  imgClassName="rounded-t-lg object-cover w-full h-[160px] transition-transform duration-300 group-hover:scale-110"
                  Desc="Automatically refines your raw ideas into well-structured prompts optimized for AI tools—saving time and improving results instantly."
                  className="bg-gradient-to-br from-[#6741d9] to-[#8b5cf6] border-2 border-[#3bc9db]/30 hover:border-[#3bc9db] shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 w-full max-w-[300px] h-[380px] backdrop-blur-sm"
                />
              </div>
              <div className="group transform transition-all duration-500 hover:scale-105">
                <Card
                  Imgsrc={TjImage}
                  AltImg="TechImage"
                  Title="⚡ Modern Tech Stack"
                  imgClassName="rounded-t-lg object-cover w-full h-[160px] transition-transform duration-300 group-hover:scale-110"
                  Desc="Powered by React and Tailwind CSS for a clean interface, smooth animations, and high performance with maintainable code."
                  className="bg-gradient-to-br from-[#9c36b5] to-[#c084fc] border-2 border-[#b096f7]/30 hover:border-[#b096f7] shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 w-full max-w-[300px] h-[380px] backdrop-blur-sm"
                />
              </div>
              <div className="group transform transition-all duration-500 hover:scale-105">
                <Card
                  Imgsrc={RLImage}
                  AltImg="ResponsiveImage"
                  Title="📱 Responsive Design"
                  imgClassName="rounded-t-lg object-cover w-full h-[160px] transition-transform duration-300 group-hover:scale-110"
                  Desc="Crafted with a fully responsive, fluid design that looks stunning on all devices—whether it's a desktop, tablet, or mobile."
                  className="bg-gradient-to-br from-[#c2255c] to-[#ec4899] border-2 border-[#e1a2f3]/30 hover:border-[#e1a2f3] shadow-xl hover:shadow-2xl hover:shadow-pink-500/30 w-full max-w-[300px] h-[380px] backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Second Row: 1 Card */}
            <div className="flex justify-center w-full max-w-6xl">
              <div className="group transform transition-all duration-500 hover:scale-105">
                <Card
                  Imgsrc={FEImage}
                  AltImg="FrontendImage"
                  Title="🚀 Frontend Only"
                  imgClassName="rounded-t-lg object-cover w-full h-[160px] transition-transform duration-300 group-hover:scale-110"
                  Desc="A fully frontend-only architecture built for speed and simplicity. No heavy backends—easy to deploy, maintain, and perfect for lightweight apps."
                  className="bg-gradient-to-br from-[#e03131] to-[#f87171] border-2 border-[#fc9ca4]/30 hover:border-[#fc9ca4] shadow-xl hover:shadow-2xl hover:shadow-red-500/30 w-full max-w-[300px] h-[380px] backdrop-blur-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: TECH STACK USED */}
      <section ref={TechRef} className='min-h-screen w-full flex flex-col items-center justify-center px-6 py-20 relative' style={{ backgroundColor: colors.secondary }}>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, #8b5cf6 0%, transparent 50%), radial-gradient(circle at 75% 75%, #f97316 0%, transparent 50%)' }}></div>
        </div>
        
        <div className="relative z-10 w-full max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: colors.text }}>🛠️ Tech Stack</h2>
            <p className="text-xl mb-8" style={{ color: colors.textSecondary }}>Built with modern, powerful technologies</p>
            <div className="w-24 h-1 mx-auto rounded-full" style={{ background: `linear-gradient(90deg, ${colors.accent}, ${colors.accentSecondary})` }}></div>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-3 justify-center gap-8 md:gap-12 items-center max-w-4xl mx-auto'>
            <div className="group transform transition-all duration-500 hover:scale-110">
              <Card
                Imgsrc={ReactImage}
                AltImg="ReactImage"
                Title="⚛️ React.js"
                className="h-[250px] shadow-2xl hover:shadow-blue-500/30 border-2 border-blue-500/20 hover:border-blue-500/50 backdrop-blur-sm"
                imgClassName="object-contain w-24 h-24 mx-auto transition-transform duration-300 group-hover:rotate-12"
                textClassname="bg-gradient-to-t from-blue-600/20 to-transparent"
              />
            </div>
            <div className="group transform transition-all duration-500 hover:scale-110">
              <Card
                Imgsrc={tailwindcssImage}
                AltImg="TailwindImage"
                Title="🎨 Tailwind CSS"
                className="h-[250px] shadow-2xl hover:shadow-cyan-500/30 border-2 border-cyan-500/20 hover:border-cyan-500/50 backdrop-blur-sm"
                imgClassName="object-contain w-24 h-24 mx-auto transition-transform duration-300 group-hover:rotate-12"
                textClassname="bg-gradient-to-t from-cyan-600/20 to-transparent"
              />
            </div>
            <div className="group transform transition-all duration-500 hover:scale-110">
              <Card
                Imgsrc={PollinationsLogo}
                AltImg="PollinationsImage"
                Title="🌸 Pollinations AI"
                className="h-[250px] shadow-2xl hover:shadow-green-500/30 border-2 border-green-500/20 hover:border-green-500/50 backdrop-blur-sm"
                imgClassName="object-contain w-32 h-32 mx-auto transition-transform duration-300 group-hover:rotate-12"
                textClassname="bg-gradient-to-t from-green-600/20 to-transparent"
              />
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="p-6 rounded-xl backdrop-blur-sm" style={{ backgroundColor: colors.hover }}>
                <h3 className="text-xl font-bold mb-3" style={{ color: colors.text }}>⚡ Performance</h3>
                <p style={{ color: colors.textSecondary }}>Lightning-fast rendering with React's virtual DOM</p>
              </div>
              <div className="p-6 rounded-xl backdrop-blur-sm" style={{ backgroundColor: colors.hover }}>
                <h3 className="text-xl font-bold mb-3" style={{ color: colors.text }}>🎯 Precision</h3>
                <p style={{ color: colors.textSecondary }}>Pixel-perfect designs with Tailwind's utility classes</p>
              </div>
              <div className="p-6 rounded-xl backdrop-blur-sm" style={{ backgroundColor: colors.hover }}>
                <h3 className="text-xl font-bold mb-3" style={{ color: colors.text }}>🧠 Intelligence</h3>
                <p style={{ color: colors.textSecondary }}>Powered by Pollinations AI's innovative text generation models</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Example Showcase */}
      <section ref={ExampleRef} className='min-h-screen w-full flex flex-col items-center justify-center px-6 py-20 relative' style={{ backgroundColor: colors.secondary }}>
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-40 h-40 rounded-full opacity-10" style={{ background: `linear-gradient(45deg, ${colors.accent}, ${colors.accentSecondary})` }}></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full opacity-10" style={{ background: `linear-gradient(-45deg, ${colors.accentSecondary}, ${colors.accent})` }}></div>
        </div>
        
        <div className="relative z-10 w-full max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: colors.text }}>🎬 See It In Action</h2>
            <p className="text-xl mb-8" style={{ color: colors.textSecondary }}>From simple prompt to stunning AI-generated content</p>
            <div className="w-24 h-1 mx-auto rounded-full" style={{ background: `linear-gradient(90deg, ${colors.accent}, ${colors.accentSecondary})` }}></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left side - Prompt Example */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl backdrop-blur-sm" style={{ backgroundColor: colors.hover }}>
                <h3 className="text-2xl font-bold mb-4 text-orange-400">💭 User Input</h3>
                <div className="p-4 rounded-lg" style={{ backgroundColor: colors.primary, border: `2px solid ${colors.border}` }}>
                  <p className="text-lg" style={{ color: colors.text }}>"Generate a video prompt of a dragon flying in the sky"</p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-2">⬇️</div>
                <p className="text-sm" style={{ color: colors.textSecondary }}>AI Enhancement</p>
              </div>
              
              <div className="p-6 rounded-2xl backdrop-blur-sm" style={{ backgroundColor: colors.hover }}>
                <h3 className="text-2xl font-bold mb-4 text-purple-400">🎯 Enhanced Prompt</h3>
                <div className="p-4 rounded-lg" style={{ backgroundColor: colors.primary, border: `2px solid ${colors.border}` }}>
                  <p className="text-sm leading-relaxed" style={{ color: colors.text }}>
                    "A majestic dragon soars gracefully through a vibrant sunset sky, its scales shimmering with golden and crimson hues. The creature's powerful wings spread wide against dramatic clouds painted in warm oranges and deep purples. Cinematic lighting, high detail, fantasy art style."
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right side - Video Result */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl backdrop-blur-sm" style={{ backgroundColor: colors.hover }}>
                <h3 className="text-2xl font-bold mb-4 text-green-400">🎬 AI Generated Result</h3>
                <div className="relative rounded-xl overflow-hidden shadow-2xl" style={{ border: `3px solid ${colors.border}` }}>
                  <video 
                    className="w-full h-auto max-h-[400px] object-cover"
                    controls
                    poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23374151'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23fff' font-size='20'%3EDragon Video%3C/text%3E%3C/svg%3E"
                  >
                    <source src={DragonVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                </div>
                <p className="text-sm mt-3 text-center" style={{ color: colors.textSecondary }}>
                  ✨ This stunning video was created using an AI-enhanced prompt from PromptAI
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: How It Works */}
      <section ref={HowItWorksRef} className='min-h-screen w-full flex flex-col items-center justify-center px-6 py-20 relative' style={{ backgroundColor: colors.primary }}>
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full opacity-20 animate-pulse" style={{ backgroundColor: colors.accent }}></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full opacity-20 animate-bounce" style={{ backgroundColor: colors.accentSecondary }}></div>
        </div>
        
        <div className="relative z-10 w-full max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: colors.text }}>⚡ How It Works</h2>
            <p className="text-xl mb-8" style={{ color: colors.textSecondary }}>Simple steps to perfect prompts</p>
            <div className="w-24 h-1 mx-auto rounded-full" style={{ background: `linear-gradient(90deg, ${colors.accent}, ${colors.accentSecondary})` }}></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            <div className="group text-center p-8 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105" style={{ backgroundColor: colors.hover }}>
              <div className="text-6xl mb-6 group-hover:animate-bounce">💭</div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: colors.text }}>1. Share Your Idea</h3>
              <p className="text-lg" style={{ color: colors.textSecondary }}>Simply describe what you want to achieve with AI. No technical knowledge required!</p>
            </div>
            
            <div className="group text-center p-8 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105" style={{ backgroundColor: colors.hover }}>
              <div className="text-6xl mb-6 group-hover:animate-spin">🔄</div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: colors.text }}>2. AI Enhancement</h3>
              <p className="text-lg" style={{ color: colors.textSecondary }}>Our intelligent system analyzes and transforms your input into an optimized prompt.</p>
            </div>
            
            <div className="group text-center p-8 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105" style={{ backgroundColor: colors.hover }}>
              <div className="text-6xl mb-6 group-hover:animate-pulse">🎯</div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: colors.text }}>3. Perfect Results</h3>
              <p className="text-lg" style={{ color: colors.textSecondary }}>Get a polished, effective prompt ready to use with any AI tool for better outcomes.</p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center gap-4 p-6 rounded-2xl backdrop-blur-sm" style={{ backgroundColor: colors.secondary }}>
              <div className="text-4xl">🚀</div>
              <div>
                <h4 className="text-xl font-bold" style={{ color: colors.text }}>Ready to get started?</h4>
                <p style={{ color: colors.textSecondary }}>Transform your ideas into powerful prompts in seconds!</p>
              </div>
              <button 
                onClick={() => onNavigate('home')}
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50 font-semibold"
              >
                Try Now →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutSection;
