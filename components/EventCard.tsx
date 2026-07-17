import Image from "next/image";
import Link from "next/link";

interface Props {
    title: string; // Event title
    image: string; // Image URL or path
}

const EventCard = ({title, image}: Props) => {
  return (
    <Link href={`/events/${title}`} id="event-card" className="event-card">
        <Image src={image} alt={title} width={410} height={300} className="poster"/>
        <p className="title">{title}</p>
    </Link>
  )
}

export default EventCard