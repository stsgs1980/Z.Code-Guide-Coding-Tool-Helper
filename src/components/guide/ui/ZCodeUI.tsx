"use client";

import { motion } from "framer-motion";
import { Check, ChevronRight, ArrowRight } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { ClickableImage } from "./ImageModal";

// Step Card - для пошаговых инструкций
interface StepCardProps {
  step: number;
  title: string;
  description?: string;
  action?: string;
  options?: { label: string; desc: string }[];
  fields?: string[];
  image?: string | null;
  isLast?: boolean;
}

export function StepCard({ step, title, description, action, options, fields, image, isLast }: StepCardProps) {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);

  return (
    <div className="flex gap-4">
      {/* Step indicator */}
      <div className="flex flex-col items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
          th("bg-nyc-taxi text-black", "bg-nyc-taxi text-black")
        }`}>
          {step}
        </div>
        {!isLast && (
          <div className={`w-0.5 flex-1 mt-2 ${th("bg-white/10", "bg-oklch(0.85 0 0)")}`} />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-6">
        <h4 className="text-base font-semibold mb-2">{title}</h4>
        
        {description && (
          <p className={`text-sm mb-3 ${th("text-white/60", "text-oklch(0.40 0 0)")}`}>{description}</p>
        )}
        
        {action && (
          <p className={`text-sm mb-3 ${th("text-nyc-taxi", "text-nyc-taxi")}`}>
            <ChevronRight className="h-4 w-4 inline mr-1" />
            {action}
          </p>
        )}
        
        {options && (
          <ul className="space-y-2 mb-3">
            {options.map((opt, i) => (
              <li key={i} className={`text-sm flex items-start gap-2 ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>
                <Check className="h-4 w-4 text-nyc-taxi flex-shrink-0 mt-0.5" />
                <span><strong>{opt.label}</strong> — {opt.desc}</span>
              </li>
            ))}
          </ul>
        )}
        
        {fields && (
          <ul className="space-y-1 mb-3">
            {fields.map((field, i) => (
              <li key={i} className={`text-sm flex items-center gap-2 ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>
                <ArrowRight className="h-3 w-3 text-nyc-taxi flex-shrink-0" />
                {field}
              </li>
            ))}
          </ul>
        )}
        
        {image && (
          <div className="mt-3">
            <ClickableImage src={image} alt={title} className={`w-full rounded-lg border ${th("border-white/5", "border-oklch(0.88 0 0)")}`} />
          </div>
        )}
      </div>
    </div>
  );
}

// Feature Card - для карточек возможностей
interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  features?: string[];
  shortcut?: string;
  color?: string;
}

export function FeatureCard({ icon: Icon, title, description, features, shortcut, color = "nyc-taxi" }: FeatureCardProps) {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);
  const card = th("nyc-card-enhanced", "rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`${card} p-4`}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
          <Icon className={`h-4 w-4 text-${color}`} />
        </div>
        <span className="font-semibold">{title}</span>
        {shortcut && (
          <code className={`text-xs px-1.5 py-0.5 rounded ml-auto ${th("bg-white/5 text-nyc-taxi", "bg-oklch(0.93 0 0) text-oklch(0.78 0.16 85)")}`}>
            {shortcut}
          </code>
        )}
      </div>
      <p className={`text-sm mb-2 ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>{description}</p>
      {features && (
        <ul className="space-y-1">
          {features.map((f, i) => (
            <li key={i} className={`text-xs flex items-center gap-1.5 ${th("text-white/40", "text-oklch(0.50 0 0)")}`}>
              <span className="nyc-status-dot nyc-status-active flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

// Mode Card - для режимов разрешений
interface ModeCardProps {
  name: string;
  color: string;
  desc: string;
  bestFor: string;
}

export function ModeCard({ name, color, desc, bestFor }: ModeCardProps) {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);
  const card = th("nyc-card-enhanced", "rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm");

  const colorClasses: Record<string, string> = {
    green: "bg-green-500/10 text-green-400",
    blue: "bg-blue-500/10 text-blue-400",
    yellow: "bg-amber-500/10 text-amber-400",
    purple: "bg-purple-500/10 text-purple-400",
    red: "bg-red-500/10 text-red-400",
    cyan: "bg-cyan-500/10 text-cyan-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`${card} p-4`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className={`text-xs px-2 py-1 rounded ${colorClasses[color] || colorClasses.yellow}`}>
          {name}
        </span>
      </div>
      <p className={`text-sm mb-2 ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>{desc}</p>
      <p className={`text-xs ${th("text-white/30", "text-oklch(0.55 0 0)")}`}>
        Лучше для: <span className="text-nyc-taxi">{bestFor}</span>
      </p>
    </motion.div>
  );
}

// FAQ Item
interface FAQItemProps {
  question: string;
  answer: string;
}

export function FAQItem({ question, answer }: FAQItemProps) {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);

  return (
    <div className={`p-4 rounded-lg ${th("bg-white/[0.02]", "bg-oklch(0.97 0 0)")}`}>
      <h4 className={`text-sm font-semibold mb-2 ${th("text-white/80", "text-oklch(0.25 0 0)")}`}>
        Q: {question}
      </h4>
      <p className={`text-sm ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>
        {answer}
      </p>
    </div>
  );
}

// Tip Box
interface TipBoxProps {
  children: React.ReactNode;
  icon?: React.ElementType;
}

export function TipBox({ children, icon: Icon }: TipBoxProps) {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);

  return (
    <div className={`${th("bg-white/[0.03] border-l-2 border-nyc-taxi/30", "bg-oklch(0.96 0 0) border-l-2 border-oklch(0.78 0.16 85 / 30%)")} p-3 rounded-r-lg`}>
      <p className={`text-sm ${th("text-white/50", "text-oklch(0.40 0 0)")}`}>
        {Icon && <Icon className="h-4 w-4 inline mr-1 text-nyc-taxi" />}
        {children}
      </p>
    </div>
  );
}

// Keyboard Shortcut Row
interface ShortcutRowProps {
  keys: string[];
  action: string;
}

export function ShortcutRow({ keys, action }: ShortcutRowProps) {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);

  return (
    <div className="flex items-center justify-between py-2">
      <span className={`text-sm ${th("text-white/60", "text-oklch(0.35 0 0)")}`}>{action}</span>
      <div className="flex items-center gap-1">
        {keys.map((key, i) => (
          <span key={i}>
            <kbd className={`text-xs px-2 py-1 rounded ${th("bg-white/5 border border-white/10", "bg-oklch(0.93 0 0) border border-oklch(0.85 0 0)")}`}>
              {key}
            </kbd>
            {i < keys.length - 1 && <span className={`mx-1 ${th("text-white/30", "text-oklch(0.60 0 0)")}`}>+</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
