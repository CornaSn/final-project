import Link from 'next/link';

export default function RootNotFound() {
  return (
    <>
      <div>
        Sorry this page was not found make sure to visit a page that exists.
      </div>
      <div>
        <Link href="/">Return Home</Link>
      </div>
    </>
  );
}
