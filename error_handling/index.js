const express = require('express');
const app = express();
const router = require('./router');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(router);

app.listen(PORT, () => {
    console.log(`server connected in port ${PORT}`);
})