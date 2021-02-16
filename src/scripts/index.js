const _ = require("lodash");
const fs = require("fs");
const curBible = require("../bible/bible.json");
const newBible = require("./bible-new.json");

const bib = curBible.map((x) => ({ nume: x.nume, abbrev: x.abbrev }));
const set = [...new Set([...newBible.data.map((x) => x.book)])];
/*
{
        "id": "1",
        "testament": "1",
        "book": "Geneza",
        "chapter": "1",
        "verse": "1",
        "text": "La început, Dumnezeu a făcut cerurile şi pământul.",
        "bookAlias": "Geneza"
      },
*/

const books = [];
let bibIndex = 0;
for (let verse of newBible.data) {
  let book = books.find((x) => x.id === verse.book);

  if (!book) {
    book = {
      id: verse.book,
      ...bib[bibIndex++],
      capitole: [],
    };

    books.push(book);
  }

  const chapterIndex = parseInt(verse.chapter) - 1;
  let chapter = book.capitole[chapterIndex];
  if (!chapter) {
    chapter = [];
    book.capitole.push(chapter);
  }

  chapter.push(verse.text);
}

const newBib = books.map((x) => ({
  abbrev: x.abbrev,
  capitole: x.capitole,
  nume: x.nume,
}));
fs.writeFileSync("./src/bible/newBible.json", JSON.stringify(newBib, null, 2));
