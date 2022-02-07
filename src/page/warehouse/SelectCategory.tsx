import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { productController } from '../../controller/ProductController';
import { Category } from '../../model/Product';

interface Props {
  getIdCategory: (idCategory: string) => void
  idCategory: string
}
export default function SelectCategory(props: Props) {
  const [value, setValue] = React.useState(props.idCategory);
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
    props.getIdCategory(event.target.value)

  };

  const [category, setCategory] = React.useState<Category[]>([])
  React.useEffect(() => {
    productController.getListCategory().then(res => {
      setCategory(res)
      
    })
  }, [])


  return (

    <FormControl  sx={{ m: 1, width: '25ch' }}>
      <InputLabel id="demo1-simple-select-label">Category</InputLabel>
      <Select
        labelId="demo1-simple-select-label"
        id="demo1-simple-select"
        value={value}
        label="Category"
        onChange={handleChange}
      >
        {
          category.map((item, index) => (
            <MenuItem key={index} value={item.idCategory}>{item.nameCategory}</MenuItem>
          ))
        }
      </Select>
    </FormControl>


  );
}
