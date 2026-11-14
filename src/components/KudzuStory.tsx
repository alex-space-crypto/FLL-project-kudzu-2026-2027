import { useState } from 'react'
import { KUDZU_STORY } from '../lib/kudzuStory'

export function KudzuStory() {
  const [pageIndex, setPageIndex] = useState(0)

  const pages = KUDZU_STORY.flatMap((section, sectionIndex) =>
    section.pages.map((page) => ({ ...page, sectionIndex })),
  )
  const current = pages[pageIndex]
  const currentSection = KUDZU_STORY[current.sectionIndex]
  const sectionPages = pages.filter((page) => page.sectionIndex === current.sectionIndex)
  const pageNumberInSection = sectionPages.indexOf(current) + 1
  const firstPageOfSection = (sectionIndex: number) =>
    pages.findIndex((page) => page.sectionIndex === sectionIndex)

  return (
    <section className="story" aria-labelledby="story-title">
      <header className="story-header">
        <p className="story-eyebrow">Kudzu story</p>
        <h2 id="story-title">{KUDZU_STORY[0].pages[0].title}</h2>
      </header>

      <div className="story-layout">
        <nav className="story-nav" aria-label="Story sections">
          {KUDZU_STORY.map((section, sectionIndex) => {
            const isActive = sectionIndex === current.sectionIndex
            return (
              <div key={section.id} className="story-nav-group">
                <button
                  type="button"
                  className={isActive ? 'story-nav-item is-active' : 'story-nav-item'}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={() => setPageIndex(firstPageOfSection(sectionIndex))}
                >
                  <span className="story-marker">{section.marker}</span>
                  <span>{section.title}</span>
                </button>
                {isActive && (
                  <ul className="story-subnav">
                    {pages.map((page, index) =>
                      page.sectionIndex === sectionIndex ? (
                        <li key={page.title}>
                          <button
                            type="button"
                            className={index === pageIndex ? 'story-subnav-item is-active' : 'story-subnav-item'}
                            aria-current={index === pageIndex ? 'true' : undefined}
                            onClick={() => setPageIndex(index)}
                          >
                            {page.title}
                          </button>
                        </li>
                      ) : null,
                    )}
                  </ul>
                )}
              </div>
            )
          })}
        </nav>

        <article className="story-page" key={pageIndex}>
          <p className="story-section-label">{currentSection.title}</p>
          <h3>{current.title}</h3>
          <p className="story-page-count">
            Page {pageNumberInSection} of {sectionPages.length}
          </p>
          {current.paragraphs.map((paragraph) => (
            <p key={paragraph} className="story-paragraph">
              {paragraph}
            </p>
          ))}
        </article>
      </div>

      <footer className="story-footer">
        <button
          type="button"
          className="secondary-button"
          disabled={pageIndex === 0}
          onClick={() => setPageIndex((index) => index - 1)}
        >
          Previous
        </button>
        <span className="story-progress">
          {pageIndex + 1} of {pages.length} pages
        </span>
        <button
          type="button"
          className="primary-button"
          disabled={pageIndex === pages.length - 1}
          onClick={() => setPageIndex((index) => index + 1)}
        >
          Next
        </button>
      </footer>
    </section>
  )
}
