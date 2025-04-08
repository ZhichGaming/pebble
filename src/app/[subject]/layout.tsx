import CurrentPlaceNav from "@/components/subject/CurrentPlaceNav";
import { ReactNode } from "react";

export default function SubjectLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <CurrentPlaceNav />
      {children}
    </>
  );
}

