"use client";

import { HelpCircle, Info, DollarSign, RefreshCw, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "../../ui/SectionHeader";
import { TaxiDivider } from "../../ui/TaxiDivider";
import { qaSectionData } from "../../data/zcode/newdocs";

export function QASection() {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);
  const data = qaSectionData;

  const mainQuestions = [
    { 
      title: data.subsections.productPositioning.title, 
      a: data.subsections.productPositioning.a,
      icon: "Info"
    },
    { 
      title: data.subsections.isItFree.title, 
      a: data.subsections.isItFree.a,
      icon: "DollarSign"
    },
    { 
      title: data.subsections.reConfig.title, 
      a: data.subsections.reConfig.a,
      icon: "RefreshCw"
    },
    { 
      title: data.subsections.loadingIssue.title, 
      a: data.subsections.loadingIssue.a,
      icon: "Loader2"
    },
  ];

  const iconMap: Record<string, React.ElementType> = {
    HelpCircle,
    Info,
    DollarSign,
    RefreshCw,
    Loader2,
  };

  return (
    <section id="qa">
      <SectionHeader
        num="12"
        title={data.title}
        subtitle={data.subtitle}
      />

      {/* Main Questions */}
      <div className="space-y-4 mb-6">
        {mainQuestions.map((q, i) => {
          const Icon = iconMap[q.icon] || HelpCircle;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-4 rounded-xl ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
                  <Icon className="h-4 w-4 text-nyc-taxi" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2">{q.title}</h4>
                  <p className={`text-sm leading-relaxed ${th("text-white/70", "text-oklch(0.40 0 0)")}`}>
                    {q.a}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Other Questions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`p-4 rounded-xl ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
            <HelpCircle className="h-5 w-5 text-nyc-taxi" />
          </div>
          <h4 className="font-semibold">Другие вопросы</h4>
        </div>

        <div className="space-y-3">
          {data.subsections.otherQuestions.map((item, i) => (
            <div key={i} className={`p-3 rounded-lg ${th("bg-white/5", "bg-oklch(0.95 0 0)")}`}>
              <p className="font-medium text-sm mb-1">{item.q}</p>
              <p className={`text-sm ${th("text-white/60", "text-oklch(0.45 0 0)")}`}>{item.a}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <TaxiDivider />
    </section>
  );
}
