const express = require('express');

const app = express();
const port = 4000;

app.use(express.static('public'));
app.use('stylesheet', express.static('public/stylesheet'));

app.set('view engine', 'ejs');

app.get('', (req, res) => {
  res.render('index')
});


app.listen(port, () => console.info(`App is listning on port ${port}`));
