'use client';

import Image from "next/image";
import posthog from "posthog-js";

const ExploreBtn = () => {
  return (
    <button
      type="button"
      id="explore-btn"
      className="mt-7 mx-auto"
      onClick={() =>
        posthog.capture("explore_events_clicked", {
          destination: "featured_events",
        })
      }
    >
        <a href="#events">
            Explore Events
            <Image src="/icons/arrow-down.svg" alt="Arrow down" width={24} height={24}/>
        </a>
    </button>
  )
}

export default ExploreBtn