import { FormControl, MenuItem, Select } from '@mui/material';
import React from 'react';

import { productController } from '../../controller/ProductController';
import { Category } from '../../model/Product';
export default function SelectListCategory() {
    const [listCategory, setListCategory] = React.useState<Category[]>([]);
    const [category, setCategory] = React.useState('');
    React.useEffect(() => {
        productController.getListCategory().then(res => {
            let tempList: Category[] = res
            tempList.push({
                idCategory: "0",
                nameCategory: "All Category "
            })
            setListCategory(tempList)
            setCategory("0")
        })
    }, [])

    const handleChangeCategory = (event: { target: { value: string } }) => {
        setCategory(event.target.value);
    };
    return (

        <div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={category}
                    onChange={handleChangeCategory}
                >
                    {listCategory.map(item => (
                        <MenuItem key={item.idCategory} value={item.idCategory} >{item.nameCategory}</MenuItem>
                    ))}

                </Select>
            </FormControl>
        </div>
    )
}
