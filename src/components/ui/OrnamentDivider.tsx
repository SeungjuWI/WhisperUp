type Props = {
  children: React.ReactNode;
};

export default function OrnamentDivider({ children }: Props) {
  return (
    <div className="relative z-[2] mx-auto flex max-w-[960px] items-center gap-4 px-6 py-8 sm:px-10">
      <div className="h-px flex-1 bg-[linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)]" />
      <div className="whitespace-nowrap font-serif text-[0.8rem] tracking-[0.2em] text-gold">
        ✦ {children} ✦
      </div>
      <div className="h-px flex-1 bg-[linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)]" />
    </div>
  );
}
