const mongoose = require('mongoose');

const connect = () => {
  if(process.env.NODE_ENV !== 'production')
  mongoose.set('debug', true)
}


// 몽고디비 사용자를 설정해야합니다.
// 어떻게 디비 유저를 설정해야하나요?
mongoose.connect('mongodb://localhost:27017', {
  userNewUrlParser: true,
}, (error) => {
  if(error) {
    console.error('몽고디비 연결에 에러가 있습니다.', error);
  } else {
    console.log('몽고디비 연결 성공입니다.')
  }
})