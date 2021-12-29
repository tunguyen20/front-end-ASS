import { count } from 'console';
import React, { useState } from 'react'
import { Phone, Product } from '../../model/Product';

interface Props {
    onAdd: (product: Product) => void,
    dataForm: Product

};

export default function CartLeft(props: Props) {
    const [newProduct, setNewCourse] = useState<Product>({ idProduct: props.dataForm.idProduct, name: props.dataForm.name, price: props.dataForm.price, img: props.dataForm.img })


    // const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setNewCourse({ ...newProduct, [event.target.name]: event.target.value })


    const [checkName, setCheckName] = useState<boolean>()
    const [checkImg, setCheckImg] = useState<boolean>()
    let name = checkName == false ? "Tên trên 5 kí tự" : ""
    let img = checkImg == false ? "Chưa nhập link ảnh" : ""
    const onBlur = (string: string) => {
        if (string == "name") {
            newProduct.name.length == 0 || newProduct.name.length < 5 ? setCheckName(false) : setCheckName(true)
        }
        else if (string == "img") {
            newProduct.img.length == 0 ? setCheckImg(false) : setCheckImg(true)
        }
    }
    let typeButton = newProduct.idProduct == 0 ? "Thêm" : "Sửa"

    const onInputName = () => {
        setCheckName(true)
        onBlur("img")
    }
    const onInputImg = () => {
        setCheckImg(true)
        onBlur("name")
    }
    const onInputPrice = () => {
        onBlur("name")
        onBlur("img")
    }
    const checkForom = () => {
        onBlur("name")
        onBlur("img")
        if (checkName == true && checkImg == true) {
            return props.onAdd(newProduct)
        }

    }

    return (
        <div className="left">
            <div className="form">
                <h2 id="formitem">Thêm sản Phẩm</h2>
                <label htmlFor="imageProduct">
                    <h4>Hình Ảnh</h4>
                </label>
                <input type="text" id="imageProduct" placeholder="https://..." name='img' onChange={e => setNewCourse({ ...newProduct, img: e.target.value })} value={newProduct.img} onBlur={() => onBlur("img")} onInput={onInputImg} />
                <span style={{ color: "red", fontSize: "12px" }} >{img}</span>
                <label htmlFor="nameProduct">
                    <h4>Tên Sản Phẩm </h4>
                </label>
                <input type="text" id="nameProduct" placeholder="Không bỏ trống" name='name' onChange={e => setNewCourse({ ...newProduct, name: e.target.value })} value={newProduct.name} onBlur={() => onBlur("name")} onInput={onInputName} />
                <span style={{ color: "red", fontSize: "12px" }} >{name}</span>
                <label htmlFor="priceProduct">
                    <h4>Giá Sản Phẩm</h4>
                </label>
                <input type="number" id="priceProduct" placeholder="Không bỏ trống" name='price' min="0" onChange={e => setNewCourse({ ...newProduct, price: Number(e.target.value) })} value={newProduct.price} onInput={onInputPrice} />

                <button className='btnAddProduct' id='themSuaSp' onClick={checkForom} > {typeButton} Sản Phẩm</button>


            </div>
        </div>
    )
}
