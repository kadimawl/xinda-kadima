import axios from 'axios'
import qs from 'qs'


export default function purchase(id, that,url) {
  console.log(url)
  axios.post("/xinda-api/cart/add", qs.stringify({
    id: id,
    num: 1
  }))
    .then(data => {
      that.$router.push({ path: url });
    });
}
