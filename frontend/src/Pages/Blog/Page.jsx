import { getFetch } from "../../Utils/communication";
import NotFoundPage from "../../Components/NotFound";

import React, { useState, useEffect } from "react";

function Page(props) {
  const [NotFound, setNotFound] = useState(false);
  const [page, setPage] = useState({ title: "", content: "" });

  useEffect(() => {
    const fetchData = async () => {
      const myPage = await getFetch(`/page/${props.match.params.id}`);
      if (!myPage) {
        setNotFound(true);
      }
      setPage(myPage);
    };
    fetchData();
  }, [props]);

  return NotFound ? (
    <NotFoundPage />
  ) : (
    <div>
      <h3>{page.title}</h3>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </div>
  );
}

export default Page;
