import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import { FiDelete } from 'react-icons/fi';
import { RiEditLine } from 'react-icons/ri';
import { BookLineProps } from '../../model/Product';
import InputBase from '@mui/material/InputBase';
import { height } from '@mui/system';




function Row(props: { row: BookLineProps, onUpdate: any, onDelete: any }) {
  const { row, onUpdate, onDelete } = props;
  console.log(row);
  
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell width={2}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.bookTitle}
        </TableCell>
        <TableCell align="center">{row.bookAuthor}</TableCell>
        <TableCell align="center">{row.namePublisher}</TableCell>
        <TableCell align="center">{row.nameCategory}</TableCell>
        <TableCell align="center"><div style={{ height: "80px", width: "40px", margin: "auto" }}><img src={row.imageBookCover} alt="" /></div></TableCell>
        <TableCell align="center"><Button onClick={() => onUpdate()} variant="contained"><RiEditLine /></Button><Button variant="outlined" onClick={() => onDelete(row.idBookLine)} color="error" ><FiDelete></FiDelete>
        </Button></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                State Book
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>State</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell align="right">Quantity</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.book.map((historyRow) => (
                    <TableRow key={historyRow.idBook}>
                      <TableCell  >
                        {historyRow.state == true ? "New book" : "Old book"}
                      </TableCell>
                      <TableCell>{historyRow.price}</TableCell>
                      <TableCell align="right">{historyRow.quantity}</TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


interface Props {
  onEdit: (data: BookLineProps) => void
  onDelete: () => void
  onPage: (search: string, page: number, pageSize: number) => void
  pageCount: number
  dataBooks: BookLineProps[]
}
export default function CollapsibleTable(props: Props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = React.useState("");
  console.log(search);
  
  const handleChangePage = (event: unknown, newPage: number) => {
    console.log(newPage);
    setPage(newPage);
    props.onPage(search, newPage + 1, rowsPerPage)
  };
  const handleChangeSearch = (search:string) => {
    setSearch(search)
    props.onPage(search,page+1 , rowsPerPage)
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    props.onPage(search, page + 1, +event.target.value)
    setPage(0);
  };
  return (
    <TableContainer component={Paper}  >
      <InputBase
        sx={{ ml: 10, flex: 1 ,height:50}}
        placeholder="Search by book name"
        onChange={e=>handleChangeSearch(e.target.value)}
        inputProps={{ 'aria-label': 'Search by book name' }}
      />
    
      <Table aria-label="collapsible table" >
       
        <TableHead >
          <TableRow>
            <TableCell />
            <TableCell >Book Title</TableCell>
            <TableCell align="center">Author</TableCell>
            <TableCell align="center">Publisher</TableCell>
            <TableCell align="center">Category</TableCell>
            <TableCell align="center">Image</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.dataBooks.map((row, index) => (
            <Row key={index} row={row} onDelete={props.onDelete()} onUpdate={() => props.onEdit(row)} />
          ))}
        </TableBody>

      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 100]}
        component="div"
        count={props.pageCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}