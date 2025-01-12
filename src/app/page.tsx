import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main>
      <section
        className="flex flex-col items-center justify-center px-6 text-center gap-6 py-20"
        id="hero"
      >
        <h1 className="text-4xl font-extrabold leading-tight sm:text-6xl">
          Organize Your <span className="text-primary">Projects</span>{" "}
          Effortlessly
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Simplify your team&apos;s workflow with a powerful and intuitive
          project management tool.
        </p>
        <Button size="lg" className="mt-4">
          <Link href="/signup">Try it for Free</Link>
        </Button>
      </section>

      <section
        className="px-6 py-16 bg-muted text-muted-foreground"
        id="features"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Why ProjectFlow?</h2>
          <p className="mt-4 text-lg">
            Manage your tasks, collaborate with your team, and achieve your
            goals.
          </p>
          <div className="grid gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 border rounded-lg bg-background">
              <h3 className="text-xl font-semibold">Drag-and-Drop Boards</h3>
              <p className="mt-2 text-sm">
                Intuitive boards to move tasks across stages with ease.
              </p>
            </div>
            <div className="p-6 border rounded-lg bg-background">
              <h3 className="text-xl font-semibold">Team Collaboration</h3>
              <p className="mt-2 text-sm">
                Assign tasks, set deadlines, and track progress in real-time.
              </p>
            </div>
            <div className="p-6 border rounded-lg bg-background">
              <h3 className="text-xl font-semibold">Customizable Workflows</h3>
              <p className="mt-2 text-sm">
                Tailor workflows to suit your team&apos;s unique processes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-background text-foreground" id="about">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center sm:text-4xl">
            About ProjectFlow
          </h2>
          <p className="mt-4 text-lg text-center">
            Empowering teams to achieve more with less effort.
          </p>
          <p className="mt-6 text-center">
            ProjectFlow was designed for teams that value simplicity, speed, and
            scalability. Whether you&apos;re managing a small project or a large
            enterprise initiative, ProjectFlow adapts to your needs.
          </p>
        </div>
      </section>

      <section
        className="px-6 py-16 text-center bg-primary text-primary-foreground"
        id="cta"
      >
        <h2 className="text-3xl font-bold sm:text-4xl">
          Ready to Transform Your Workflow?
        </h2>
        <p className="mt-4 text-lg">
          Start your free trial today and experience the difference!
        </p>
        <Button size="lg" className="mt-6">
          <Link href="/signup">Get Started Now</Link>
        </Button>
      </section>
    </main>
  );
}
