import { count, log } from 'console';
import React, { useEffect, useState } from 'react'
import { productController } from '../../controller/ProductController';
import { Book, BookLine, BookLineProps, Media, Product } from '../../model/Product';
import StickyHeadTable from './TableWarehouse';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputAdornments from './FormWarehouse';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '1px solid #0000006a',
  boxShadow: 20,

  p: 4,
};

export default function WarehouseRight() {
  const [dataListBooks, setDataListBooks] = useState<BookLineProps[]>([])
  const [pageCount, setPageCount] = useState<number>(0)
  const [book, setbook] = React.useState<Book[]>([{
    idBookLine: "",
    idBook: "",
    price: 0,
    state: true,
    quantity: 0
  },
  {
    idBookLine: "",
    idBook: "",
    price: 0,
    state: false,
    quantity: 0
  }
  ])

  const [data, setData] = useState<BookLineProps>({
    idBookLine: "",
    bookTitle: "",
    bookAuthor: "",
    bookDescr: "",
    namePublisher: "",
    idCategory: "",
    idPublisher: "",
    publicationDate: "2002-04-02",
    nameCategory: "",
    createdAt: "",
    imageBookCover: "",
    buyCount: 0,
    updatedAt: "",
    book: book,
    media: []
  })
  useEffect(() => {
    LoadList("", 1, 5)
  }, [])
  const LoadList = (search: string, page: number, pageSize: number) => {
    productController.listAdmin(search, page, pageSize).then(res => {
      setPageCount(res.pageCount);
      setDataListBooks(res.listBook)
    })
  }



  const getDataEdit = (dataEdit: BookLineProps) => {
    setOpen(true)
    console.log(dataEdit);
    let tempBook: Book[] = book
    dataEdit.book.map((item, index) => {
      if (item.state == true) {
        tempBook[0] = item
      }
      else {
        tempBook[1] = item
      }

    })

    setData({ ...dataEdit, book: tempBook })
    // setData(a)

    function formatDate(date: string) {
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
      if (month.length < 2)
        month = '0' + month;
      if (day.length < 2)
        day = '0' + day;
      return [year, month, day].join('-');
    }
    // let publicationDate = formatDate(data.publicationDate);

    // setbook(tempBook)

    // console.log(tempImg);

  }
  const setDefault = () => {


    setbook([
      {
        idBookLine: "",
        idBook: "",
        price: 0,
        state: true,
        quantity: 0
      },
      {
        idBookLine: "",
        idBook: "",
        price: 0,
        state: false,
        quantity: 0
      }
    ])

    setData({
      idBookLine: "",
      bookTitle: "",
      bookAuthor: "",
      bookDescr: "",
      namePublisher: "",
      publicationDate: "2002-04-02",
      nameCategory: "",
      createdAt: "",
      buyCount: 0,
      idCategory: "",
      idPublisher: "",
      updatedAt: "",
      imageBookCover: "",
      book: [{
        idBookLine: "",
        idBook: "",
        price: 0,
        state: true,
        quantity: 0
      },
      {
        idBookLine: "",
        idBook: "",
        price: 0,
        state: false,
        quantity: 0
      }],
      media: []
    }
    )
  }
  const onDelete = (idBookLine: string) => {
    productController.delete(idBookLine).then(res => {
      LoadList("", 1, 5)
    })

  }
  const [open, setOpen] = React.useState(false);
  const onPage = (search: string, page: number, pageSize: number) => {
    LoadList(search, page, pageSize)

  }
  const handleOpen = () => {
    setDefault()
    setOpen(true);
  }
  const handleClose = () => {
    LoadList("", 1, 5)
    setOpen(false);
  }
  return (
    <div className="right">
      <Button onClick={handleOpen} style={{ marginLeft: "90%", width: "100px" ,marginTop:"20px",marginBottom:"20px"}} variant="contained">Create</Button>

      <Modal
        open={open}
        onClose={handleClose}

      >
        <Box sx={style} style={{ borderRadius: "10px" }}>
          <Typography component={'span'} id="modal-modal-description" sx={{ mt: 2 }}>
            <InputAdornments loadList={() => LoadList("", 1, 5)} setDataDef={setDefault} data={data} key={Date.now()} />
          </Typography>
        </Box>
      </Modal>

      <StickyHeadTable pageCount={pageCount} onPage={onPage} onDelete={() => onDelete} dataBooks={dataListBooks} onEdit={getDataEdit} />
    </div>
  )
}
