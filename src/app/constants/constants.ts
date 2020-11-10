
// export const ROLES: IRole[] = [
//   { Id: 1, Name: 'super admin' },
//   { Id: 2, Name: 'admin' },
//   { Id: 3, Name: 'staff' }
// ];

export const BILL_STATUS = {
  pending: {
    key: '0',
    label: 'Đang chờ xác nhận'
  },
  accept: {
    key: '1',
    label: 'Đã xác nhận'
  },
  transport: {
    key: '2',
    label: 'Đang vận chuyển'
  },
  done: {
    key: '3',
    label: 'Đã giao hàng'
  },
  canceled: {
    key: '4',
    label: 'Đã huỷ'
  }
};

export const PAYMENT_STATUS = {
  pending: '0',
  success: '1',
  canceled: '2'
};

export const TRANS_TYPE = {
  online: '2',
  payment_on_delivery: '1'
};
