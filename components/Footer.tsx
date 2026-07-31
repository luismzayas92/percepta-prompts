import Container from "@/components/Container";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-12">
      <Container className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-3">
          <Logo className="h-5 w-5 opacity-80" />
          <div className="flex flex-col leading-none">
            <span className="text-[11px] font-semibold tracking-[0.2em] text-silver">
              POWERED BY PERCEPTA
            </span>
            <span className="text-[9px] font-medium tracking-[0.16em] text-silver/50">
              DISEÑAMOS PERCEPCIÓN
            </span>
          </div>
        </div>
        <p className="text-xs text-silver/40">
          © {new Date().getFullYear()} PERCEPTA. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  );
}
