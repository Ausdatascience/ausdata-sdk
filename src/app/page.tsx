import ContactForm from '@/components/ContactForm';
import ThemeToggle from '@/components/ThemeToggle';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black px-4">
      <ThemeToggle />
      <main className="w-full max-w-2xl py-16">
        <ContactForm />
      </main>
    </div>
  );
}
