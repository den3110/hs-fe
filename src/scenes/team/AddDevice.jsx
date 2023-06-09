import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TextField } from '@mui/material';
import addDeviceApi from '../../api/add_device';
import swal from 'sweetalert';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddDevice(props) {
  const [deviceName, setDeviceName]= React.useState("")
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button type={"button"} color={"primary"} variant={"contained"} onClick={handleClickOpen}>
        Thêm thiết bị
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Thêm thiết bị"}</DialogTitle>
        <DialogContent>
            <TextField value={deviceName} onChange={(e)=> setDeviceName(e.target.value)} placeholder={"Tên thiết bị"} style={{height: 40, width: 400}} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Đóng</Button>
          <Button variant={"contaiend"} onClick={async ()=> {
            const result= await addDeviceApi(deviceName)
            swal("Thông báo", "Tạo thành công thiết bị", "success")
            .then(()=> props?.setChange(prev=> !prev))
            .then(()=> handleClose())
          }}>Tạo</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}