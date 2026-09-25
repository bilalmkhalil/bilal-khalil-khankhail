import Link from "next/link";

export default function BrandLogo() {
  return (
    <Link
      href="/"
      aria-label="Bilal Khalil Khankhail — home"
      className="text-ink absolute top-4 left-4 z-40 flex h-12 w-12 items-center justify-center transition-opacity hover:opacity-70 sm:top-6 sm:left-8"
    >
      <svg
        viewBox="0 0 693 872"
        className="h-11 w-9"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M 153.0 867.5 L 148.0 867.5 L 144.5 863.0 L 144.5 724.0 L 136.0 717.5 L 4.5 641.0 L 3.5 32.0 L 4.5 7.0 L 7.0 3.5 L 13.0 3.5 L 21.0 7.5 L 147.5 81.0 L 149.5 110.0 L 149.5 234.0 L 151.0 237.5 L 276.0 164.5 L 284.0 160.5 L 288.0 160.5 L 550.0 314.5 L 688.5 399.0 L 688.5 404.0 L 686.0 406.5 L 560.0 478.5 L 556.5 482.0 L 557.5 633.0 L 556.0 634.5 L 153.0 867.5 Z M 224.5 660.0 L 239.0 656.5 L 251.0 650.5 L 453.0 530.5 L 464.5 520.0 L 472.5 508.0 L 477.5 494.0 L 478.5 475.0 L 473.5 457.0 L 467.5 447.0 L 458.0 436.5 L 448.0 429.5 L 247.0 307.5 L 225.0 300.5 L 205.0 300.5 L 190.0 304.5 L 170.0 317.5 L 157.5 334.0 L 150.5 355.0 L 153.5 609.0 L 155.5 619.0 L 160.5 630.0 L 168.5 641.0 L 178.0 649.5 L 200.0 659.5 L 224.5 660.0 Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </svg>
    </Link>
  );
}
