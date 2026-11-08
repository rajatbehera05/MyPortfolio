import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowLeft, 
  Clock, 
  Share2,
  Compass,
  Flame,
  ShieldCheck,
  Target,
  Hammer
} from 'lucide-react';
import ConnectedNetworkBackground from '../components/ConnectedNetworkBackground';
import CosmicThemeSwitcher from '../components/CosmicThemeSwitcher';
import LiquidButton from '../components/LiquidButton';
import WireframeCube from '../components/WireframeCube';
import { useTimeEnvironment } from '../hooks/useTimeEnvironment';

/**
 * TheoryPage — THE POWER OF OUR MIND
 * Five Principles That Shape the Way I Think
 * by Rajat Behera
 */
export default function TheoryPage() {
  const navigate = useNavigate();
  const timeEnv = useTimeEnvironment();

  // Ensure route change starts at the very top of the window
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'THE POWER OF OUR MIND — Rajat Behera',
          text: 'Five Principles That Shape the Way I Think by Rajat Behera.',
          url: window.location.href,
        });
      } catch {
        // Fallback silently if share was dismissed
      }
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div
      data-theme={timeEnv.isNight ? 'night' : 'light'}
      className={`relative min-h-screen font-sans-editorial antialiased selection:bg-[#2563EB]/15 selection:text-[#2563EB] transition-colors duration-700 ${
        timeEnv.isNight ? 'bg-[#081426] text-[#F1F5FF]' : 'bg-[#EDF2F7] text-[#0F172A]'
      }`}
    >
      {/* 1. Aurora Ambient Atmosphere */}
      <ConnectedNetworkBackground isNight={timeEnv.isNight} />

      {/* 2. Floating Top-Left Minimal Cosmic Theme Switcher */}
      <CosmicThemeSwitcher timeEnv={timeEnv} />

      {/* 3. Sticky Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 pt-3 sm:pt-4 flex items-center justify-center pointer-events-none">
        <div
          className={`pointer-events-auto transition-all duration-300 w-full max-w-[1240px] mx-4 sm:mx-6 px-4 sm:px-6 h-14 sm:h-15 backdrop-blur-xl border rounded-2xl flex items-center justify-between shadow-[0_10px_32px_rgba(15,23,42,0.06),0_1px_2px_rgba(15,23,42,0.04)] ${
            timeEnv.isNight
              ? 'bg-[#0B172E]/90 border-[rgba(150,180,230,0.2)]'
              : 'bg-white/90 border-[#D5DFEB]'
          }`}
        >
          {/* Back to Portfolio CTA */}
          <LiquidButton
            variant="secondary"
            size="sm"
            onClick={handleBackToHome}
            aria-label="Back to Portfolio"
          >
            <span className="flex items-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Portfolio</span>
            </span>
          </LiquidButton>

          {/* Right Brand Monogram */}
          <button
            type="button"
            onClick={handleBackToHome}
            className="flex items-center gap-2 text-[12px] sm:text-[13px] font-mono font-bold text-[#64748B] hover:text-[#0F172A] transition-colors cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
            <span className="tracking-wider">RAJAT BEHERA / THEORY</span>
          </button>
        </div>
      </header>

      {/* 4. Main Editorial Essay Container */}
      <main className="relative z-10 pt-24 sm:pt-28 md:pt-32 pb-24 max-w-[840px] mx-auto px-4 sm:px-8">
        
        {/* Article Header & Metadata */}
        <header className="space-y-6 pb-10 border-b border-[#D5DFEB]/60">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-[12px] font-semibold tracking-wider uppercase">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/25">
              <Sparkles className="w-3 h-3" />
              <span>My Theory</span>
            </span>
            <span className="text-[#94A3B8]">•</span>
            <span className="flex items-center gap-1 text-[#64748B] font-mono">
              <Clock className="w-3.5 h-3.5" />
              <span>5 min read</span>
            </span>
            <span className="text-[#94A3B8]">•</span>
            <span className="text-[#64748B] font-mono">Personal Philosophy</span>
          </div>

          <div className="flex items-start gap-4">
            <WireframeCube
              size={40}
              color="#2563EB"
              tiltX={24}
              tiltZ={-16}
              duration={16}
              reverse={false}
              divisions={3}
              floating={false}
              className="shrink-0 mt-2 hidden sm:block"
            />
            <div>
              <h1 className="font-editorial-serif text-[32px] xs:text-[40px] sm:text-[52px] md:text-[60px] font-normal tracking-tight leading-[1.08] uppercase">
                THE POWER OF OUR MIND
              </h1>
              <h2 className="mt-2.5 sm:mt-3 text-[18px] sm:text-[22px] md:text-[24px] font-medium tracking-tight text-[#2563EB] [data-theme='night']_&:text-[#60A5FA]">
                Five Principles That Shape the Way I Think
              </h2>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#2563EB] to-[#8B5CF6] flex items-center justify-center text-white font-bold text-sm shadow-md">
                RB
              </div>
              <div>
                <p className="text-[14px] font-semibold tracking-tight">Rajat Behera</p>
                <p className="text-[12px] text-[#64748B] font-mono">Engineering &amp; Systems Thinking</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-medium border border-[#D5DFEB] hover:border-[#2563EB]/40 transition-colors cursor-pointer text-[#475569] hover:text-[#0F172A] [data-theme='night']_&:text-[#A9B8D0] [data-theme='night']_&:hover:text-white"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>
        </header>

        {/* Article Body */}
        <article className="mt-10 sm:mt-12 space-y-12 sm:space-y-16 text-[16.5px] sm:text-[18px] leading-[1.8] font-normal">
          
          {/* Introduction */}
          <div className="space-y-5 text-[17px] sm:text-[19px] leading-[1.85] text-[#1E293B] [data-theme='night']_&:text-[#E2E8F0]">
            <p>
              I believe the human mind holds a strength that we often fail to recognize. It has the power to change how we see ourselves, how we respond to challenges, and how far we are willing to go in life.
            </p>
            <p>
              But I also believe that strength does not come from simply thinking positively. It comes from confronting reality, accepting discomfort, learning from setbacks, and choosing to move forward even when everything inside you wants to stop.
            </p>
            <p>
              For me, mental strength is not about never feeling weak, frustrated, or defeated. It is about what you choose to do when those feelings appear.
            </p>
            <p className="font-medium text-[#0F172A] [data-theme='night']_&:text-white">
              Over time, I have developed five principles that represent how I think about personal growth, discipline, and becoming a stronger version of myself.
            </p>
          </div>

          <hr className="border-t border-[#D5DFEB]/60" />

          {/* Principle 01 */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5 text-[#2563EB] [data-theme='night']_&:text-[#60A5FA]">
              <Target className="w-5 h-5 shrink-0" />
              <span className="font-mono text-[13px] font-bold tracking-widest uppercase">Principle 01</span>
            </div>
            
            <h2 className="font-editorial-serif text-[26px] sm:text-[32px] md:text-[36px] font-normal tracking-tight uppercase">
              01. CONFRONT YOURSELF
            </h2>
            
            <p className="font-editorial-serif italic text-[18px] sm:text-[20px] text-[#475569] [data-theme='night']_&:text-[#94A3B8]">
              The first step towards change is accepting who you are today.
            </p>

            <p>
              Before trying to change the world around you, learn to face yourself.
            </p>
            <p>
              Be honest about your weaknesses, your mistakes, your excuses, and the time you have wasted. It is easy to blame circumstances, other people, or a lack of opportunities. But real improvement begins when you take responsibility for your own actions.
            </p>
            <p>
              Do not hide from the things you need to improve. Do not create excuses to protect your comfort.
            </p>

            <div className={`p-4 sm:p-5 rounded-2xl border-l-4 my-6 transition-colors ${
              timeEnv.isNight
                ? 'bg-[#0E1E3A]/60 border-l-[#60A5FA] border-y border-r border-[rgba(150,180,230,0.15)] text-[#E2E8F0]'
                : 'bg-white border-l-[#2563EB] border-y border-r border-[#D5DFEB] text-[#0F172A] shadow-xs'
            }`}>
              <p className="font-semibold text-[17px] sm:text-[18.5px]">
                You cannot change what you refuse to acknowledge.
              </p>
            </div>

            <p>
              The moment you start taking responsibility for yourself is the moment you take control of your direction.
            </p>
          </section>

          {/* Principle 02 */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5 text-[#8B5CF6] [data-theme='night']_&:text-[#A78BFA]">
              <Compass className="w-5 h-5 shrink-0" />
              <span className="font-mono text-[13px] font-bold tracking-widest uppercase">Principle 02</span>
            </div>

            <h2 className="font-editorial-serif text-[26px] sm:text-[32px] md:text-[36px] font-normal tracking-tight uppercase">
              02. DIG DEEPER INSIDE YOURSELF
            </h2>

            <p className="font-editorial-serif italic text-[18px] sm:text-[20px] text-[#475569] [data-theme='night']_&:text-[#94A3B8]">
              Your greatest source of strength may already exist within you.
            </p>

            <p>
              There will be moments when you feel exhausted, defeated, or uncertain about how to continue. Moments when your efforts seem meaningless and your goals feel further away than ever.
            </p>
            <p>
              That is when you need to dig deeper.
            </p>
            <p>
              Look back at everything you have overcome. Remember your failures, your difficult experiences, the lessons you have learned, and the reasons you started in the first place.
            </p>
            <p>
              Use those experiences as reminders of what you are capable of. Your setbacks do not have to define you; they can become the reason you grow stronger.
            </p>
            <p>
              When motivation disappears, let your determination take over.
            </p>

            <div className={`p-4 sm:p-5 rounded-2xl border-l-4 my-6 transition-colors ${
              timeEnv.isNight
                ? 'bg-[#0E1E3A]/60 border-l-[#A78BFA] border-y border-r border-[rgba(150,180,230,0.15)] text-[#E2E8F0]'
                : 'bg-white border-l-[#8B5CF6] border-y border-r border-[#D5DFEB] text-[#0F172A] shadow-xs'
            }`}>
              <p className="font-semibold text-[17px] sm:text-[18.5px]">
                When everything around you gives you a reason to stop, find the strength within you to remember why you started.
              </p>
            </div>
          </section>

          {/* Principle 03 */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5 text-[#F59E0B] [data-theme='night']_&:text-[#FBBF24]">
              <Flame className="w-5 h-5 shrink-0" />
              <span className="font-mono text-[13px] font-bold tracking-widest uppercase">Principle 03</span>
            </div>

            <h2 className="font-editorial-serif text-[26px] sm:text-[32px] md:text-[36px] font-normal tracking-tight uppercase">
              03. TURN YOUR ANGER INTO YOUR STRENGTH
            </h2>

            <p className="font-editorial-serif italic text-[18px] sm:text-[20px] text-[#475569] [data-theme='night']_&:text-[#94A3B8]">
              Do not waste your frustration. Give it a purpose.
            </p>

            <p>
              There are moments when you feel frustrated with yourself. Maybe because you are not where you wanted to be, because someone underestimated you, because you feel weaker than others, or because you know you are capable of more but have not done enough.
            </p>
            <p>
              I believe that frustration can become a powerful wake-up call.
            </p>
            <p>
              Instead of allowing anger to control your reactions, use it to question your actions. Let it remind you that you need to improve, work harder, and become better than you were yesterday.
            </p>
            <p>
              Do not waste your energy proving people wrong through arguments or reactions. Put that energy into your progress.
            </p>

            <div className={`p-4 sm:p-5 rounded-2xl border-l-4 my-6 transition-colors ${
              timeEnv.isNight
                ? 'bg-[#0E1E3A]/60 border-l-[#FBBF24] border-y border-r border-[rgba(150,180,230,0.15)] text-[#E2E8F0]'
                : 'bg-white border-l-[#F59E0B] border-y border-r border-[#D5DFEB] text-[#0F172A] shadow-xs'
            }`}>
              <p className="font-semibold text-[17px] sm:text-[18.5px]">
                Let your frustration become focus, your anger become discipline, and your desire to improve become action.
              </p>
            </div>
          </section>

          {/* Principle 04 */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5 text-[#10B981] [data-theme='night']_&:text-[#34D399]">
              <ShieldCheck className="w-5 h-5 shrink-0" />
              <span className="font-mono text-[13px] font-bold tracking-widest uppercase">Principle 04</span>
            </div>

            <h2 className="font-editorial-serif text-[26px] sm:text-[32px] md:text-[36px] font-normal tracking-tight uppercase">
              04. EMBRACE THE THINGS YOU HATE DOING
            </h2>

            <p className="font-editorial-serif italic text-[18px] sm:text-[20px] text-[#475569] [data-theme='night']_&:text-[#94A3B8]">
              Growth often begins where comfort ends.
            </p>

            <p>
              Not everything that helps you grow will feel exciting.
            </p>
            <p>
              Some of the most important things in life are repetitive, boring, uncomfortable, and difficult. There will be days when you do not feel like studying, practising, working, or following the routine you created for yourself.
            </p>
            <p>
              But those are the moments that matter.
            </p>
            <p>
              Anyone can show up when they feel motivated. The real challenge is showing up when the excitement disappears and all that remains is the responsibility to keep going.
            </p>
            <p>
              Embrace repetition. Accept discomfort. Learn to do what needs to be done, even when you do not feel like doing it.
            </p>

            <div className={`p-4 sm:p-5 rounded-2xl border-l-4 my-6 transition-colors ${
              timeEnv.isNight
                ? 'bg-[#0E1E3A]/60 border-l-[#34D399] border-y border-r border-[rgba(150,180,230,0.15)] text-[#E2E8F0]'
                : 'bg-white border-l-[#10B981] border-y border-r border-[#D5DFEB] text-[#0F172A] shadow-xs'
            }`}>
              <p className="font-semibold text-[17px] sm:text-[18.5px]">
                Mental toughness is built when you continue doing what matters, even when you do not enjoy doing it.
              </p>
            </div>
          </section>

          {/* Principle 05 */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5 text-[#EC4899] [data-theme='night']_&:text-[#F472B6]">
              <Hammer className="w-5 h-5 shrink-0" />
              <span className="font-mono text-[13px] font-bold tracking-widest uppercase">Principle 05</span>
            </div>

            <h2 className="font-editorial-serif text-[26px] sm:text-[32px] md:text-[36px] font-normal tracking-tight uppercase">
              05. STAY COMMITTED. NEVER STOP BUILDING.
            </h2>

            <p className="font-editorial-serif italic text-[18px] sm:text-[20px] text-[#475569] [data-theme='night']_&:text-[#94A3B8]">
              Be more committed to your growth than to your temporary feelings.
            </p>

            <p>
              Personal growth is not a one-day achievement. It is a continuous process.
            </p>
            <p>
              There will always be something to learn, something to improve, and another level to reach. You may achieve a goal today, but that does not mean your journey is complete.
            </p>
            <p>
              Stay connected to the reason you started. Keep improving your skills, correcting your mistakes, and building better habits.
            </p>
            <p>
              Do not depend entirely on motivation. Build discipline strong enough to carry you through the days when motivation is absent.
            </p>
            <p>
              You do not need to become a completely different person overnight. You need to keep making decisions that move you closer to the person you want to become.
            </p>

            <div className={`p-4 sm:p-5 rounded-2xl border-l-4 my-6 transition-colors ${
              timeEnv.isNight
                ? 'bg-[#0E1E3A]/60 border-l-[#F472B6] border-y border-r border-[rgba(150,180,230,0.15)] text-[#E2E8F0]'
                : 'bg-white border-l-[#EC4899] border-y border-r border-[#D5DFEB] text-[#0F172A] shadow-xs'
            }`}>
              <p className="font-semibold text-[17px] sm:text-[18.5px]">
                Keep showing up. Keep learning. Keep building. Never allow temporary setbacks to become permanent reasons to stop.
              </p>
            </div>
          </section>

          <hr className="border-t border-[#D5DFEB]/60" />

          {/* WHAT I BELIEVE */}
          <section className="space-y-6 pt-2">
            <h2 className="font-editorial-serif text-[28px] sm:text-[36px] md:text-[42px] font-normal tracking-tight uppercase">
              WHAT I BELIEVE
            </h2>

            <div className="space-y-5 text-[17px] sm:text-[19px] leading-[1.85]">
              <p>
                I believe the power of our mind is not simply the ability to think. It is the ability to decide how we respond to what life puts in front of us.
              </p>
              <p>
                Our weaknesses can teach us. Our failures can shape us. Our frustrations can awaken us. And the things we find difficult can become the very things that make us stronger.
              </p>
              <p className="font-semibold text-[#0F172A] [data-theme='night']_&:text-white">
                But none of this matters without action.
              </p>
              <p>
                You can have ambitions, plans, dreams, and the potential to achieve great things. Yet, without the willingness to confront yourself, face discomfort, and remain committed, that potential will remain unused.
              </p>
              <p>
                For me, becoming stronger is not about competing with everyone around me. It is about refusing to remain the same when I know I can become better.
              </p>
            </div>

            {/* Core Tenets Callout */}
            <div className={`p-6 sm:p-8 rounded-3xl border my-8 transition-colors ${
              timeEnv.isNight
                ? 'bg-gradient-to-br from-[#0F2244] to-[#0A162B] border-[rgba(150,180,230,0.22)] shadow-[0_12px_40px_rgba(0,0,0,0.4)]'
                : 'bg-gradient-to-br from-[#EEF4FF] via-white to-[#F5F3FF] border-[#D5DFEB] shadow-[0_12px_40px_rgba(37,99,235,0.08)]'
            }`}>
              <p className="font-editorial-serif text-[20px] sm:text-[25px] md:text-[28px] font-normal leading-snug tracking-tight text-[#1E3A8A] [data-theme='night']_&:text-[#C7D2FE]">
                Confront yourself. Dig deeper. Channel your emotions. Embrace discomfort. Stay committed.
              </p>
              <p className="mt-4 text-[14.5px] sm:text-[15.5px] text-[#475569] [data-theme='night']_&:text-[#94A3B8] leading-relaxed">
                These are not just five principles to follow. They represent the way I want to approach my life, my goals, and the person I am working towards becoming.
              </p>
            </div>

            <p className="font-editorial-serif italic text-[19px] sm:text-[22px] text-[#2563EB] [data-theme='night']_&:text-[#60A5FA] pt-2">
              This is how I understand the power of our mind.
            </p>
          </section>

        </article>

        {/* Footer Navigation CTA */}
        <footer className="mt-14 sm:mt-16 pt-8 border-t border-[#D5DFEB]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <LiquidButton
            variant="secondary"
            size="md"
            onClick={handleBackToHome}
          >
            <span className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Portfolio Homepage</span>
            </span>
          </LiquidButton>

          <LiquidButton
            variant="primary"
            size="md"
            onClick={() => {
              navigate('/projects');
            }}
          >
            <span>Explore Featured Projects</span>
          </LiquidButton>
        </footer>

      </main>
    </div>
  );
}
