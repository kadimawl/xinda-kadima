import axios from 'axios'
import qs from 'qs'


export default function purchase(id, that) {
  console.log(that)
  axios.post("/xinda-api/cart/add", qs.stringify({
    id: id,
    num: 1
  }))
    .then(data => {
      if (data.data.status == 1) {
        axios.post("xinda-api/cart/submit").then(data => {
          if (data.data.data != "") {
            console.log(data.data.data);
            that.$router.push({
              path: "/Order/orderdetail",
              query: {
                orderNo: data.data.data
              }
            });
          }
        });
      }
    });
}


