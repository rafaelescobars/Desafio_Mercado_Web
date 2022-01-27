const fs = require('fs');
const express = require('express');
const app = express()
const {
  create
} = require('express-handlebars');
const hbs = create({
  layoutsDir: __dirname + '/views',
  partialsDir: __dirname + '/views/components',
  helpers: {
    bienvenida: () => 'Bienvenido al mercado WEB, seleccione sus productos'
  }
})

app.listen(3000, () => {
  console.log('Servidor inicializado en el puerto 3000.');
})

app.engine('handlebars', hbs.engine)

app.set('view engine', 'handlebars')

// bootstrap
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))

//src
app.use('/src', express.static(__dirname + '/src'))

//axios
app.use('/node_modules', express.static(__dirname + '/node_modules'))

app.get('/', (req, res) => {

  // inicializar servidor con array productos de archivo json vació
  let productosJson = {
    productos: []
  }
  productosJson = JSON.stringify(productosJson, null, 2)
  fs.writeFile('./src/json/cart.json', productosJson, (err) => {
    if (err) throw err;
    console.log(err);
  })

  fs.readFile('./src/json/cart.json', (err, data) => {
    if (err) throw err;
    let productosCart = JSON.parse(data).productos

    console.log(productosCart);

    res.render('Dashboard', {
      layout: 'Dashboard',
      productos: ["banana", "cebollas", "lechuga", "papas", "pimenton", "tomate"],
      productosCart: productosCart
    })

  })

})

app.put('/producto/:nombreProducto', (req, res) => {
  const nombreProducto = req.params.nombreProducto
  fs.readFile('./src/json/cart.json', (err, data) => {
    if (err) throw err;
    let productosCart = JSON.parse(data).productos
    let productosCount = productosCart.push(`${nombreProducto}`)

    productosCart = [...new Set(productosCart)]
    productosCart.sort()

    let productosJson = {
      productos: productosCart
    }
    productosJson = JSON.stringify(productosJson, null, 2)

    fs.writeFile('./src/json/cart.json', productosJson, (err) => {
      if (err) throw err;
      console.log(err);
    })

    console.log(productosCart);

  })

})

app.get('/cart', (req, res) => {

  // fs.readFile('./src/json/cart.json', (err, data) => {
  //   if (err) throw err;
  //   let productosCart = JSON.parse(data).productos

  //   console.log(productosCart);

  //   res.render('Dashboard', {
  //     layout: 'Dashboard',
  //     productos: ["banana", "cebollas", "lechuga", "papas", "pimenton", "tomate"],
  //     productosCart: productosCart
  //   })

  // })

  // res.redirect('/')

})