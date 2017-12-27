import axios from 'axios'
import qs from 'qs'


export default function purchase(id, that,url) {
  console.log(url)
  axios.post("/xinda-api/cart/add", qs.stringify({
    id: id,
    num: 1
  }))
    .then(data => {
<<<<<<< HEAD
      if (data.data.status == 1) {
        // that.$router.push({
        //   path: "/tabs/shoppingCart"
        // });
      }
=======
      that.$router.push({ path: url });
>>>>>>> 4fff3aecf1e3bf36615556f2ce409fdef1af1bae
    });
}
