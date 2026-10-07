import type { Architecture } from "@/types/project";

// Nodes and explicit relationships keep this useful beyond software architectures.
// The ordered relationship list is also a text alternative to the visual node layout.
export function ArchitectureDiagram({ diagram }: { diagram: Architecture }) {
  const nodeTitles = new Map(
    diagram.nodes.map((node) => [node.id, node.title]),
  );
  return (
    <figure className="record-diagram">
      <figcaption>
        <span className="eyebrow">{diagram.state} / Architecture</span>
        <p>{diagram.title}</p>
        <span className="muted">{diagram.caption}</span>
      </figcaption>
      <ul role="list" className="diagram-nodes">
        {diagram.nodes.map((node, index) => (
          <li key={node.id}>
            <span className="technical accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p>{node.title}</p>
            <span className="technical muted">{node.detail}</span>
          </li>
        ))}
      </ul>
      {diagram.connections.length > 0 && (
        <ol role="list" className="diagram-connections">
          {diagram.connections.map((edge, index) => (
            <li key={`${edge.from}-${edge.to}-${index}`}>
              <span>
                {nodeTitles.get(edge.from)} <span aria-hidden="true">→</span>
                <span className="sr-only"> to </span> {nodeTitles.get(edge.to)}
              </span>
              <span className="technical muted">{edge.label}</span>
            </li>
          ))}
        </ol>
      )}
    </figure>
  );
}
