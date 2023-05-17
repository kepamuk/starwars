import * as React from 'react';
import Moment from "react-moment";
import {useDispatch, useSelector} from "react-redux";

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import {actionGetPeople} from "../../redux/action/actionGetPeople";
import {reducerSetPage} from "../../redux/reducer/reducerGetPeople";
import {AppDispatch, RootState} from "../../app/store";
import {IPeople} from "../../models/people/IPeople";
import {IPeopleOne} from "../../models/people/IPeopleOne";
import {Link} from "react-router-dom";
import {useEffect} from "react";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
  people: IPeople
  load: boolean
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange, people, load } = props;
  const dispatch = useDispatch<AppDispatch>()

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(actionGetPeople(people.previous as string))
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(actionGetPeople(people.next as string))
    onPageChange(event, page + 1);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0 || load}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1 || load}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
    </Box>
  );
}

export default function CustomPaginationActionsTable() {
  const dispatch = useDispatch<AppDispatch>()
  const {page, people, load} = useSelector((state: RootState) => state.people)
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    return () => {
      dispatch(reducerSetPage(0))
    }
  }, [dispatch])
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    dispatch(reducerSetPage(newPage))
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    dispatch(reducerSetPage(0))
  };

  return (
    <TableContainer component={Paper}>
      {people && <Table sx={{minWidth: 500}} aria-label="custom pagination table">
        <TableBody>
          {(people.results || []).map((row: IPeopleOne) => {
            return <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                <Link to={`person/${row.url.split('/')[5]}`}>{row.name}</Link>
              </TableCell>
              <TableCell align="right">
                {row.hair_color}
              </TableCell>
              <TableCell align="right">
                {row.skin_color}
              </TableCell>
              <TableCell align="right">
                {row.birth_year}
              </TableCell>
              <TableCell align="right">
                <Moment date={row.created} format="YYYY/MM/DD"/>
              </TableCell>
            </TableRow>
          })}

        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[]}
              count={people.count as number}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={(subProps) => <TablePaginationActions {...subProps} people={people} load={load}/>}
            />
          </TableRow>
        </TableFooter>
      </Table>}
    </TableContainer>
  );
}