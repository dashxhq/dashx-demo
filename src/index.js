const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./configs/swagger.json');
const SwaggerPlugin = require('./plugins/swagger');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('public'));

const swaggerOptions = {
  plugins: Object.values(SwaggerPlugin),
};

app.use(
  '/swagger',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    swaggerOptions,
    customCssUrl: '/assets/css/swagger.css',
  })
);

app.listen(port, () => console.log(`Server listening on port ${port}`));
