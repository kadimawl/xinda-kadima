import axios from 'axios'
import qs from 'qs'


export default function purchase(id, that) {
  axios.post("/xinda-api/cart/add", qs.stringify({
    id: id,
    num: 1
  }))
    .then(data => {
      if (data.data.status == 1) {
        // that.$router.push({
        //   path: "/tabs/shoppingCart"
        // });
      }
    });
}
