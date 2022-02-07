import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { productController } from '../../controller/ProductController';
import { Publisher } from '../../model/Product';

interface Props {
  getIdPublisher: (idPublisher: string) => void
  idPublisher: string
}

export default function SelectPublisher(props: Props) {
  const [value, setValue] = React.useState(props.idPublisher);

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
    props.getIdPublisher(event.target.value)
  };

  const [publisher, setPublisher] = React.useState<Publisher[]>([])
  React.useEffect(() => {
    productController.getListPublisher().then(res => {
      setPublisher(res)
    })
  }, [])

  return (

    <FormControl key={value} sx={{ m: 1, width: '25ch' }}>
      <InputLabel id="demo-simple-select-label">Publisher</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Publisher"
        onChange={handleChange}
      >
        {
          publisher.map((item, index) => (
            <MenuItem key={index} value={item.idPublisher}>{item.namePublisher}</MenuItem>
          ))
        }

      </Select>
    </FormControl>


  );
}
