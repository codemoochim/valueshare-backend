// {
//   productTitle: 'asd',
//   productStock: '12',
//   productPrice: '13',
//   productCategory: 'Accessories',
//   productBrand: 'Chanel',
//   'productImage[]': [
//     'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD']}

//     req.body 이고 { } 안에
//     const body = {
//       productImage: imgFile, // useState 가 그대로 들어왔음
//     }

//     /**
//      * axios 는 json 해줄 필요가 없어 자동으로 됨.
//      * JSON.Stringify() 는 JSON 문자열로 바꾸어줌
//      * const formData = new FormData();
//      * formData.append("imageFile", JSON.stringify(imgFile));
//      * 이렇게 해줬었는데,
//      *
//      *
//      * console.log(formData.get("imageFile")); 했을 때
//      * 이게 key 로 나옴
//      * data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhw
//      */
