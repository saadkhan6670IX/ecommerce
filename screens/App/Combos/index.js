import React, {useEffect, useState} from 'react';
import ThemeOneCombos from './ThemeOneCombos';
import {useSelector} from 'react-redux';
import {getCombos} from '../../../services/Discount';

export default function index(props) {
  const [combos, setCombos] = useState([]);
  const themeNumber = useSelector((state) => state.themeReducer.themeNumber);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [paginationLoader, setPaginationLoader] = useState(false);

  useEffect(() => {
    setPaginationLoader(true);
    getCombos(page).then((response) => {
      setCombos((combos) => [...combos, ...response?.data?.data]);
      setTotalPages(response?.data?.total_pages);
      setPaginationLoader(false);
    });
  }, [page]);

  switch (themeNumber) {
    case 1:
      return (
        <ThemeOneCombos
          paginationLoader={paginationLoader}
          setPage={setPage}
          page={page}
          combos={combos}
          totalPages={totalPages}
          {...props}></ThemeOneCombos>
      );

    default:
      return <ThemeOneCombos promotions={combos} {...props}></ThemeOneCombos>;
  }
}
