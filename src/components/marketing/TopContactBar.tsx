import { MapPin, Phone } from "lucide-react";

export function TopContactBar() {
  return (
    <div className="hidden bg-forest-dark text-paper/90 sm:block">
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 text-xs sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5 text-ochre-light" />
          <a href="mailto:info@jhconsultancy.co.zw" className="hover:text-ochre-light transition-colors">
            info@jhconsultancy.co.zw
          </a>
          <span className="mx-1 text-paper/30">&middot;</span>
          <span>Harare &middot; Bulawayo &middot; Mutare</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-3.5 w-3.5 text-ochre-light" />
          <a href="tel:+263772000000" className="hover:text-ochre-light transition-colors">
            +263 77 200 0000
          </a>
        </div>
      </div>
    </div>
  );
}
