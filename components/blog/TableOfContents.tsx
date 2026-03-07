// components/blog/TableOfContents.tsx
"use client";

import { useEffect, useState } from "react";
import { TocItem } from "@/lib/toc";

export default function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (!items.length) return;

    const ids: string[] = [];
    function collect(list: TocItem[]) {
      list.forEach((item) => {
        ids.push(item.id);
        collect(item.children);
      });
    }
    collect(items);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-15% 0% -75% 0%" }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 110;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveId(id);
  }

  if (!items.length) return null;

  function renderItems(list: TocItem[], depth = 0): React.ReactNode {
    return list.map((item) => {
      const isActive = activeId === item.id;
      return (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            onClick={(e) => handleClick(e, item.id)}
            className={[
              "flex items-start gap-2 py-1.5 px-2.5 rounded-lg text-[13px] leading-snug transition-all duration-150 no-underline",
              depth > 0 ? "ml-4" : "",
              isActive
                ? "text-orange-500 font-semibold bg-orange-50"
                : "text-gray-500 hover:text-gray-800 hover:bg-gray-50",
            ].join(" ")}
          >
            <span
              className={[
                "flex-shrink-0 rounded-full mt-[5px] transition-all",
                item.level === 2
                  ? `w-2 h-2 border-2 ${isActive ? "border-orange-500 bg-orange-500" : "border-gray-300"}`
                  : item.level === 3
                  ? `w-1.5 h-1.5 ${isActive ? "bg-orange-400" : "bg-gray-300"}`
                  : `w-1 h-1 ${isActive ? "bg-orange-300" : "bg-gray-200"}`,
              ].join(" ")}
            />
            {item.text}
          </a>
          {item.children.length > 0 && (
            <ul className="mt-0.5 space-y-0.5">
              {renderItems(item.children, depth + 1)}
            </ul>
          )}
        </li>
      );
    });
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest mb-4 pb-3 border-b border-gray-100 flex items-center gap-2">
        <span className="w-[3px] h-4 rounded-full bg-orange-500 inline-block flex-shrink-0" />
        Table of Contents
      </p>
      <nav aria-label="Table of contents">
        <ul className="space-y-0.5">{renderItems(items)}</ul>
      </nav>
    </div>
  );
}