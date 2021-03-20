import React from "react";
import { CFooter } from "@coreui/react";

const TheFooter = () => {
  const copyrightYear = new Date().getFullYear();

  return (
    <CFooter fixed={false}>
      <div>
        <a href="https://www.kry.se" target="_blank" rel="noopener noreferrer">
          Kry Service Polling System
        </a>
        <span className="ml-1">&copy; {copyrightYear} KRY AB.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="https://www.kry.se" target="_blank" rel="noopener noreferrer">
          Kry Developers Team
        </a>
      </div>
    </CFooter>
  );
};

export default React.memo(TheFooter);
