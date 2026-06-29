import bible from "./bible-newVDC.json";
import { map } from "./mapper";

const testChapterRange = new RegExp(/^([1-4a-zA-Z-]+?) (\d+)-(\d+)$/m);
const testChapterVerse = new RegExp(/^([1-4a-zA-Z-]+?) (\d+):(\d+)-(\d+)$/m);
const testWholeChapter = new RegExp(/^([1-4a-zA-Z-]+) (\d+)$/m);
const testWholeBook = new RegExp(/^([1-4a-zA-Z-]+)$/m);

const getBibleResponse = (book, chapters) => ({ book, chapters });
const createChapter = (nr, verses) => ({
  number: nr,
  verses,
});
const createVerse = (nr, verse) => ({ number: nr, verse });

const getBook = (abbreviation) => {
  const abbrevB = map(abbreviation);
  const bibleBook = bible.find((x) => x.abbrev === abbrevB);
  return bibleBook;
};

const parseChapterRange = (input) => {
  const [, book, start, end] = input.split(testChapterRange);
  const bibleBook = getBook(book);
  const bibleResponse = getBibleResponse(bibleBook.name, []);
  for (let i = parseInt(start) - 1; i <= parseInt(end) - 1; i++) {
    bibleResponse.chapters.push(
      createChapter(
        i + 1,
        bibleBook.chapters[i].map((v, i) => {
          return createVerse(i + 1, v);
        }),
      ),
    );
  }

  return bibleResponse;
};

const parseChapterVerse = (input) => {
  const [, book, chapter, start, end] = input.split(testChapterVerse);
  const bibleBook = getBook(book);
  const bibleResponse = getBibleResponse(bibleBook.name, []);
  const bibleChapter = bibleBook.chapters[parseInt(chapter) - 1];
  const verses = [];
  for (let i = parseInt(start) - 1; i <= parseInt(end) - 1; i++) {
    verses.push(createVerse(i + 1, bibleChapter[i]));
  }
  bibleResponse.chapters.push(createChapter(parseInt(chapter), verses));

  return bibleResponse;
};

const parseWholeBook = (input) => {
  const [, book] = input.split(testWholeBook);
  const bibleBook = getBook(book);

  const bibleResponse = getBibleResponse(
    bibleBook.name,
    bibleBook.chapters.map((x, i) => {
      return createChapter(
        i + 1,
        x.map((y, j) => {
          return createVerse(j + 1, y);
        }),
      );
    }),
  );

  return bibleResponse;
};

const parseWholeChapter = (input) => {
  const [, book, pChapter] = input.split(testWholeChapter);
  const bibleBook = getBook(book);

  const bibleResponse = getBibleResponse(bibleBook.name, [
    createChapter(
      parseInt(pChapter),
      bibleBook.chapters[parseInt(pChapter) - 1].map((x, i) => {
        return createVerse(i + 1, x);
      }),
    ),
  ]);

  return bibleResponse;
};

const parseText = (input) => {
  const trimmedInput = input.trim();

  if (testChapterRange.test(trimmedInput)) {
    return parseChapterRange(trimmedInput);
  }

  if (testChapterVerse.test(trimmedInput)) {
    return parseChapterVerse(trimmedInput);
  }

  if (testWholeChapter.test(trimmedInput)) {
    return parseWholeChapter(trimmedInput);
  }

  if (testWholeBook.test(trimmedInput)) {
    return parseWholeBook(trimmedInput);
  }
};

const parse = (input) => {
  const [oldTestamentPart, newTestamentPart] = input.split(";").map((x) => x.trim());

  const parsedOldTestament = parseText(oldTestamentPart);
  const parsedNewTestament = parseText(newTestamentPart);

  const result = {
    oldTestament: parsedOldTestament,
    newTestament: parsedNewTestament,
  };

  console.log(result);

  return result;
};

export default parse;
