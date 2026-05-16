export const safetyDecisionOptions = [
  { option: "Позволять", desc: "Выполнить только это одно действие", scenario: "Временные или разовые задачи", color: "yellow" },
  { option: "Всегда разрешать", desc: "Пропускать подтверждения для аналогичных команд", scenario: "Когда доверяете типу действий", color: "green" },
  { option: "Отклонять", desc: "Прекратить текущие действия", scenario: "Команда не соответствует ожиданиям", color: "red" },
];

export const safetyScenarios = [
  { icon: "Terminal", title: "Сторонние скрипты", desc: "Агент запускает скрипты Python, Shell или Node.js внутри проекта" },
  { icon: "Globe", title: "Сетевые запросы", desc: "Агенту нужно обратиться к внешним API через curl" },
  { icon: "AlertTriangle", title: "Системные команды", desc: "Команда может изменить конфигурацию системы или удалить файлы" },
];
