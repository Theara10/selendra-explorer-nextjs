import ExplorerNav from "@/components/ExplorerNav";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ExplorerNav
        bgColor={"bg-sel_blue"}
        textColor="white"
        logo="/sel-logo-text-white.png"
        search={false}
        selIcon="/sel-icon-white.png"
      />
      {children}
    </div>
  );
}
