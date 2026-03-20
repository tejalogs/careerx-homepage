"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TESTIMONIALS = [
  {
    quote:
      "I'd been applying for six months with zero traction. After going through the KYB assessment and Career Track, I had three interviews lined up in my first week of activation. I genuinely didn't know what I was doing wrong until CareerXcelerator showed me.",
    name: "Aoife Brennan",
    role: "Product Manager",
    company: "Stripe",
    from: "Career switcher from operations",
    avatar: "https://i.pravatar.cc/100?img=47",
    metric: "Offer in 3 weeks",
  },
  {
    quote:
      "The interview simulator was the single biggest difference. I'd done mock interviews before, but having AI that gives you scored, specific feedback after every answer is a completely different level of preparation. I walked into my final round already knowing I was ready.",
    name: "Marcus Okafor",
    role: "Software Engineer",
    company: "Salesforce",
    from: "Recent computer science graduate",
    avatar: "https://i.pravatar.cc/100?img=52",
    metric: "87% interview pass rate",
  },
  {
    quote:
      "As an international student, I had no idea where my skills fit in the Irish market. The role-matching was eye-opening — it showed me exactly which companies were actively hiring for my profile and what I needed to close the gap. I didn't just get a job, I got the right job.",
    name: "Priya Mehta",
    role: "Data Analyst",
    company: "Accenture",
    from: "International student, MSc Analytics",
    avatar: "https://i.pravatar.cc/100?img=45",
    metric: "2.1× salary vs. initial target",
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="w-full py-28 px-6 overflow-hidden" style={{ backgroundColor: "#F5F7FF" }}>
      <div ref={ref} className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6"
            style={{ backgroundColor: "rgba(60,97,168,0.07)", borderColor: "rgba(60,97,168,0.2)" }}
          >
            <p className="text-[10px] font-black tracking-[0.2em] uppercase" style={{ color: "#3C61A8" }}>
              Candidate Stories
            </p>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black tracking-tight leading-tight"
            style={{ color: "#0C0E14" }}
          >
            Real people.{" "}
            <span style={{ color: "#3C61A8" }}>Real offers.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg max-w-xl mx-auto"
            style={{ color: "rgba(12,14,20,0.6)" }}
          >
            From first assessment to signed offer. Here&apos;s what candidates say about the process.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.12 }}
              className="flex flex-col bg-white rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-all duration-500 border border-gray-100"
            >
              {/* Metric badge */}
              <div
                className="self-start px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6"
                style={{ backgroundColor: "rgba(60,97,168,0.08)", color: "#3C61A8" }}
              >
                {t.metric}
              </div>

              {/* Quote */}
              <p className="text-sm leading-relaxed flex-1 mb-8" style={{ color: "rgba(12,14,20,0.7)" }}>
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-6 border-t border-gray-100">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                />
                <div>
                  <p className="text-sm font-black" style={{ color: "#0C0E14" }}>{t.name}</p>
                  <p className="text-xs font-medium" style={{ color: "#3C61A8" }}>
                    {t.role} · {t.company}
                  </p>
                  <p className="text-[10px] mt-0.5" style={{ color: "rgba(12,14,20,0.45)" }}>{t.from}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
