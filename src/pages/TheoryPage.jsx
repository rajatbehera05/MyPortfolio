import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Compass,
  Flame,
  ShieldCheck,
  Target,
  Hammer,
  Layers
} from 'lucide-react';
import ConnectedNetworkBackground from '../components/ConnectedNetworkBackground';
import CosmicThemeSwitcher from '../components/CosmicThemeSwitcher';
import LiquidButton from '../components/LiquidButton';
import WireframeCube from '../components/WireframeCube';
import { useTimeEnvironment } from '../hooks/useTimeEnvironment';

/**
 * TheoryPage — THE POWER OF OUR MIND
 * The Art of Taking Control of Your Own Mind
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
      <main className="relative z-10 pt-24 sm:pt-28 md:pt-32 pb-24 max-w-[1080px] mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Article Header */}
        <header className="max-w-[840px] mx-auto pb-8 border-b border-[#D5DFEB]/60">
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
                The Art of Taking Control of Your Own Mind
              </h2>
            </div>
          </div>
        </header>

        {/* Article Body */}
        <article className="mt-10 sm:mt-12 space-y-12 sm:space-y-16 text-[16.5px] sm:text-[18px] leading-[1.8] font-normal">
          
          {/* SECTION 1: THE IDEA BEHIND MY THEORY */}
          <section className="max-w-[840px] mx-auto space-y-6">
            <h2 className="font-editorial-serif text-[26px] sm:text-[32px] md:text-[36px] font-normal tracking-tight uppercase">
              THE IDEA BEHIND MY THEORY
            </h2>

            <div className="space-y-5 text-[17px] sm:text-[18.5px] leading-[1.85] text-[#1E293B] [data-theme='night']_&:text-[#E2E8F0]">
              <p>
                I have observed something in the way many people approach life. We naturally tend to choose what feels good, what feels comfortable, and what requires the least effort.
              </p>
              <p>
                We want to have fun, enjoy our time, and do the things we like. We take care of our responsibilities when they become unavoidable, but often fail to prioritise the things that genuinely matter for our growth, our goals, and our future.
              </p>
              <p>
                We know what needs to be done, yet we keep postponing it. We choose the easier option over the challenging one, even when we know that the difficult path might teach us something valuable.
              </p>
              <p className="font-medium text-[#0F172A] [data-theme='night']_&:text-white">
                And I believe this is where the real problem begins.
              </p>

              {/* Focal Callout 1 */}
              <div className={`p-5 sm:p-6 rounded-2xl border-l-4 my-6 transition-colors ${
                timeEnv.isNight
                  ? 'bg-[#0E1E3A]/60 border-l-[#60A5FA] border-y border-r border-[rgba(150,180,230,0.15)] text-[#F1F5FF]'
                  : 'bg-white border-l-[#2563EB] border-y border-r border-[#D5DFEB] text-[#0F172A] shadow-xs'
              }`}>
                <p className="font-semibold text-[17px] sm:text-[19px] leading-snug">
                  It is not always a lack of ability or opportunity. Sometimes, it is a lack of control over our own minds.
                </p>
              </div>

              <p>
                I believe this is one of the reasons many young people struggle to shape themselves into the people they want to become. They have ambitions, potential, and opportunities, but often fail to turn them into meaningful progress because they repeatedly allow temporary comfort and immediate desires to take priority over their long-term growth.
              </p>
              <p>
                Think about it. How often do we decide to complete a small but important task, only to find ourselves distracted by something more entertaining? How often do we know what is right for us but still choose what feels easier in that moment?
              </p>
              <p>
                I believe this happens when we allow our minds to control our decisions instead of learning to control our minds.
              </p>
              <p>
                Our minds naturally seek comfort, pleasure, and instant satisfaction. But we should not let every thought, feeling, or desire decide what we do.
              </p>

              {/* Focal Callout 2 */}
              <div className={`p-5 sm:p-6 rounded-2xl border-l-4 my-6 transition-colors ${
                timeEnv.isNight
                  ? 'bg-[#0E1E3A]/60 border-l-[#A78BFA] border-y border-r border-[rgba(150,180,230,0.15)] text-[#F1F5FF]'
                  : 'bg-white border-l-[#8B5CF6] border-y border-r border-[#D5DFEB] text-[#0F172A] shadow-xs'
              }`}>
                <p className="font-semibold text-[17px] sm:text-[19px] leading-snug">
                  We must learn to command our minds, rather than constantly being commanded by them.
                </p>
              </div>

              <p>
                And here is what I find fascinating: I believe the human mind is like a box full of surprises. When we begin to take control of it, challenge its limitations, and direct it towards something meaningful, we can discover strengths, abilities, and possibilities that we never expected ourselves to have.
              </p>
              <p className="text-[#334155] [data-theme='night']_&:text-[#CBD5E1]">
                The mind that once convinced us to postpone a task can become the same mind that pushes us to complete it. The mind that once searched for comfort can learn to embrace discomfort. The mind that once made excuses can learn to find solutions.
              </p>
            </div>
          </section>

          {/* SECTION 2: HOW I CHOOSE TO PRACTISE THIS (Distinct Visual Bridge) */}
          <section className={`max-w-[840px] mx-auto p-6 sm:p-8 md:p-9 rounded-3xl border transition-colors ${
            timeEnv.isNight
              ? 'bg-gradient-to-br from-[#0F2244]/80 via-[#0B172E]/90 to-[#081426] border-[rgba(150,180,230,0.22)] shadow-[0_12px_40px_rgba(0,0,0,0.35)]'
              : 'bg-gradient-to-br from-[#F8FAFC] via-[#EEF4FF]/70 to-[#F1F5F9] border-[#D5DFEB] shadow-[0_8px_32px_rgba(37,99,235,0.06)]'
          }`}>
            <div className="flex items-center gap-2 text-[#2563EB] [data-theme='night']_&:text-[#60A5FA] mb-3">
              <Compass className="w-4 h-4 shrink-0" />
              <span className="font-mono text-[11px] sm:text-[12px] font-bold tracking-widest uppercase">The Bridge • Philosophy to Action</span>
            </div>

            <h2 className="font-editorial-serif text-[24px] sm:text-[28px] md:text-[32px] font-normal tracking-tight uppercase mb-5 text-[#0F172A] [data-theme='night']_&:text-white">
              HOW I CHOOSE TO PRACTISE THIS
            </h2>

            <div className="space-y-4 text-[16.5px] sm:text-[18px] leading-[1.85] text-[#334155] [data-theme='night']_&:text-[#CBD5E1]">
              <p>
                This is what I believe in, and this is how I try to approach my own life. For me, taking control of my mind is not just about avoiding distractions or forcing myself to do difficult things. It is about continuously improving myself, developing mental strength, staying disciplined, and finding the determination to keep moving forward, regardless of the circumstances.
              </p>
              <p>
                I believe growth begins with the way we think, but it becomes real through the way we act.
              </p>
              <p className="font-medium text-[#0F172A] [data-theme='night']_&:text-white pt-1">
                To put this belief into practice, I follow five fundamental rules that guide the way I think, make decisions, face challenges, and work towards becoming a better version of myself.
              </p>
            </div>
          </section>

          {/* SECTION 3: FIVE RULES I BELIEVE IN */}
          <div className="max-w-[840px] mx-auto pt-2 pb-1 border-t border-[#D5DFEB]/60 w-full">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 text-[#2563EB] [data-theme='night']_&:text-[#60A5FA] border border-[#2563EB]/25 text-[11px] font-mono font-bold tracking-widest uppercase mt-6 mb-3">
              <Layers className="w-3 h-3" />
              <span>Personal Framework</span>
            </div>
            <h2 className="font-editorial-serif text-[30px] sm:text-[38px] md:text-[44px] font-normal tracking-tight uppercase">
              FIVE RULES I BELIEVE IN
            </h2>
          </div>

          {/* RULE 01: Image on Left, Content on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
            {/* Image 1: Confront Mirror */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-[#D5DFEB] [data-theme='night']_&:border-[rgba(150,180,230,0.2)] shadow-[0_12px_36px_rgba(15,23,42,0.08)] [data-theme='night']_&:shadow-[0_16px_40px_rgba(0,0,0,0.5)] bg-[#0B1528] group">
                <img
                  src="/assets/theory_confront_mirror.jpg"
                  alt="Confront Yourself"
                  className="w-full h-[260px] sm:h-[320px] lg:h-[360px] object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Content: Rule 01 */}
            <section className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2.5 text-[#2563EB] [data-theme='night']_&:text-[#60A5FA]">
                <Target className="w-5 h-5 shrink-0" />
                <span className="font-mono text-[13px] font-bold tracking-widest uppercase">Rule 01</span>
              </div>
              
              <h3 className="font-editorial-serif text-[26px] sm:text-[32px] md:text-[36px] font-normal tracking-tight uppercase">
                01. CONFRONT YOURSELF
              </h3>
              
              <p className="font-editorial-serif italic text-[18px] sm:text-[20px] text-[#475569] [data-theme='night']_&:text-[#94A3B8]">
                The first step towards change is accepting who you are today.
              </p>

              <p className="text-[#1E293B] [data-theme='night']_&:text-[#E2E8F0]">
                Be honest about your weaknesses, mistakes, excuses, and wasted time. Stop blaming circumstances or other people for everything. Take responsibility for your decisions and recognise the areas where you need to improve.
              </p>

              <div className={`p-4 sm:p-5 rounded-2xl border-l-4 my-5 transition-colors ${
                timeEnv.isNight
                  ? 'bg-[#0E1E3A]/60 border-l-[#60A5FA] border-y border-r border-[rgba(150,180,230,0.15)] text-[#E2E8F0]'
                  : 'bg-white border-l-[#2563EB] border-y border-r border-[#D5DFEB] text-[#0F172A] shadow-xs'
              }`}>
                <p className="font-semibold text-[17px] sm:text-[18.5px]">
                  You cannot change what you refuse to acknowledge.
                </p>
              </div>
            </section>
          </div>

          {/* RULE 02: Content on Left, Image on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center pt-4">
            {/* Content: Rule 02 */}
            <section className="lg:col-span-7 space-y-4 order-2 lg:order-1">
              <div className="flex items-center gap-2.5 text-[#8B5CF6] [data-theme='night']_&:text-[#A78BFA]">
                <Compass className="w-5 h-5 shrink-0" />
                <span className="font-mono text-[13px] font-bold tracking-widest uppercase">Rule 02</span>
              </div>

              <h3 className="font-editorial-serif text-[26px] sm:text-[32px] md:text-[36px] font-normal tracking-tight uppercase">
                02. DIG DEEPER INSIDE YOURSELF
              </h3>

              <p className="font-editorial-serif italic text-[18px] sm:text-[20px] text-[#475569] [data-theme='night']_&:text-[#94A3B8]">
                Your greatest source of strength may already exist within you.
              </p>

              <p className="text-[#1E293B] [data-theme='night']_&:text-[#E2E8F0]">
                When you feel exhausted, defeated, or uncertain, remember what you have already overcome. Look back at your setbacks, failures, experiences, and goals. Use them as reminders of why you started and what you are capable of achieving.
              </p>

              <div className={`p-4 sm:p-5 rounded-2xl border-l-4 my-5 transition-colors ${
                timeEnv.isNight
                  ? 'bg-[#0E1E3A]/60 border-l-[#A78BFA] border-y border-r border-[rgba(150,180,230,0.15)] text-[#E2E8F0]'
                  : 'bg-white border-l-[#8B5CF6] border-y border-r border-[#D5DFEB] text-[#0F172A] shadow-xs'
              }`}>
                <p className="font-semibold text-[17px] sm:text-[18.5px]">
                  When motivation disappears, let your determination take over.
                </p>
              </div>
            </section>

            {/* Image 2: Inner Strength Silhouette */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-[#D5DFEB] [data-theme='night']_&:border-[rgba(150,180,230,0.2)] shadow-[0_12px_36px_rgba(15,23,42,0.08)] [data-theme='night']_&:shadow-[0_16px_40px_rgba(0,0,0,0.5)] bg-[#0B1528] group">
                <img
                  src="/assets/theory_inner_strength.jpg"
                  alt="Dig Deeper Inside Yourself"
                  className="w-full h-[260px] sm:h-[320px] lg:h-[360px] object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* RULE 03: Image on Left, Content on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center pt-4">
            {/* Image 3: Street Walk with Briefcase */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-[#D5DFEB] [data-theme='night']_&:border-[rgba(150,180,230,0.2)] shadow-[0_12px_36px_rgba(15,23,42,0.08)] [data-theme='night']_&:shadow-[0_16px_40px_rgba(0,0,0,0.5)] bg-[#0B1528] group">
                <img
                  src="/assets/theory_street_walk.jpg"
                  alt="Turn Your Anger Into Your Strength"
                  className="w-full h-[260px] sm:h-[320px] lg:h-[360px] object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Content: Rule 03 */}
            <section className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2.5 text-[#F59E0B] [data-theme='night']_&:text-[#FBBF24]">
                <Flame className="w-5 h-5 shrink-0" />
                <span className="font-mono text-[13px] font-bold tracking-widest uppercase">Rule 03</span>
              </div>

              <h3 className="font-editorial-serif text-[26px] sm:text-[32px] md:text-[36px] font-normal tracking-tight uppercase">
                03. TURN YOUR ANGER INTO YOUR STRENGTH
              </h3>

              <p className="font-editorial-serif italic text-[18px] sm:text-[20px] text-[#475569] [data-theme='night']_&:text-[#94A3B8]">
                Do not waste your frustration. Give it a purpose.
              </p>

              <p className="text-[#1E293B] [data-theme='night']_&:text-[#E2E8F0]">
                There will be moments when you feel frustrated with yourself, your progress, or the feeling that you are capable of more than you are currently doing. Instead of allowing that frustration to control your reactions, turn it into a reason to improve.
              </p>

              <div className={`p-4 sm:p-5 rounded-2xl border-l-4 my-5 transition-colors ${
                timeEnv.isNight
                  ? 'bg-[#0E1E3A]/60 border-l-[#FBBF24] border-y border-r border-[rgba(150,180,230,0.15)] text-[#E2E8F0]'
                  : 'bg-white border-l-[#F59E0B] border-y border-r border-[#D5DFEB] text-[#0F172A] shadow-xs'
              }`}>
                <p className="font-semibold text-[17px] sm:text-[18.5px]">
                  Let your frustration become focus, your anger become discipline, and your desire to improve become action.
                </p>
              </div>
            </section>
          </div>

          {/* RULE 04: Content on Left, Image on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center pt-4">
            {/* Content: Rule 04 */}
            <section className="lg:col-span-7 space-y-4 order-2 lg:order-1">
              <div className="flex items-center gap-2.5 text-[#10B981] [data-theme='night']_&:text-[#34D399]">
                <ShieldCheck className="w-5 h-5 shrink-0" />
                <span className="font-mono text-[13px] font-bold tracking-widest uppercase">Rule 04</span>
              </div>

              <h3 className="font-editorial-serif text-[26px] sm:text-[32px] md:text-[36px] font-normal tracking-tight uppercase">
                04. EMBRACE THE THINGS YOU HATE DOING
              </h3>

              <p className="font-editorial-serif italic text-[18px] sm:text-[20px] text-[#475569] [data-theme='night']_&:text-[#94A3B8]">
                Growth often begins where comfort ends.
              </p>

              <p className="text-[#1E293B] [data-theme='night']_&:text-[#E2E8F0]">
                Not everything that helps you grow will be enjoyable. Some tasks will be repetitive, boring, uncomfortable, or difficult. Do them anyway. Whether it is a small responsibility or a challenging goal, learn to show up even when you do not feel like it.
              </p>

              <div className={`p-4 sm:p-5 rounded-2xl border-l-4 my-5 transition-colors ${
                timeEnv.isNight
                  ? 'bg-[#0E1E3A]/60 border-l-[#34D399] border-y border-r border-[rgba(150,180,230,0.15)] text-[#E2E8F0]'
                  : 'bg-white border-l-[#10B981] border-y border-r border-[#D5DFEB] text-[#0F172A] shadow-xs'
              }`}>
                <p className="font-semibold text-[17px] sm:text-[18.5px]">
                  Mental toughness is built when you continue doing what matters, even when you do not enjoy doing it.
                </p>
              </div>
            </section>

            {/* Image 4: Desk Study Late Night */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-[#D5DFEB] [data-theme='night']_&:border-[rgba(150,180,230,0.2)] shadow-[0_12px_36px_rgba(15,23,42,0.08)] [data-theme='night']_&:shadow-[0_16px_40px_rgba(0,0,0,0.5)] bg-[#0B1528] group">
                <img
                  src="/assets/theory_desk_study.jpg"
                  alt="Embrace The Things You Hate Doing"
                  className="w-full h-[260px] sm:h-[320px] lg:h-[360px] object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* RULE 05 (Centered feature layout) */}
          <div className="max-w-[840px] mx-auto pt-6 w-full">
            <section className="space-y-4">
              <div className="flex items-center gap-2.5 text-[#EC4899] [data-theme='night']_&:text-[#F472B6]">
                <Hammer className="w-5 h-5 shrink-0" />
                <span className="font-mono text-[13px] font-bold tracking-widest uppercase">Rule 05</span>
              </div>

              <h3 className="font-editorial-serif text-[26px] sm:text-[32px] md:text-[36px] font-normal tracking-tight uppercase">
                05. STAY COMMITTED. NEVER STOP BUILDING.
              </h3>

              <p className="font-editorial-serif italic text-[18px] sm:text-[20px] text-[#475569] [data-theme='night']_&:text-[#94A3B8]">
                Be more committed to your growth than to your temporary feelings.
              </p>

              <p className="text-[#1E293B] [data-theme='night']_&:text-[#E2E8F0]">
                Growth is not a one-day achievement. Keep learning, correcting your mistakes, improving your habits, and working towards your goals. Do not depend entirely on motivation. Build the discipline to continue even when motivation disappears.
              </p>

              <div className={`p-4 sm:p-5 rounded-2xl border-l-4 my-5 transition-colors ${
                timeEnv.isNight
                  ? 'bg-[#0E1E3A]/60 border-l-[#F472B6] border-y border-r border-[rgba(150,180,230,0.15)] text-[#E2E8F0]'
                  : 'bg-white border-l-[#EC4899] border-y border-r border-[#D5DFEB] text-[#0F172A] shadow-xs'
              }`}>
                <p className="font-semibold text-[17px] sm:text-[18.5px]">
                  Keep showing up. Keep learning. Keep building. Never allow temporary setbacks to become permanent reasons to stop.
                </p>
              </div>
            </section>
          </div>

          <hr className="max-w-[840px] mx-auto border-t border-[#D5DFEB]/60 w-full" />

          {/* SECTION 4: WHAT I BELIEVE (Conclusion) */}
          <section className="max-w-[840px] mx-auto space-y-6 pt-2">
            <h2 className="font-editorial-serif text-[28px] sm:text-[36px] md:text-[42px] font-normal tracking-tight uppercase">
              WHAT I BELIEVE
            </h2>

            <div className="space-y-5 text-[17px] sm:text-[19px] leading-[1.85]">
              <p>
                I do not believe that controlling your mind means suppressing every desire, avoiding enjoyment, or making life unnecessarily difficult.
              </p>
              <p>
                It means knowing when to enjoy yourself and when to take responsibility. It means understanding that temporary comfort should not repeatedly come at the cost of your long-term growth.
              </p>
              <p className="font-semibold text-[#0F172A] [data-theme='night']_&:text-white">
                Your mind is powerful, but that power needs direction.
              </p>

              {/* Core Thesis Callout */}
              <div className={`p-6 sm:p-8 rounded-3xl border my-8 transition-colors ${
                timeEnv.isNight
                  ? 'bg-gradient-to-br from-[#0F2244] to-[#0A162B] border-[rgba(150,180,230,0.22)] shadow-[0_12px_40px_rgba(0,0,0,0.4)]'
                  : 'bg-gradient-to-br from-[#EEF4FF] via-white to-[#F5F3FF] border-[#D5DFEB] shadow-[0_12px_40px_rgba(37,99,235,0.08)]'
              }`}>
                <p className="font-editorial-serif text-[21px] sm:text-[26px] md:text-[30px] font-normal leading-snug tracking-tight text-[#1E3A8A] [data-theme='night']_&:text-[#C7D2FE]">
                  Do not let your mind decide your limits. Train it to help you discover them.
                </p>
              </div>

              <p>
                The moment you begin taking command of your own mind, you begin taking command of your actions, your habits, and ultimately, the direction of your life.
              </p>
            </div>

            <p className="font-editorial-serif italic text-[19px] sm:text-[22px] text-[#2563EB] [data-theme='night']_&:text-[#60A5FA] pt-3">
              This is how I understand the power of our mind.
            </p>
          </section>

        </article>

        {/* Footer Navigation CTA */}
        <footer className="max-w-[840px] mx-auto mt-14 sm:mt-16 pt-8 border-t border-[#D5DFEB]/60 flex items-center justify-center">
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
        </footer>

      </main>
    </div>
  );
}
