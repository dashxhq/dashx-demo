const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./configs/swagger.json');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('public'));
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => console.log(`Server listening on port ${port}`));
