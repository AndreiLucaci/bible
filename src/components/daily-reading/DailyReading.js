import { BibleTextView } from "@youversion/platform-react-ui";
import { Typography } from "@material-ui/core";
import { createRequestUrls } from "../../api";

const NTR_ID = 126;

export default function DailyReading({ reference }) {
  const passages = createRequestUrls(reference);

  return (
    <>
      <div className="daily-reading">
        {passages.map(({ passageId }) => (
          <section key={passageId} className="daily-reading__passage">
            <BibleTextView reference={passageId} versionId={NTR_ID} />
          </section>
        ))}

        <Typography variant="caption" color="textSecondary" component="div">
          Biblia, Noua Traducere Românească™ NTR™. Copyright © 2007, 2010, 2016, 2021 Biblica, Inc. Folosit cu permisiune. Toate drepturile
          sunt rezervate.
        </Typography>
      </div>
    </>
  );
}
