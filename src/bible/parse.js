import map from "./mapper";
import bible from "./bible.json";

const testChapterRange = new RegExp(/^([1-4a-zA-Z-]+?) (\d+)-(\d+)$/m);
const testChapterVerse = new RegExp(/^([1-4a-zA-Z-]+?) (\d+):(\d+)-(\d+)$/m);
const testWholeChapter = new RegExp(/^([1-4a-zA-Z-]+) (\d+)$/m);
const testWholeBook = new RegExp(/^([1-4a-zA-Z-]+)$/m);

const bibleResponse = (book, chapters) => ({ book, chapters });
const createChapter = (nr, verses) => ({
  number: nr,
  verses,
});
const createVerse = (nr, verse) => ({ number: nr, verse });

const getBook = (abbrev) => {
  const abbrevB = map(abbrev);
  const bbook = bible.find((x) => x.abbrev === abbrevB);
  return bbook;
};

const parseChapterRange = (input) => {
  const [_, book, start, end] = input.split(testChapterRange);
  const bbook = getBook(book);
  const bres = bibleResponse(bbook.nume, []);
  for (let i = parseInt(start) - 1; i <= parseInt(end) - 1; i++) {
    bres.chapters.push(
      createChapter(
        i + 1,
        bbook.capitole[i].map((v, i) => {
          return createVerse(i + 1, v);
        })
      )
    );
  }

  return bres;
};

const parseChapterVerse = (input) => {
  const [_, book, ichapter, start, end] = input.split(testChapterVerse);
  const bbook = getBook(book);
  const bres = bibleResponse(bbook.nume, []);
  const bchapter = bbook.capitole[parseInt(ichapter) - 1];
  const verses = [];
  for (let i = parseInt(start) - 1; i <= parseInt(end) - 1; i++) {
    verses.push(createVerse(i + 1, bchapter[i]));
  }
  bres.chapters.push(createChapter(parseInt(ichapter), verses));

  return bres;
};

const parseWholeBook = (input) => {
  const [_, book] = input.split(testWholeBook);
  const bbook = getBook(book);

  const bres = bibleResponse(
    bbook.nume,
    bbook.capitole.map((x, i) => {
      return createChapter(
        i + 1,
        x.map((y, j) => {
          return createVerse(j + 1, y);
        })
      );
    })
  );

  return bres;
};

const parseWholeChapter = (input) => {
  const [_, book, pChapter] = input.split(testWholeChapter);
  const bbook = getBook(book);

  const bres = bibleResponse(bbook.nume, [
    createChapter(
      parseInt(pChapter),
      bbook.capitole[parseInt(pChapter) - 1].map((x, i) => {
        return createVerse(i + 1, x);
      })
    ),
  ]);

  return bres;
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
  const [oldT, newT] = input.split(";").map((x) => x.trim());

  const parsedOldT = parseText(oldT);
  const parsedNewT = parseText(newT);

  return {
    oldT: parsedOldT,
    newT: parsedNewT,
  };
};

export default parse;
