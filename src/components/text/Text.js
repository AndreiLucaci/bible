import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import "./Text.css";

export const Text = (props) => {
  const { text } = props;

  const getVerseKey = (verse) => {
    return `${verse.number}${verse.verse.slice(0, 15)}`;
  };
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography className="orange" variant="h5">
          {text.book}
        </Typography>
        <div>
          {text.chapters.map((chapter) => {
            return (
              <div>
                <div className="chapterSpacer">
                  <Typography className="orange" variant="h6">
                    Capitolul {chapter.number}
                  </Typography>
                </div>
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
                            <TableCell width={10}>{verse.number}</TableCell>
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
      </CardContent>
    </Card>
  );
};
