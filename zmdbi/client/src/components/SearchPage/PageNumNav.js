import React from 'react';
import { Button, Typography } from '@material-ui/core';

import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';

const PageNumNav = ({ totalPages, currentPage, setCurrentPage }) => {
  let totalPagesArray = Array.from(Array(totalPages), (_, x) => x);
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {totalPages ? (
          <Button>
            <FirstPageIcon onClick={() => setCurrentPage(1)} />
          </Button>
        ) : (
          <Typography variant="h5">No Results</Typography>
        )}

        {totalPagesArray.map((pageNum) => {
          if (
            pageNum + 1 >= totalPages - 7 &&
            currentPage <= totalPages &&
            currentPage >= totalPages - 4
          ) {
            if (pageNum + 1 === currentPage) {
              return (
                <Button
                  style={{ backgroundColor: '#032541', color: 'white' }}
                  onClick={() => setCurrentPage(pageNum + 1)}
                >
                  <Typography>{pageNum + 1}</Typography>
                </Button>
              );
            } else {
              return (
                <Button onClick={() => setCurrentPage(pageNum + 1)}>
                  <Typography variant="body2">{pageNum + 1}</Typography>
                </Button>
              );
            }
          } else if (pageNum < 7 && currentPage < 7) {
            console.log('FIRST CONDITION');
            if (pageNum + 1 === currentPage) {
              return (
                <Button
                  style={{ backgroundColor: '#032541', color: 'white' }}
                  onClick={() => setCurrentPage(pageNum + 1)}
                >
                  <Typography>{pageNum + 1}</Typography>
                </Button>
              );
            } else {
              return (
                <Button onClick={() => setCurrentPage(pageNum + 1)}>
                  <Typography>{pageNum + 1}</Typography>
                </Button>
              );
            }
          } else if (
            currentPage > pageNum - 3 &&
            currentPage < pageNum + 5 &&
            currentPage >= 7 &&
            pageNum + 1 < totalPages - 1
          ) {
            console.log('SECOND CONDITION');
            if (pageNum + 1 === currentPage) {
              return (
                <Button
                  style={{ backgroundColor: '#032541', color: 'white' }}
                  onClick={() => setCurrentPage(pageNum + 1)}
                >
                  <Typography>{pageNum + 1}</Typography>
                </Button>
              );
            } else {
              return (
                <Button onClick={() => setCurrentPage(pageNum + 1)}>
                  {pageNum + 1}
                </Button>
              );
            }
          }
        })}
        {totalPages ? (
          <Button onClick={() => setCurrentPage(totalPages)}>
            <LastPageIcon />
          </Button>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default PageNumNav;
