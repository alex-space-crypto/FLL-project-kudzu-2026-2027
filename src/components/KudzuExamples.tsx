const EXAMPLES = [
  {
    src: '/kudzu-examples/kudzu-leaves.webp',
    caption: 'Leaves',
    description: 'Large, bright green leaves in groups of three, each one broad and rounded.',
  },
  {
    src: '/kudzu-examples/kudzu-hillside.webp',
    caption: 'Covering a hillside',
    description: 'Rounded green mounds that hide trees and the shape of the land beneath.',
  },
  {
    src: '/kudzu-examples/kudzu-tree.webp',
    caption: 'Climbing trees and poles',
    description: 'Thick vines wrap around trunks, power lines, and dead trees.',
  },
  {
    src: '/kudzu-examples/kudzu-roadside.webp',
    caption: 'Along roadsides',
    description: 'Fences and utility poles disappear under a solid green cover.',
  },
  {
    src: '/kudzu-examples/kudzu-flowers.webp',
    caption: 'Stems and flowers',
    description: 'Fuzzy brown stems and clusters of small purple, grape-like flowers in late summer.',
  },
  {
    src: '/kudzu-examples/kudzu-building.webp',
    caption: 'Covering buildings',
    description: 'Old buildings and sheds can be almost fully hidden under vines.',
  },
]

export function KudzuExamples() {
  return (
    <section className="kudzu-examples" aria-labelledby="examples-title">
      <div className="card-heading">
        <h2 id="examples-title">What kudzu looks like</h2>
        <p>
          Not sure what you are looking at? These examples show kudzu in the ways people most often
          spot it. The pictures are illustrations, not photos of specific places.
        </p>
      </div>

      <ul className="example-grid">
        {EXAMPLES.map((example) => (
          <li key={example.src} className="example-card">
            <img src={example.src} alt={`Kudzu ${example.caption.toLowerCase()}`} loading="lazy" />
            <div className="example-text">
              <h3>{example.caption}</h3>
              <p>{example.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
