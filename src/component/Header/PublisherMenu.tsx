import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Publisher } from '../../model/Product';
import { productController } from '../../controller/ProductController';

export default function PublisherMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [ listPublisher , setListPublisher] = React.useState<Publisher[]>([{
        idPublisher:"",
        namePublisher:""
    }]);
    React.useEffect(() => {
        productController.getListPublisher().then(res => {
            setListPublisher(res)
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
                PUBLISHER
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
                  listPublisher.map(item=>(
                    <MenuItem key={item.idPublisher} >{item.namePublisher}</MenuItem>
                  ))
                }
            </Menu>
        </div>

  )
}
