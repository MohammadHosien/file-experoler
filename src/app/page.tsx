"use client";

import Folder from "@/components/Folder";

export default function Home() {

  return (
    <Folder
      name="root"
      getData={(e)=>{
        console.log(e)
      }}
    />
  );
}
