//  const fs = require('fs');
// const axios = require('axios');

const productoClick = (nombreProducto) => {
  axios.put(`http://localhost:3000/producto/${nombreProducto}`)
}

const updateModal = async () => {
  const modalContent = document.querySelector('#modalContent')

  const res = await axios.get('./src/json/cart.json')
    .then((values) => {
      const productos = values.data.productos
      console.log(productos);
      modalContent.innerHTML = ''

      productos.forEach(element => {
        modalContent.innerHTML += `<img src="/src/img/${element}.png" alt="" width="50" height="50">`
      });

    })

}