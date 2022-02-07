import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Category, Publisher } from '../../model/Product';
import { productController } from '../../controller/ProductController';

export default function CategoryMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [ listCategory , setListCategory] = React.useState<Category[]>([]);
    React.useEffect(() => {
        productController.getListCategory().then(res => {
            setListCategory(res)
        })
      }, [])
    return (
        <div>
            <Button style={{color:"white",fontWeight:"600"}}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              
            >
                CATEGORY
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {
                  listCategory.map(item=>(
                    <MenuItem key={item.idCategory} >{item.nameCategory}</MenuItem>
                  ))
                }
           
                
            </Menu>
        </div>

  )
}
