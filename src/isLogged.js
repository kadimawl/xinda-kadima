// import {
//   mapGetters
// } from 'vuex';
// export default {
//   computed: {
//     ...mapGetters(["getName"])
//   },
//   methods: {
//     isLogged() {
//       if (this.getName) {
//         this.$router.push({
//           path: '/tabs/shoppingCart'
//         })
//       } else {
//         this.$alert('请先进行登录', '标题名称', {
//           confirmButtonText: '确定',
//           callback: action => {
//             this.$router.push({
//               path: '/outter/login'
//             })
//           }
//         });
//       }
//     }
//   }
// }
// //确认是否登录
// export default function isLogged() {
//   if (!this.getName) {
//     this.$alert('请先进行登录', '标题名称', {
//       confirmButtonText: '确定',
//       callback: action => {
//         this.$router.push({
//           path: '/outter/login'
//         })
//       }
//     });
//   }
// }
