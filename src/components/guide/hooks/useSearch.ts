"use client";

import { useState, useCallback, useMemo } from "react";
import { tocItems } from "../data/toc";
import { tools } from "../data/tools";
import { commands } from "../data/commands";
import { plans } from "../data/plans";
import { models } from "../data/models";
import { mcpServers } from "../data/mcpServers";
import { errors } from "../data/errors";

interface SearchResult {
  id: string;
  title: string;
  snippet: string;
  sectionId: string;
}

const searchableContent: { id: string; title: string; text: string; sectionId: string }[] = [
  ...tocItems.map((t) => ({ id: t.id, title: t.title, text: t.title, sectionId: t.id })),
  ...tools.map((t) => ({ id: `tool-${t.id}`, title: t.name, text: `${t.name} ${t.description}`, sectionId: "tools" })),
  ...commands.map((c) => ({ id: `cmd-${c.cmd}`, title: c.cmd, text: `${c.cmd} ${c.description}`, sectionId: "helper" })),
  ...plans.map((p) => ({ id: `plan-${p.id}`, title: p.name, text: `${p.name} ${p.price} ${p.promptsPerWeek}`, sectionId: "plan" })),
  ...models.map((m) => ({ id: `model-${m.id}`, title: m.name, text: `${m.name} ${m.description} ${m.useCase}`, sectionId: "models" })),
  ...mcpServers.map((s) => ({ id: `mcp-${s.id}`, title: s.name, text: `${s.name} ${s.description}`, sectionId: "mcp" })),
  ...errors.map((e) => ({ id: `err-${e.error}`, title: e.error, text: `${e.error} ${e.cause} ${e.fix}`, sectionId: "troubleshoot" })),
  {
    id: "quick-start-reg",
    title: "Регистрация",
    text: "Зарегистрируйтесь на z.ai и получите API-ключ",
    sectionId: "quick-start",
  },
  {
    id: "quick-start-api",
    title: "API-ключ",
    text: "Создайте API-ключ в панели управления z.ai/manage-apikey",
    sectionId: "quick-start",
  },
];

export function useSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const results = useMemo<SearchResult[]>(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return searchableContent
      .filter((item) => item.text.toLowerCase().includes(q))
      .slice(0, 10)
      .map((item) => ({
        id: item.id,
        title: item.title,
        snippet: item.text.slice(0, 100),
        sectionId: item.sectionId,
      }));
  }, [query]);

  const openSearch = useCallback(() => setIsOpen(true), []);
  const closeSearch = useCallback(() => {
    setIsOpen(false);
    setQuery("");
  }, []);

  const navigateToResult = useCallback(
    (sectionId: string) => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      closeSearch();
    },
    [closeSearch]
  );

  return { query, setQuery, isOpen, openSearch, closeSearch, results, navigateToResult };
}
