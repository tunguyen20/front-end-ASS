import * as React from 'react';
import Box from '@mui/material/Box';
import { useState } from 'react'
import TextField from '@mui/material/TextField';
import { TextareaAutosize } from '@mui/material'
import SelectPublisher from './SelectPublisher';
import Button from '@mui/material/Button';
import { Book, BookLine, BookLineProps, Media } from '../../model/Product';
import { productController } from '../../controller/ProductController';
import SelectCategory from './SelectCategory';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import ClearIcon from '@mui/icons-material/Clear';

const { v4: uuidv4 } = require("uuid")
interface Props {
    data: BookLineProps
    setDataDef: () => void
    loadList: () => void
}
export default function InputAdornments(props: Props) {
    const [book, setBook] = React.useState<Book[]>(props.data.book)

    const [img, setImg] = React.useState<Media[]>(props.data.media)
    const [urlImg, setUrlImg] = useState<string>("")
    console.log(props.data.book);

    const [values, setValues] = React.useState<BookLine>({
        idBookLine: props.data.idBookLine,
        bookTitle: props.data.bookTitle,
        bookAuthor: props.data.bookAuthor,
        bookDescr: props.data.bookDescr,
        idBookCategory: props.data.idCategory,
        idPublisher: props.data.idPublisher,
        publicationDate: props.data.publicationDate,
        createdAt: props.data.createdAt,
        imageBookCover: props.data.imageBookCover,
        buyCount: props.data.buyCount,
        updatedAt: props.data.updatedAt,
        book: [],
        media: []
    })

    let idBookLine = uuidv4()
    const onAddBook = () => {
        if (values.idBookLine == "") {
            let dateNow = new Date().toLocaleString()
            let temp = img
            for (let i = img.length - 1; i >= 0; i--) {
                temp[i].idImage = uuidv4()
                temp[i].idBookLine = idBookLine

            }
            book[0].idBook = uuidv4()
            book[0].idBookLine = idBookLine

            book[1].idBook = uuidv4()
            book[1].idBookLine = idBookLine

            let BookLine = { ...values, book: book, media: img, idBookLine: idBookLine, createdAt: dateNow, updatedAt: dateNow }
            console.log(BookLine);

            productController.add(BookLine)
            // props.loadList()
            idBookLine = uuidv4()
        }
        else {
            let dateNow = new Date().toLocaleString()
            let BookLine = { ...values, book: book, media: img, updatedAt: dateNow }
            console.log(BookLine);
            console.log("edit");
            productController.add(BookLine)
            // props.setDataDef()
        }


    }

    const onPushImg = () => {
        let tempMedia: Media
        if (values.idBookLine == "") {
            tempMedia = {
                idBookLine: idBookLine,
                idImage: uuidv4(),
                image: urlImg
            }
        }
        else {
            tempMedia = {
                idBookLine: values.idBookLine,
                idImage: uuidv4(),
                image: urlImg
            }
        }
        const a: Media[] = img
        a.push(tempMedia)
        setImg(a)
        setUrlImg("")
    }

    const deleteListImg = (index: number) => {
        const a: Media[] = img
        a.splice(index, 1)
        setImg(a)
        setUrlImg(String(a.length))
    }
    const resetForm = () => {
        props.setDataDef()
    }

    const getIdPublisher = (id: string) => {
        setValues({ ...values, idPublisher: id })
        console.log(id);

    }
    const getIdCategory = (id: string) => {
        setValues({ ...values, idBookCategory: id })
        console.log(id);
    }
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

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', width: "90ch", margin: "auto" }}>
            <div>

                <TextField
                    label="bookTitle"
                    variant="outlined"
                    id="outlined-start-adornment"
                    value={values.bookTitle}
                    onChange={e => setValues({ ...values, bookTitle: e.target.value })}
                    sx={{ m: 1, width: '25ch' }}
                />
                <TextField
                    label="bookAuthor"
                    variant="outlined"
                    value={values.bookAuthor}
                    id="outlined-start-adornment"
                    onChange={e => setValues({ ...values, bookAuthor: e.target.value })}
                    sx={{ m: 1, width: '25ch' }}
                />
                <div style={{ display: "inline-block", margin: "8px 0 10px 10px" }}>
                    <input value={formatDate(values.publicationDate)} onChange={e => setValues({ ...values, publicationDate: e.target.value })} style={{ padding: "17px", width: "219px", backgroundColor: " rgba(245, 245, 245, 0)", borderRadius: "5px", border: "1px solid rgba(0, 0, 0, 0.288)" }} type="date" id="start" name="trip-start"
                    />
                </div>

                <TextField
                    label="Price "
                    variant="outlined"
                    id="outlined-start-adornment"
                    onChange={e => {
                        const temp = book;
                        temp.map((item, index) => {
                            if (item.state == true) {
                                temp[index].price = Number(e.target.value);
                                setBook(temp)
                            }
                        })


                    }}
                    defaultValue={book[0].price}
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    sx={{ m: 1, width: '52ch' }}
                />
                <TextField
                    label="Quantity "
                    variant="outlined"
                    defaultValue={book[0].quantity}
                    id="outlined-start-adornment"
                    type="number"
                    onChange={e => {
                        const temp = book;
                        temp[0].quantity = Number(e.target.value);
                        setBook(temp)

                    }}
                    InputProps={{ inputProps: { min: 0 } }}
                    sx={{ m: 1, width: '25ch' }}
                />
                <TextField
                    label="Price Book Old"
                    variant="outlined"
                    type="number"
                    defaultValue={book[1].price}
                    onChange={e => {
                        const temp = book;
                        temp[1].price = Number(e.target.value);
                        setBook(temp)
                    }}
                    InputProps={{ inputProps: { min: 0 } }}
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: '52ch' }}
                />
                <TextField
                    label="Quantity "
                    variant="outlined"
                    type="number"
                    defaultValue={book[1].quantity}
                    InputProps={{ inputProps: { min: 0 } }}
                    onChange={e => {
                        const temp = book;
                        temp[1].quantity = Number(e.target.value);
                        setBook(temp)

                    }}
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: '25ch' }}
                />
                <SelectCategory idCategory={values.idBookCategory} getIdCategory={getIdCategory} />
                <SelectPublisher idPublisher={values.idPublisher} getIdPublisher={getIdPublisher} />
                <TextField
                    label="Book cover photo"
                    variant="outlined"
                    defaultValue={values.imageBookCover}
                    onChange={e => setValues({ ...values, imageBookCover: e.target.value })}
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: '25ch' }}
                />

                <div className="ListImg" style={{ display: "flex" }}>
                    <div>
                        <TextField
                            label="Image Book"
                            variant="outlined"
                            value={urlImg}
                            
                            onChange={e => {
                                setUrlImg(e.target.value)
                            }}
                            id="outlined-start-adornment"
                            sx={{ m: 1, width: '25ch' }}
                        />
                        <Button style={{display:"block",margin:"auto" ,width:"20ch" }} onClick={() => onPushImg()} variant="contained">Add Image</Button>
                    </div>

                    <ImageList sx={{ width: 460, height: 220,marginLeft:1 }} cols={3} rowHeight={160}>
                        {img.map((item, index) => (
                            <ImageListItem sx={{padding:2 }} style={{marginBottom:"20px"}} >
                                <img
                                    src={`${item.image}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${item.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}

                                />
                                <button className='deleteImage' onClick={() => deleteListImg(index)}><ClearIcon/></button>
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
                <TextareaAutosize value={values.bookDescr} minRows={4} style={{ marginLeft: "10px", width: "87%", background: "none", border: "1px solid rgb(188,188,188)", borderRadius: "5px", padding: "5px" }} maxRows={10} onChange={e => setValues({ ...values, bookDescr: e.target.value })} className='textArea' placeholder='Description' />
            </div>
            <Button style={{ margin: "auto" }} onClick={onAddBook} variant="contained">{values.idBookLine==""?"Create":"Update"}</Button>
            <Button style={{ margin: "auto" }} onClick={resetForm} variant="contained">Reset</Button>
        </Box>
    );
}
