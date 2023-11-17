import React from "react";
import Image from "next/image";

const Empty = () => {
  return (
    <div className="border-conversation-border border-1 w-full bg-panel-header-background flex flex-col h-[100vh] border-b-4 border-b-icon-green items-center justify-center">
      <Image src="/whatsapp.gif" alt="Whatsapp" height={300} width={300} />
    </div>
  );
}

export default Empty;
