import "./Bible.css";

import { BibleChapterPicker, BibleTextView, BibleVersionPicker } from "@youversion/platform-react-ui";
import { Button, Typography } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useBooks, useVersion } from "@youversion/platform-react-hooks";

const DEFAULT_VERSION_ID = 126;

const VERSION_STORAGE_KEY = "scriptum-deus:bible-version";
const BOOK_STORAGE_KEY = "scriptum-deus:bible-book";
const CHAPTER_STORAGE_KEY = "scriptum-deus:bible-chapter";

const SWIPE_MIN_DISTANCE = 72;
const MAX_SWIPE_VERTICAL_DRIFT = 70;

const getInitialVersionId = () => {
  const savedVersionId = Number(window.localStorage.getItem(VERSION_STORAGE_KEY));
  return savedVersionId || DEFAULT_VERSION_ID;
};

const getInitialBook = () => window.localStorage.getItem(BOOK_STORAGE_KEY) || "";
const getInitialChapter = () => window.localStorage.getItem(CHAPTER_STORAGE_KEY) || "";

const getAdjacentChapter = (books, currentBookId, currentChapterId, direction) => {
  const currentBookIndex = books.findIndex((item) => item.id === currentBookId);

  if (currentBookIndex === -1) {
    return null;
  }

  const currentBook = books[currentBookIndex];
  const currentChapters = currentBook.chapters || [];
  const currentChapterIndex = currentChapters.findIndex((item) => item.id === currentChapterId);

  if (currentChapterIndex === -1) {
    return null;
  }

  const chapterInCurrentBook = currentChapters[currentChapterIndex + direction];

  if (chapterInCurrentBook) {
    return {
      book: currentBook.id,
      chapter: chapterInCurrentBook.id,
    };
  }

  for (let bookIndex = currentBookIndex + direction; bookIndex >= 0 && bookIndex < books.length; bookIndex += direction) {
    const adjacentBook = books[bookIndex];
    const adjacentChapters = adjacentBook.chapters || [];

    if (!adjacentChapters.length) {
      continue;
    }

    return {
      book: adjacentBook.id,
      chapter: direction < 0 ? adjacentChapters[adjacentChapters.length - 1].id : adjacentChapters[0].id,
    };
  }

  return null;
};

export const Bible = () => {
  const [versionId, setVersionId] = useState(getInitialVersionId);
  const [book, setBook] = useState(getInitialBook);
  const [chapter, setChapter] = useState(getInitialChapter);
  const [isPassageVisible, setIsPassageVisible] = useState(false);

  const passageRef = useRef(null);
  const swipeStartRef = useRef(null);
  const previousPassageKeyRef = useRef(null);

  const { version } = useVersion(versionId);
  const { books } = useBooks(versionId);

  const passageId = useMemo(() => {
    if (!book || !chapter) {
      return null;
    }

    return `${book}.${chapter}`;
  }, [book, chapter]);

  const chapterNavigation = useMemo(() => {
    const bibleBooks = books?.data || [];

    return {
      previous: getAdjacentChapter(bibleBooks, book, chapter, -1),
      next: getAdjacentChapter(bibleBooks, book, chapter, 1),
    };
  }, [books, book, chapter]);

  useEffect(() => {
    window.localStorage.setItem(VERSION_STORAGE_KEY, String(versionId));
  }, [versionId]);

  useEffect(() => {
    window.localStorage.setItem(BOOK_STORAGE_KEY, book);
  }, [book]);

  useEffect(() => {
    window.localStorage.setItem(CHAPTER_STORAGE_KEY, chapter);
  }, [chapter]);

  useEffect(() => {
    if (!passageId) {
      setIsPassageVisible(false);
      return undefined;
    }

    const element = passageRef.current;

    if (!element) {
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => setIsPassageVisible(entry.isIntersecting), { threshold: 0.01 });

    observer.observe(element);

    return () => observer.disconnect();
  }, [passageId]);

  useEffect(() => {
    if (!passageId) {
      return;
    }

    const passageKey = `${versionId}-${passageId}`;

    if (previousPassageKeyRef.current && previousPassageKeyRef.current !== passageKey) {
      window.requestAnimationFrame(() => {
        passageRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }

    previousPassageKeyRef.current = passageKey;
  }, [passageId, versionId]);

  const handleVersionChange = (nextVersionId) => {
    setVersionId(nextVersionId);
  };

  const handleBookChange = (nextBook) => {
    setBook(nextBook);
    setChapter("");
  };

  const handleChapterChange = (nextChapter) => {
    setChapter(nextChapter);
  };

  const goToChapter = useCallback((target) => {
    if (!target) {
      return;
    }

    setBook(target.book);
    setChapter(target.chapter);
  }, []);

  const handlePointerDown = (event) => {
    if (event.pointerType !== "touch") {
      return;
    }

    swipeStartRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
  };

  const handlePointerUp = (event) => {
    const swipeStart = swipeStartRef.current;
    swipeStartRef.current = null;

    if (!swipeStart || swipeStart.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - swipeStart.x;
    const deltaY = event.clientY - swipeStart.y;

    if (Math.abs(deltaX) < SWIPE_MIN_DISTANCE || Math.abs(deltaY) > MAX_SWIPE_VERTICAL_DRIFT) {
      return;
    }

    if (deltaX < 0) {
      goToChapter(chapterNavigation.next);
      return;
    }

    goToChapter(chapterNavigation.previous);
  };

  return (
    <main className="bible-page">
      <section className="bible-reader" aria-labelledby="bible-title">
        <header className="bible-reader__header">
          <div className="bible-reader__controls">
            <div className="bible-reader__version-picker">
              <Typography className="bible-reader__control-label">Versiune</Typography>

              <BibleVersionPicker.Root versionId={versionId} onVersionChange={handleVersionChange} background="light" side="bottom">
                <BibleVersionPicker.Trigger asChild>
                  <Button className="bible-reader__version-trigger" variant="outlined" aria-label="Alege versiunea Bibliei">
                    {version?.localized_abbreviation || version?.abbreviation || "Alege versiunea"}
                  </Button>
                </BibleVersionPicker.Trigger>

                <BibleVersionPicker.Content />
              </BibleVersionPicker.Root>
            </div>

            <div className="bible-reader__chapter-picker">
              <Typography className="bible-reader__control-label">Text</Typography>

              <BibleChapterPicker.Root
                book={book}
                chapter={chapter}
                versionId={versionId}
                onBookChange={handleBookChange}
                onChapterChange={handleChapterChange}
                background="light"
              >
                <BibleChapterPicker.Trigger />
              </BibleChapterPicker.Root>
            </div>
          </div>
        </header>

        <div className="bible-reader__section">
          {passageId ? (
            <>
              <section
                ref={passageRef}
                className="bible-reader__passage"
                aria-label={`${book} ${chapter}`}
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPointerCancel={() => {
                  swipeStartRef.current = null;
                }}
              >
                <Typography component="div" className="bible-reader-chapter-title">
                  Capitolul {chapter}
                </Typography>

                <BibleTextView
                  key={`${versionId}-${passageId}`}
                  reference={passageId}
                  versionId={versionId}
                  fontFamily="serif"
                  fontSize={19}
                  lineHeight={1.8}
                  showVerseNumbers
                  renderNotes
                />
              </section>

              {isPassageVisible && (
                <>
                  <button
                    type="button"
                    className="bible-reader__chapter-nav bible-reader__chapter-nav--previous"
                    aria-label="Mergi la capitolul precedent"
                    title="Capitolul precedent"
                    disabled={!chapterNavigation.previous}
                    onClick={() => goToChapter(chapterNavigation.previous)}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M15 18 9 12l6-6" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="bible-reader__chapter-nav bible-reader__chapter-nav--next"
                    aria-label="Mergi la capitolul următor"
                    title="Capitolul următor"
                    disabled={!chapterNavigation.next}
                    onClick={() => goToChapter(chapterNavigation.next)}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="bible-reader__empty">Selectează o carte și un capitol pentru a începe citirea.</div>
          )}

          <Typography className="bible-reader__copyright" variant="caption">
            {version?.copyright}
          </Typography>
        </div>
      </section>
    </main>
  );
};
