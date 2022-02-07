import { count } from 'console'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import { cartController } from '../../controller/CartController'
import Rating from '@mui/material/Rating';
import { Cart, orderBook } from '../../model/Cart'
import { BookLineProps, Product } from '../../model/Product'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './ProductDetail.css'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { productController } from '../../controller/ProductController'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { userContext } from '../../context/UserContext'


// type State={
//     data:BookLineProps,
//     quantity:number
// }

export default function ProductDetails() {

    const { userInfor, onSetOpenFormLogin, onsetUserInfor } = useContext(userContext)
    const { ListCart, onLoadCarts } = useContext(CartContext)
    const { id } = useParams()
    const [data, setData] = useState<BookLineProps>({
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
        media: [{
            idBookLine: "",
            idImage: "",
            image: "",
        }, {
            idBookLine: "",
            idImage: "",
            image: "",
        },
        {
            idBookLine: "",
            idImage: "",
            image: "",
        },
        {
            idBookLine: "",
            idImage: "",
            image: "",
        }]
    })
    const [quantity, setQuatity] = useState<number>(1)
    const [listImage, setListImage] = useState<string[]>([])
    const [value, setValue] = React.useState('1');
    const [stateBook, setStateBook] = useState("old")
    const [price, setPrice] = useState(0)
    const [idBook, setIdBook] = useState("")
    useEffect(() => {
        productController.detail(String(id)).then(res => {
            let dataBook: BookLineProps = res
            setData(dataBook)
            const arrListImg = []
            arrListImg.push(dataBook.imageBookCover)
            if (dataBook.media.length > 0) {
                dataBook.media.map((item, index) => {
                    arrListImg.push(item.image)
                })
            }
            setListImage(arrListImg)
            if (dataBook.book.length == 2) {
                setStateBook("new")
                dataBook.book.map((item, index) => {
                    if (item.state == true) {
                        setIdBook(item.idBook)
                        setPrice(item.price)
                    }
                })
            } else {
                if (dataBook.book[0].state == true) {
                    setStateBook("new")
                } else {
                    setStateBook("old")
                }
                setIdBook(dataBook.book[0].idBook)
                setPrice(Number(dataBook.book[0].price))

            }

        })

    }, [])

    const onAddCart = () => {
        onsetUserInfor()
        if (userInfor.idUser == "") {
            onSetOpenFormLogin(true)
        }
        else {
            let orderProduct: orderBook = { idBook: idBook, price: price, quantity: Number(quantity), idOrder: ListCart.idOrder }
            cartController.addCart(orderProduct, userInfor.idUser).then(res => {
                onLoadCarts()
            })
        }
    }
    const onPlus = () => {
        setQuatity(quantity + 1)

    }
    const onMinus = () => {
        if (quantity > 1) {
            setQuatity(quantity - 1)
        }

    }


    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        let valueStateBook = (event.target as HTMLInputElement).value;
        data.book.map((item, index) => {
            if (item.state == true && valueStateBook == "new") {
                setPrice(item.price)
                setIdBook(item.idBook)
            }
            if (item.state == false && valueStateBook == "old") {
                setPrice(item.price)
                setIdBook(item.idBook)
            }
        })
        setStateBook((event.target as HTMLInputElement).value);
    };


    return (
        <div>
            <section className="productDetail">
                <div className="leftDetail">
                    <div className="imgDetail">
                        <Carousel autoPlay={true} >
                            {listImage.map((item, index) => (
                                <div key={index}>
                                    <img src={item} />
                                </div>
                            ))}

                        </Carousel>
                    </div>
                </div>
                <div className="rightDetail">
                    <h2 className='nameBook' >{data.bookTitle}</h2>
                    <div className="rating">
                        <Rating style={{ fontSize: "19px" }} name="half-rating" defaultValue={4.5} precision={0.5} />
                        <p className='countRating'>( 1 Rating )
                        </p>
                    </div>
                    <div className="priceBook">
                        <p>Price:  </p>
                        <h1>{price}đ </h1>
                    </div>

                    <FormControl style={{ paddingLeft: "40px" }}>
                        <RadioGroup
                            onChange={handleRadioChange}
                            row
                            value={stateBook}
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormLabel style={{ margin: "auto", marginRight: "30px" }} id="demo-row-radio-buttons-group-label">Status</FormLabel>

                            {data.book.map((item, index) => (
                                item.state == true ? <FormControlLabel key={index} value="new" control={<Radio />} label="New" /> :
                                    <FormControlLabel key={index} value="old" control={<Radio />} label="Old" />
                            ))}

                        </RadioGroup>
                    </FormControl>
                    <div className="quantityControl">
                        <p>Quantity:</p>
                        <button className='btnMinus' onClick={onMinus} >-</button>
                        <button className='btnQuantity' >{quantity}</button>
                        <button className='btnPlus' onClick={onPlus} >+</button>
                        {/* <input type="number" min="1" onChange={e => { setQuatity(Number(e.target.value)) }} /> */}

                    </div>
                    <button className='btnAddCart' onClick={onAddCart} >Add to cart
                    </button>
                    <div className="contact">
                        <div className="hotline">
                            <p> Hotline: 1900545482</p>
                        </div>
                        <div className="email">
                            Email: support.wakashop@waka.vn
                        </div>
                    </div>
                </div>
            </section>
            <div className="tab">

                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Description" value="1" />
                                <Tab label="Details" value="2" />

                            </TabList>
                        </Box>
                        <TabPanel value="1">Bạn có phải đối mặt với thách thức xây dựng và lãnh đạo một đội nhóm mới hay hồi sinh một đội nhóm trì trệ không?

                            Từ lâu, làm việc đội nhóm vẫn luôn được đánh giá là một trong những phương thức làm việc đem lại hiệu quả cao. Như chúng ta đã biết, những thành tựu vĩ đại luôn là thành quả của những đội nhóm vĩ đại. Nhưng để thực sự vận hành được một đội nhóm gồm nhiều cá nhân với những kỹ năng, quan điểm và tư duy khác nhau hoạt động trơn tru và tạo ra kết quả như mong đợi, hoặc thậm chí vượt xa kỳ vọng, vẫn luôn là thách thức đối với nhiều nhà lãnh đạo. Bên cạnh đó, nhiều nhà lãnh đạo vẫn còn giữ quan điểm lạc hậu về đội nhóm. Thời thế đang thay đổi với tốc độ nhanh chưa từng có, và đội nhóm của chúng ta cũng vậy. Những người cứ mãi bám víu vào quan điểm lỗi thời về đội nhóm và xây dựng đội nhóm trước khi sẽ bị tụt hậu trong tiến trình phát triển chung. Vậy bạn cần làm gì để tạo ra một đội nhóm có thể thành công đương đầu với những thách thức của thế giới ngày nay?

                            Đội Nhóm Tuyệt Đỉnh kiểm nghiệm thực tiễn đội nhóm thúc đẩy sự tăng trưởng ở 7 trong số những công ty tân tiến nhất thế giới. Các đội nhóm của họ trở thành động lực thúc đẩy tăng trưởng cho công ty nhờ thách thức các tri thức truyền thống và làm việc theo một cách khác đi. Cuốn sách sẽ giúp bạn tìm hiểu các cách tiếp cận làm việc nhóm của những công ty này:

                            - Các đội nhóm của Pixar sử dụng cơ chế phản hồi vòng tròn nhanh và tự do phản biện để biến những bộ phim còn nhiều thiếu sót trở thành những bom tấn trị giá tỉ đô.

                            - Văn hóa "tự do và trách nhiệm" cấp tiến giúp Netflix thực hiện sự chuyển đổi liên tục và làm thay đổi cả ngành công nghiệp phim ảnh.

                            - Các đội nhóm siêu tự chủ của Whole Food nắm bắt các phương pháp đo lường và cạnh tranh thân thiện để tạo động lực thúc đẩy hiệu suất làm việc.

                            - Zappos làm chủ sự kì quặc và thú vị giúp duy trì sự thành công của công ty.

                            Thông qua câu chuyện thành công của một vài công ty tuyệt vời nhất đang hoạt động hiện nay, Đội Nhóm Tuyệt Đỉnh sẽ thúc đẩy bạn tư duy về đội nhóm và vận hành động nhóm theo những cách mới. Thiết lập và quản lý những đội nhóm hiệu suất cao đòi hỏi phải nâng cấp những niềm tin và hành vi "bị lỗi thời", tạo ra mức độ phối hợp và làm việc chuyên sâu cần thiết trong công ty để vượt qua mọi thử thách. Cuốn sách đầy ắp những gợi ý thiết thực này sẽ giúp bạn nâng tầm hiệu suất hoạt động và mức độ cam kết cho đội nhóm của mình. Đây chính là cuốn sách dành cho những ai muốn vượt qua các cách tiếp cận đội nhóm truyền thống và xây dựng đội nhóm thực sự vĩ đại.

                            Thông tin về tác giả

                            Robert Bruce Shaw là một chuyên gia tư vấn quản trị. Ông tập trung vào tính hiệu quả của các lãnh đạo và đội nhóm của họ. Ông hỗ trợ các lãnh đạo doanh nghiệp xây dựng tổ chức và đội nhóm có thể đạt hiệu suất làm việc siêu việt. Chuyên môn của ông là làm việc với các giám đốc cấp cao, theo cá nhân và theo nhóm, về hiệu quả hoạt động tổ chức và lãnh đạo. Ông có bằng tiến sĩ về hành vi tổ chức của Đại học Yale và là tác giả của nhiều cuốn sách và bài báo về năng lực quản trị, đồng thời là một diễn giả nổi tiếng.</TabPanel>
                        <TabPanel value="2">THỂ LOẠI: Kinh Tế - Kinh Doanh
                            LOẠI SẢN PHẨM: Bìa mềm
                            KÍCH THƯỚC: 15 x 23 cm
                            SỐ TRANG: 283
                            TÁC GIẢ:
                            Robert Bruce Shaw
                            DỊCH GIẢ: Ngọc Hà
                            NHÀ XUẤT BẢN:
                            NXB Dân Trí
                            NHÀ PHÁT HÀNH: Tân Việt</TabPanel>

                    </TabContext>
                </Box>
            </div>

        </div>
    )
}
