import Image from "next/image";
import placeholder from "../../public/placeholder.gif";

export default function Loading() {
  return (
    <>
      <div>
        <Image src={placeholder} alt="placeholder" width={500} height={500} className="mx-auto" />
      </div>
    </>
  );
}
