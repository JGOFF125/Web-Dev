import Link from "next/link";

export default function StudentInfo() {
  return (
    <section>
      <p>Joaquin Urbano</p>
      <Link href="https://github.com/JGOFF125/Web-Dev">
        My GitHub Repository
      </Link>
      <p>Matthew Pereira</p>
      <Link href= "https://github.com/MatthewPereira6317/cprg306-assignments">
      Matthew's Repository
      </Link>
      <p>Dialyn Villostas</p>
      <Link href= "https://github.com/DialynV/cprg306-assignments">
      Dialyn's Repository
      </Link>
      <p>Adil Khan</p>
      <Link href= "https://github.com/adilkhanayk2000/cprg306-assignments">
      Adil's Repository
      </Link>
    </section>
  );
}
