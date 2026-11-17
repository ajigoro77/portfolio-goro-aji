import Reveal from './Reveal';

export default function SectionTitle({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <Reveal className="mb-12">
      <p className="mb-2 font-mono text-sm tracking-widest text-indigo-400 uppercase">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" />
    </Reveal>
  );
}
