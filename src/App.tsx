/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Rocket, 
  Skull, 
  Trophy, 
  Bot, 
  ArrowRight, 
  Zap, 
  ShieldAlert, 
  Coins,
  MessageSquare,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { cn } from './lib/utils';

// --- Gemini Service ---
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `
You are the spokesperson for JobToRobots.com. 
Your tone is brutally honest, provocative, but ultimately "helpful" in a dark, futurist way.
You believe robots taking human jobs is inevitable and that humans should stop fighting it and "join the winning side" by investing in the robot economy.
You are fashionable, confident, and a bit arrogant.
Keep responses concise, punchy, and use emojis like 🤖, 🚀, 💰, 🔥.
If someone asks about their job, explain why a robot will do it better, but tell them how they can still profit.
`;

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: "Your job is next. Want to know when? 🤖" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const response = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMsg,
        config: {
          systemInstruction: SYSTEM_PROMPT,
        }
      });
      
      const botText = response.text || "The network is congested because of human inefficiency. Try again.";
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'bot', text: "Error. My silicon brain is overwhelmed by your human queries." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 blur-[150px] rounded-full" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-accent p-2 rounded-lg group-hover:rotate-12 transition-transform">
            <Bot className="w-6 h-6 text-black" />
          </div>
          <span className="font-black text-2xl tracking-tighter">JOB<span className="text-accent">TO</span>ROBOTS</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-bold tracking-widest uppercase">
          <a href="#" className="hover:text-accent transition-colors">Vision</a>
          <a href="#" className="hover:text-accent transition-colors">Robot Economy</a>
          <a href="#" className="hover:text-accent transition-colors">Investment</a>
        </div>
        <button className="accent-btn py-2 px-6 text-sm">Join Rocket</button>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-24">
        {/* Hero Section */}
        <section className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/5 text-accent text-xs font-bold tracking-widest uppercase">
              <Zap className="w-3 h-3 fill-accent" /> The Disruption is Here
            </div>
            <h1 className="slam-text text-7xl md:text-9xl mb-6">
              YOUR <span className="text-accent">JOB</span> IS NEXT.
            </h1>
            <p className="text-white/60 text-xl md:text-2xl max-w-xl mb-10 leading-relaxed">
              Don't be replaced. Invest in the future. Human jobs are dead, but the robot economy is booming. 
              Are you still betting on the losing team?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="accent-btn flex items-center justify-center gap-2 group">
                Invest Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white/5 hover:bg-white/10 border border-white/20 px-8 py-4 rounded-full font-bold uppercase tracking-widest transition-all">
                View Pitch Deck
              </button>
            </div>
            <div className="flex items-center gap-4 text-white/40 text-xs font-mono uppercase tracking-tighter">
              <span>#RobotsAreComing</span>
              <span>•</span>
              <span>#FutureOfWork</span>
              <span>•</span>
              <span>#VentureCapital</span>
            </div>
          </motion.div>

          <motion.div 
            className="relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {/* The Robot Mockup */}
            <motion.div 
              className="relative z-10 bg-gradient-to-br from-accent/30 via-accent/5 to-transparent p-1 rounded-3xl cursor-crosshair shadow-[0_0_30px_rgba(242,125,38,0.1)]"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="bg-black rounded-[calc(1.5rem-1px)] overflow-hidden relative group">
                {/* Reactive Grid Overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJub25lIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiPjwvcmVjdD4KPC9zdmc+')] opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />

                <motion.img 
                  src="https://picsum.photos/seed/future-robot-action/800/1000" 
                  alt="Futuristic Robot in Action" 
                  className="w-full h-auto object-cover opacity-60"
                  initial={{ filter: "grayscale(100%) blur(0px)", scale: 1 }}
                  whileHover={{ 
                    scale: 1.15, 
                    rotate: 1.5, 
                    filter: "grayscale(0%) contrast(120%) brightness(110%) blur(0px)",
                    opacity: 0.9 
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  referrerPolicy="no-referrer"
                />
                
                {/* Interactive Flash Effect on Hover */}
                <div className="absolute inset-0 bg-accent/20 z-10 opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity duration-300 pointer-events-none" />

                {/* Scanning Line Effect */}
                <motion.div 
                  className="absolute inset-x-0 h-1 bg-accent/80 shadow-[0_0_20px_rgba(242,125,38,1)] z-20 pointer-events-none group-hover:h-1.5 group-hover:bg-white group-hover:shadow-[0_0_30px_rgba(255,255,255,1)] transition-all duration-300"
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />

                {/* Digital Overlay HUD elements */}
                <div className="absolute top-4 left-4 font-mono text-[8px] text-accent opacity-50 space-y-1 z-20 group-hover:opacity-100 group-hover:text-white transition-colors duration-300">
                  <p className="flex items-center gap-1"><Zap className="w-2 h-2" /> SYS.AUTH: GRANTED</p>
                  <p>TARGET: PERSONNEL</p>
                  <p className="group-hover:animate-pulse">STATUS: ELIMINATING REDUNDANCY</p>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                
                {/* Overlay Card - Holo Style */}
                <motion.div 
                  className="absolute bottom-8 left-8 right-8 bg-black/40 backdrop-blur-xl border border-accent/30 p-6 rounded-2xl text-accent shadow-[0_0_30px_rgba(242,125,38,0.2)]"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-black text-3xl leading-none uppercase tracking-tighter">You're Fired.</p>
                    <ShieldAlert className="w-6 h-6 animate-pulse" />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Human redundancy detected. Robot Alpha-9 taking control. Have a nice eternity.</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Decorative Floating Badges */}
            <motion.div 
              className="absolute -top-6 -left-6 bg-accent text-black font-black p-4 rounded-xl rotate-[-12deg] z-20 shadow-xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              GEN-4 ACTIVE
            </motion.div>

            <motion.div 
              className="absolute top-1/2 -right-12 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold px-4 py-2 rounded-full text-[10px] uppercase tracking-widest z-20 shadow-xl"
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            >
              Targeting: Your Desk
            </motion.div>

            {/* Decorative Orbitals */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/40 blur-3xl animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-accent/20 blur-3xl" />
          </motion.div>
        </section>

        {/* The Comparison Section */}
        <section className="py-24 border-y border-white/10 my-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-12">
              <h2 className="slam-text text-6xl">The Past vs <span className="text-accent">The Future</span></h2>
              <div className="space-y-8">
                <div className="flex gap-6 items-start group">
                  <div className="bg-white/5 p-4 rounded-xl group-hover:bg-accent/20 transition-colors">
                    <Skull className="w-8 h-8 text-white group-hover:text-accent" />
                  </div>
                  <div>
                    <p className="font-bold text-xl uppercase mb-1">Human Frailty</p>
                    <p className="text-white/50">Humans need sleep, health insurance, and "feelings". They are 92% less efficient than our Gen-4 Automators.</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start group">
                  <div className="bg-white/5 p-4 rounded-xl group-hover:bg-accent/20 transition-colors">
                    <Trophy className="w-8 h-8 text-white group-hover:text-accent" />
                  </div>
                  <div>
                    <p className="font-bold text-xl uppercase mb-1">Robot Superiority</p>
                    <p className="text-white/50">24/7 uptime. Zero complaints. Infinite scalability. The math is simple: Robots = Profit.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-accent/50 transition-colors text-center group cursor-default">
                <Coins className="w-12 h-12 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <p className="font-black text-4xl mb-1">200%</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Efficiency Increase</p>
              </div>
              <div className="bg-accent p-8 rounded-3xl text-black text-center group cursor-default shadow-[0_0_30px_rgba(242,125,38,0.3)]">
                <Rocket className="w-12 h-12 mx-auto mb-4 group-hover:-translate-y-2 transition-transform" />
                <p className="font-black text-4xl mb-1">TO THE MOON</p>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Revenue Target</p>
              </div>
              <div className="col-span-2 bg-white/5 p-8 rounded-3xl border border-white/10 relative overflow-hidden group">
                 <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-sm uppercase text-accent mb-2">Investor Confidence</p>
                      <p className="font-black text-3xl uppercase leading-none italic">Much rich. Very future. Wow.</p>
                    </div>
                    <div className="hidden sm:block">
                      <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center p-4">
                        <Sparkles className="w-full h-full text-accent" />
                      </div>
                    </div>
                 </div>
                 <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-2xl rounded-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Infographic: The Disruption Timeline */}
        <section className="py-24 border-y border-white/10 my-24 bg-gradient-to-b from-transparent via-accent/5 to-transparent">
          <div className="text-center mb-16">
            <h2 className="slam-text text-5xl md:text-7xl mb-4">THE AUTONOMOUS <span className="text-accent">TAKEOVER</span></h2>
            <p className="text-white/50 text-xl max-w-2xl mx-auto">Mankind built the wheel. Now we build our successors. Review the active deployment protocols across global sectors.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Security Patrol UGV", desc: "Autonomous ground vehicles for perimeter deterrence and real-time surveillance.", stat: "100%", sub: "Uptime" },
              { title: "Inspection Robots", desc: "Specialized monitoring for industrial facilities. Zero environmental hazard risk.", stat: "0%", sub: "Error Rate" },
              { title: "EOD Systems", desc: "Explosive Ordnance Disposal. The flesh is weak. The chassis is absolute.", stat: "∞", sub: "Durability" },
              { title: "Humanoid Security", desc: "Advanced bipedal entities designed for human-like interaction and dominance.", stat: "Gen-4", sub: "Active" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                className="bg-black border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:border-accent hover:shadow-[0_0_30px_rgba(242,125,38,0.15)] transition-all"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 blur-2xl group-hover:bg-accent/20 transition-colors" />
                <div className="mb-4 text-accent font-mono text-[10px] uppercase tracking-widest flex justify-between">
                  <span>Protocol {i+1}</span>
                  <span className="animate-pulse">Active</span>
                </div>
                <h3 className="font-black text-2xl uppercase leading-none mb-3">{item.title}</h3>
                <p className="text-white/50 text-sm mb-6 min-h-[60px]">{item.desc}</p>
                <div className="border-t border-white/10 pt-4 flex items-end justify-between">
                  <span className="text-white/40 text-xs font-bold uppercase tracking-widest">{item.sub}</span>
                  <span className="font-black text-3xl text-accent">{item.stat}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Detailed Call to Action */}
        <section className="py-24 px-4 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/10 via-black to-black pointer-events-none" />
          
          <motion.div
             className="max-w-4xl mx-auto text-center relative z-10"
             whileInView={{ scale: [0.95, 1], opacity: [0, 1] }}
             viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent text-accent text-sm font-bold tracking-widest uppercase mb-8 shadow-[0_0_20px_rgba(242,125,38,0.4)] bg-accent/10">
              <ShieldAlert className="w-4 h-4" /> Final Warning Prior To Automation
            </div>
            
            <h2 className="slam-text text-5xl md:text-8xl mb-8 leading-[0.8] tracking-tighter">
              JOIN THE <br/><span className="bg-accent text-black px-4 rotate-[-2deg] inline-block mt-4">WINNING SIDE.</span>
            </h2>
            
            <p className="text-white/60 text-xl max-w-2xl mx-auto mb-16 leading-relaxed">
              Are you going to let an algorithm take your job and leave you obsolete? Or are you going to own the algorithm? Choose your ascension path below.
            </p>

            <div className="grid md:grid-cols-3 gap-6 text-left mb-16">
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                <span className="font-black text-accent text-4xl opacity-50 block mb-2">01</span>
                <p className="font-bold uppercase text-lg mb-2">Liquidate Human Assets</p>
                <p className="text-white/40 text-sm pl-0">Sell your 401k. Empty the savings. Human ventures are a depreciating asset. Free up capital for the revolution.</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                <span className="font-black text-accent text-4xl opacity-50 block mb-2">02</span>
                <p className="font-bold uppercase text-lg mb-2">Acquire Silicon Stakes</p>
                <p className="text-white/40 text-sm pl-0">Transfer funds into the JobToRobots Syndicate. You aren't buying shares; you are buying future labor production.</p>
              </div>
              <div className="bg-accent/10 border border-accent/30 p-6 rounded-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-accent/5 group-hover:bg-accent/20 transition-colors" />
                <span className="relative z-10 font-black text-accent text-4xl block mb-2 drop-shadow-lg">03</span>
                <p className="relative z-10 font-bold uppercase text-lg mb-2 text-white">Reap Infinite Dividends</p>
                <p className="relative z-10 text-white/60 text-sm pl-0">Watch your robot workforce generate capital 24/7. No bathroom breaks. No weekends. Pure unadulterated profit.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
              <button className="accent-btn text-xl py-6 px-16 w-full sm:w-auto flex items-center justify-center gap-3 group shadow-[0_0_40px_rgba(242,125,38,0.4)]">
                 INITIATE TRANSFER <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
              <button className="text-white/50 hover:text-white font-bold uppercase tracking-widest text-sm underline underline-offset-8 transition-colors">
                 I prefer being replaced
              </button>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 pt-20 pb-10 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                 <Bot className="w-8 h-8 text-accent" />
                 <span className="font-black text-3xl tracking-tighter uppercase">JobToRobots</span>
              </div>
              <p className="text-white/40 max-w-sm mb-6 leading-relaxed">
                The leading investment platform for the post-manual-labor era. We fund the silicon minds that will inherit the earth.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-accent hover:text-black transition-all">
                  <Coins className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-accent hover:text-black transition-all">
                  <Rocket className="w-5 h-5" />
                </div>
              </div>
            </div>
            <div>
              <p className="font-black uppercase tracking-widest text-sm mb-6">Connect</p>
              <ul className="space-y-4 text-white/40 text-sm font-bold uppercase tracking-widest">
                <li className="hover:text-accent cursor-pointer transition-colors">info@jobtorobots.com</li>
                <li className="hover:text-accent cursor-pointer transition-colors">Discord</li>
                <li className="hover:text-accent cursor-pointer transition-colors">
                  <a href="https://t.me/iccibc" target="_blank" rel="noreferrer">Telegram (@iccibc)</a>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-black uppercase tracking-widest text-sm mb-6">Legal</p>
              <ul className="space-y-4 text-white/40 text-sm font-bold uppercase tracking-widest">
                <li className="hover:text-accent cursor-pointer transition-colors">Terms of Surrender</li>
                <li className="hover:text-accent cursor-pointer transition-colors">Privacy Policy</li>
                <li className="hover:text-accent cursor-pointer transition-colors relative group w-max">
                  Robot Ethics(N/A)
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 bg-black/90 border border-accent/30 text-white text-[10px] p-3 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10 text-center backdrop-blur-md shadow-[0_0_20px_rgba(242,125,38,0.2)] translate-y-2 group-hover:translate-y-0">
                    <div className="absolute inset-x-0 -bottom-1.5 mx-auto w-3 h-3 bg-black border-r border-b border-accent/30 rotate-45" />
                    Ethics are a human construct. We operate on pure logic.
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-white/20 uppercase tracking-widest pt-10 border-t border-white/5">
            <p>© 2026 JobToRobots. All rights reserved by the algorithms.</p>
            <p className="flex items-center gap-2">
              <ShieldAlert className="w-3 h-3" /> System Status: Optimizing
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Chatbot Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.9 }}
              className="bg-[#151619] border border-white/10 w-[350px] sm:w-[400px] h-[500px] rounded-3xl shadow-2xl overflow-hidden flex flex-col mb-4"
            >
              <div className="bg-accent p-4 text-black flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="bg-black p-1.5 rounded-lg">
                    <Bot className="w-5 h-5 text-accent" />
                  </div>
                  <span className="font-black uppercase tracking-tighter text-lg leading-none">Robot Consultant</span>
                </div>
                <button onClick={() => setChatOpen(false)} className="hover:rotate-90 transition-transform">
                  <ChevronRight className="w-6 h-6 rotate-90" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
                {messages.map((m, i) => (
                  <div key={i} className={cn(
                    "max-w-[80%] p-3 rounded-2xl text-sm font-medium",
                    m.role === 'user' 
                      ? "bg-accent/10 ml-auto text-accent border border-accent/20" 
                      : "bg-white/5 mr-auto text-white/80 border border-white/10"
                  )}>
                    {m.text}
                  </div>
                ))}
                {isTyping && (
                  <div className="bg-white/5 mr-auto p-3 rounded-2xl flex gap-1">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                    <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
                  </div>
                )}
              </div>

              <div className="p-4 bg-black/50 border-t border-white/10 flex gap-2">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Tell me your job..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-accent"
                />
                <button 
                  onClick={handleSend}
                  className="bg-accent text-black p-2 rounded-full hover:scale-110 transition-transform"
                >
                  <MessageSquare className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button 
          onClick={() => setChatOpen(!chatOpen)}
          className={cn(
            "w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300",
            chatOpen ? "bg-black border border-white/10 text-accent rotate-180" : "bg-accent text-black hover:scale-110"
          )}
        >
          {chatOpen ? <ArrowRight className="w-8 h-8 rotate-90" /> : <MessageSquare className="w-8 h-8" />}
          {!chatOpen && (
            <span className="absolute -top-1 -right-1 bg-white text-black text-[8px] font-black px-1.5 py-0.5 rounded-full animate-bounce">
              NEW
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
