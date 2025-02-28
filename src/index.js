import 'core-js/modules/es.object.values'
import 'core-js/modules/es.promise' 

import sum from "./utils";
import './styles/style.css'
import './styles/style.scss'
import { setTimeout } from 'core-js';
console.log(sum(100,20));
//lúc này cho file html nối qua rồi chạy live server sẽ thấy ko
//      thể đọc cú pháp import
// => lcu1 này webpack sẽ phát huy tác dụng: yarn build
//      sẽ chạy và tạo sản phẩm trong thư mục dist
//      dùng các file đó sẽ chạy đc mà ko cần đổi module import

//test babel ES6 Spread Operator
const person = { name: 'Duoc' }
const personClone = { ...person }
console.log('personClone', personClone)

//test babel ES7 Object.values
console.log('Object.values', Object.values(personClone))

//test babel với promise async-await
const handle = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve(100)
    }, 1000)
})
const main = async () => {
    const value = await handle();
    console.log('Value: ' + value);
}
main();