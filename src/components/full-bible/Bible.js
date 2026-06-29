import "./Bible.css";

import { BibleChapterPicker, BibleTextView, BibleVersionPicker } from "@youversion/platform-react-ui";
import { Button, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";

import { useVersion } from "@youversion/platform-react-hooks";

const DEFAULT_VERSION_ID = 126;

const VERSION_STORAGE_KEY = "scriptum-deus:bible-version";
const BOOK_STORAGE_KEY = "scriptum-deus:bible-book";
const CHAPTER_STORAGE_KEY = "scriptum-deus:bible-chapter";

const getInitialVersionId = () => {
  const savedVersionId = Number(window.localStorage.getItem(VERSION_STORAGE_KEY));

  return savedVersionId || DEFAULT_VERSION_ID;
};

const getInitialBook = () => window.localStorage.getItem(BOOK_STORAGE_KEY) || "";

const getInitialChapter = () => window.localStorage.getItem(CHAPTER_STORAGE_KEY) || "";

export const Bible = () => {
  const [versionId, setVersionId] = useState(getInitialVersionId);
  const [book, setBook] = useState(getInitialBook);
  const [chapter, setChapter] = useState(getInitialChapter);

  const { version } = useVersion(versionId);

  const passageId = useMemo(() => {
    if (!book || !chapter) {
      return null;
    }

    return `${book}.${chapter}`;
  }, [book, chapter]);

  useEffect(() => {
    window.localStorage.setItem(VERSION_STORAGE_KEY, String(versionId));
  }, [versionId]);

  useEffect(() => {
    window.localStorage.setItem(BOOK_STORAGE_KEY, book);
  }, [book]);

  useEffect(() => {
    window.localStorage.setItem(CHAPTER_STORAGE_KEY, chapter);
  }, [chapter]);

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

        {passageId ? (
          <section className="bible-reader__passage" aria-label={`${book} ${chapter}`}>
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
        ) : (
          <div className="bible-reader__empty">Selectează o carte și un capitol pentru a începe citirea.</div>
        )}

        <Typography className="bible-reader__copyright" variant="caption">
          {version?.copyright}
        </Typography>
      </section>
    </main>
  );
};
