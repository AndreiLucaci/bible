import map from "./mapper";
import bible from "./bible.json";

const testChapterRange = /^([1-4a-zA-Z-]+?) (\d+)-(\d+)$/gm;
const testChapterVerse = /^([1-4a-zA-Z-]+?) (\d+):(\d+)-(\d+)$/gm;
const testWholeChapter = /^([1-4a-zA-Z-]+) (\d+)$/gm;
const testWholeBook = /^([1-4a-zA-Z-]+)$/gm;

const bibleResponse = (book, chapters) => ({ book, chapters });
const chapter = (nr, verses) => ({
  number: nr,
  verses,
});
const verse = (nr, verse) => ({ number: nr, verse });

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
      chapter(
        i + 1,
        bbook.capitole[i].map((v, i) => {
          return verse(i + 1, v);
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
    verses.push(verse(i + 1, bchapter[i]));
  }
  bres.chapters.push(chapter(parseInt(ichapter), verses));

  return bres;
};

const parseWholeBook = (input) => {
  const [_, book] = input.split(testWholeBook);
  const bbook = getBook(book);

  const bres = bibleResponse(
    bbook.nume,
    bbook.capitole.map((x, i) => {
      return chapter(
        i + 1,
        x.map((y, j) => {
          return verse(j + 1, y);
        })
      );
    })
  );

  return bres;
};

const parseWholeChapter = (input) => {
  const [_, book, chapter] = input.split(testWholeChapter);
  const bbook = getBook(book);

  const bres = bibleResponse(bbook.nume, [
    chapter(
      parseInt(chapter),
      bbook.capitole[
        parseInt(chapter).map((x, i) => {
          return verse(i + 1, x);
        })
      ]
    ),
  ]);

  return bres;
};

const parseText = (input) => {
  if (testChapterRange.test(input)) {
    return parseChapterRange(input);
  }

  if (testChapterVerse.test(input)) {
    return parseChapterVerse(input);
  }

  if (testWholeChapter.test(input)) {
    return parseWholeChapter(input);
  }

  if (testWholeBook.test(input)) {
    return parseWholeBook(input);
  }
};

const parse = (input) => {
  const [oldT, newT] = input.split(";").map((x) => x.trim());

  console.log(newT);

  return {
    oldT: parseText(oldT),
    newT: parseText(newT),
  };
};

export default parse;
