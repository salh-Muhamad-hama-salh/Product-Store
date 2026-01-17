import Image from "next/image";
import Logo from "@/public/Logo.png";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { Plus } from "lucide-react";

function Navbar() {
  return (
    <section className="fixed top-2 left-1/2 z-100 w-[min(90%,700px)] -translate-x-1/2 rounded-full border bg-background/70 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-3">
        <Link className="flex shrink-0 items-center gap-2" href="/">
          <Image
            className="rounded-full"
            alt="OrcDev Logo"
            loading="lazy"
            width="40"
            height="40"
            decoding="async"
            data-nimg="1"
            style={{ color: "transparent" }}
            src={Logo}
          />
        </Link>
        <nav
          aria-label="Main"
          data-orientation="horizontal"
          dir="ltr"
          className="group/navigation-menu relative flex max-w-max flex-1 items-center justify-center"
          data-slot="navigation-menu"
          data-viewport="true"
        >
          <div style={{ position: "relative" }}>
            <ul
              data-orientation="horizontal"
              className="group flex flex-1 list-none items-center justify-center gap-1"
              data-slot="navigation-menu-list"
              dir="ltr"
            >
              <li className="relative" data-slot="navigation-menu-item">
                <Link
                  className="relative bg-transparent px-1.5 font-medium text-muted-foreground text-sm"
                  href="/"
                >
                  Home
                </Link>
              </li>
              <li className="relative" data-slot="navigation-menu-item">
                <Link
                  className="relative bg-transparent px-1.5 font-medium text-muted-foreground text-sm"
                  href="/my-store"
                >
                  My Store
                </Link>
              </li>
            </ul>
          </div>
          <div className="absolute top-full left-0 isolate z-50 flex justify-center"></div>
        </nav>
        <div className="flex items-center gap-2.5 z-10">
          <Link className="rounded-full" href="/my-store/add-product">
            <Plus />
          </Link>
          <ModeToggle />
        </div>
      </div>
    </section>
  );
}

export default Navbar;
