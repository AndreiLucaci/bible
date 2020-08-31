import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import "./Text.css";

export const Text = (props) => {
  const { text } = props;

  const getVerseKey = (verse) => {
    return `${verse.number}${verse.verse.slice(0, 15)}`;
  };
  return (
    <div>
      <h4 className="textHeaderPart">{text.book}</h4>
      <div>
        {text.chapters.map((chapter) => {
          return (
            <div>
              <h5 className="textHeaderPart">Capitolul {chapter.number}</h5>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Numar</TableCell>
                      <TableCell>Verset</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {chapter.verses.map((verse) => {
                      return (
                        <TableRow key={getVerseKey(verse)}>
                          <TableCell>{verse.number}</TableCell>
                          <TableCell>{verse.verse}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          );
        })}
      </div>
    </div>
  );
};
