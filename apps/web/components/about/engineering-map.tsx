export function EngineeringMap() {
  return (
    <figure className="profile-map">
      <figcaption>
        <span className="eyebrow">Conceptual relationships</span>
        <p>Different layers. One system.</p>
        <span className="muted">
          Follow a domain to its explanation and evidence below. This maps a
          direction, not a deployed system.
        </span>
      </figcaption>
      <div className="map-root">Computer Engineering</div>
      <ul role="list" className="map-branches">
        <li>
          <a href="#domain-hardware">
            Hardware<span>Physical resources & interfaces</span>
          </a>
        </li>
        <li>
          <a href="#domain-software">
            Software<span>Behavior & implementation</span>
          </a>
        </li>
        <li>
          <a href="#domain-networking">
            Networking<span>Communication & connection</span>
          </a>
        </li>
      </ul>
      <div className="map-spine">
        <p>
          Systems<span>Where the layers meet</span>
        </p>
        <a href="#domain-infrastructure">
          Infrastructure<span>Compute · storage · networks · operations</span>
        </a>
        <a href="#domain-ai-infrastructure">
          AI infrastructure → Data centers<span>Long-term direction</span>
        </a>
      </div>
      <a className="map-security" href="#domain-security">
        Security & protocols <span>Trust boundaries across every layer ↗</span>
      </a>
    </figure>
  );
}
