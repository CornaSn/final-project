import Image from 'next/image';

export default function Home() {
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold">Final Project</h1>
      <p className="mt-4">
        This is a sample text with the cupcake theme applied.
      </p>
      <button className="btn btn-accent">click me</button>
    </div>
  );
}
