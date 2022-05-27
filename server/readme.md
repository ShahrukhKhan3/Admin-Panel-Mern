// {"title": "sandwich", "price": 500, "status": true, image: file}
app.post('/upload-product-form', async (req, res) => {
  var form = new multiparty.Form({uploadDir: './public/images'});
  
  form.parse(req, async function(err, fields, files) {
    if (err) return res.send({'error': err.message});

    // console.log(`fields = ${JSON.stringify(fields, null, 2)}`);
    // console.log(`files = ${JSON.stringify(files, null, 2)}`);
    
    let fileName = '';
    // let uploadedPath = files.image[0].path;
    // let destPath = './public/images/' + files.image[0].originalFilename;
    // // Renamed to the real file name
    // try{
    //   await fs.promises.rename(uploadedPath, destPath);
    //   fileName = `./images/${files.image[0].originalFilename}`;
    // } catch(err) {
    //   console.log(err.message);
    // }

    // path = public\images\To_hwVTcV21uofUicKwdu8Db.png
    // scr = .\images\To_hwVTcV21uofUicKwdu8Db.png
    fileName = files.image[0].path.replace("public", ".");
    
    const product = new Product({
      title: fields.title[0],
      price: fields.price[0],
      status: fields.status[0],
      image: fileName
    });

    try {
      const prod = await product.save(); // SQL insert query
      console.log(`product = ${JSON.stringify(prod, null, 2)}`);
      res.send(prod); 
    } catch(err){
      res.send({'error': err.message});
    }
  })
});
 
