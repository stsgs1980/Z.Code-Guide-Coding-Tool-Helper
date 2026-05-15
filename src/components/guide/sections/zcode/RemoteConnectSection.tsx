"use client";

import { Wifi, Terminal, Server, ArrowRight } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "../../ui/SectionHeader";
import { TaxiDivider } from "../../ui/TaxiDivider";
import { StepCard, TipBox, FeatureCard } from "../../ui/ZCodeUI";
import { remoteConnectSteps } from "../../data/zcode/newdocs";

export function RemoteConnectSection() {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);

  return (
    <section id="remote-connect">
      <SectionHeader
        num="03"
        title="Remote Development"
        subtitle="Подключение к удалённым серверам через SSH или Docker"
      />

      {/* Description */}
      <p className={`text-sm leading-relaxed mb-6 ${th("text-white/60", "text-oklch(0.35 0 0)")}`}>
        ZCode позволяет работать с кодом на удалённых серверах — через SSH или Docker контейнеры. 
        После подключения вы получаете полный доступ к файлам и терминалу сервера.
      </p>

      {/* Connection methods */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <FeatureCard
          icon={Server}
          title="SSH"
          description="Подключение к удалённому серверу по SSH протоколу"
          features={["Хост и порт", "Аутентификация: пароль/ключ", "Туннелирование"]}
        />
        <FeatureCard
          icon={Terminal}
          title="Docker"
          description="Работа с контейнерами Docker"
          features={["Выбор контейнера", "Монтирование томов", "Изоляция среды"]}
        />
      </div>

      {/* Steps */}
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Wifi className="h-5 w-5 text-nyc-taxi" />
        Подключение по SSH
      </h3>

      <div className="mb-6">
        {remoteConnectSteps.map((step, i) => (
          <StepCard
            key={step.step}
            step={step.step}
            title={step.title}
            description={step.description}
            options={step.options}
            fields={step.fields}
            image={step.image}
            isLast={i === remoteConnectSteps.length - 1}
          />
        ))}
      </div>

      {/* Remote access features */}
      <div className={`p-5 mb-6 ${th("nyc-card-highlight-enhanced", "rounded-xl border border-oklch(0.78 0.16 85 / 25%) bg-oklch(0.99 0 0) shadow-sm")}`}>
        <h4 className="text-sm font-semibold mb-3">Мобильный доступ</h4>
        <p className={`text-sm ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>
          После запуска remote-сервиса ZCode генерирует QR-код или ссылку для подключения с другого устройства. 
          Это позволяет продолжить работу с мобильных устройств без компьютера.
        </p>
      </div>

      <TipBox>
        При первом подключении SSH-ключ сохраняется в <code className="text-nyc-taxi">~/.ssh/known_hosts</code>.
      </TipBox>

      <TaxiDivider />
    </section>
  );
}
