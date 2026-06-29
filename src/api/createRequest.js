import { mapYouVersion } from "../bible/mapper";

const wholeBookChapterCounts = {
  PHM: 1, // Filimon
  "2JN": 1, // 2Ioan
  "3JN": 1, // 3Ioan
  JUD: 1, // Iuda

  JOL: 3, // Ioel
  OBA: 1, // Obadia
  JON: 4, // Iona
  NAM: 3, // Naum
  HAB: 3, // Habacuc
  ZEP: 3, // Tefania
  HAG: 2, // Hagai
  MAL: 4, // Maleahi
};

const getYouVersionBook = (bookName) => {
  const book = mapYouVersion(bookName);

  if (!book) {
    throw new Error(`Unknown Bible book: "${bookName}"`);
  }

  return book;
};

const createChapterRequests = (book, fromChapter, toChapter = fromChapter) => {
  if (toChapter < fromChapter) {
    throw new Error(`Invalid chapter range: ${fromChapter}-${toChapter}`);
  }

  return Array.from({ length: toChapter - fromChapter + 1 }, (_, index) => {
    const chapter = fromChapter + index;

    return {
      type: "chapter",
      book,
      chapter,
      passageId: `${book}.${chapter}`,
    };
  });
};

const createVerseRequest = (book, chapter, fromVerse, toVerse = fromVerse) => {
  if (toVerse < fromVerse) {
    throw new Error(`Invalid verse range: ${fromVerse}-${toVerse}`);
  }

  return {
    type: fromVerse === toVerse ? "verse" : "verseRange",
    book,
    chapter,
    fromVerse,
    toVerse,
    passageId: fromVerse === toVerse ? `${book}.${chapter}.${fromVerse}` : `${book}.${chapter}.${fromVerse}-${toVerse}`,
  };
};

export const parseReference = (reference) => {
  // Daniel 11-12 / Iov 8-10
  const chapterRange = reference.match(/^(.+?)\s+(\d+)-(\d+)$/);

  if (chapterRange) {
    const [, bookName, fromChapter, toChapter] = chapterRange;
    const book = getYouVersionBook(bookName);

    return createChapterRequests(book, Number(fromChapter), Number(toChapter));
  }

  // Fapte 8:26-40 / Romani 1:16
  const verseRange = reference.match(/^(.+?)\s+(\d+):(\d+)(?:-(\d+))?$/);

  if (verseRange) {
    const [, bookName, chapter, fromVerse, toVerse] = verseRange;
    const book = getYouVersionBook(bookName);

    return [createVerseRequest(book, Number(chapter), Number(fromVerse), toVerse ? Number(toVerse) : Number(fromVerse))];
  }

  // Romani 1 / Matei 5
  const singleChapter = reference.match(/^(.+?)\s+(\d+)$/);

  if (singleChapter) {
    const [, bookName, chapter] = singleChapter;
    const book = getYouVersionBook(bookName);

    return createChapterRequests(book, Number(chapter));
  }

  // Iuda / Ioel / Maleahi
  const wholeBook = getYouVersionBook(reference);
  const chapterCount = wholeBookChapterCounts[wholeBook];

  if (!chapterCount) {
    throw new Error(`A chapter is required for "${reference}"`);
  }

  return createChapterRequests(wholeBook, 1, chapterCount);
};

export const parsePart = (part, index) => {
  return {
    text: index === 0 ? "ot" : "nt",
    reference: part,
    passages: parseReference(part),
  };
};

export const toYouVersionRequests = (reference) =>
  reference
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)
    .map(parsePart);

export const toYouVersionUrls = (reference, bibleId = 126) =>
  toYouVersionRequests(reference).map(({ passageId }) => `/v1/bibles/${bibleId}/passages/${passageId}`);
