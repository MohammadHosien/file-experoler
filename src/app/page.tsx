"use client";

import Root from "@/components/Root";

export default function Home() {

  return (
    <Root
      name="root"
      getData={(e)=>{
        console.log(e)
      }}
    />
  );
}
