import http from '../fetch/request'

export const getpucMess=(data)=>{//获取产品列表
return  http.requestGet('/foodData/mallAdmin/listProduct',data)
};
export const getpucDetail=(data)=>{//获取产品详情
  return  http.requestGet('/foodData/mall/product',data)
};
export const UpperShelf=(data)=>{//添加商品
  return http.requestPost('/foodData/mallAdmin/saveProduct',data)
};
export const deleteItem=(data)=>{//删除商品
  return http.requestGet('/foodData/mallAdmin/deleteProduct',data)
};
export const changeStatus=(data)=>{//改变上下架状态
  return http.requestGet('/foodData/mallAdmin/updateProductOnsale',data)
};

export const orderList=(data)=>{//订单列表
  return http.requestGet('/foodData/mallAdmin/listOrders',data)
};

export const sendGoods=(data)=>{//订单发货
  return http.requestGet('/foodData/mallAdmin/deliveryOrder',data)
};


