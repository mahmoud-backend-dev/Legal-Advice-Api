const userRoute = require('./userRoute');
const infoRoute = require('./infoRoute');
const newRoute = require('./newRoute');
const messageRoute = require('./messageRoute');
const questionRoute = require('./questionRoute');
const orderRoute = require('./orderRoute');
const postRoute = require('./postRoute')


const mountRoutes = (app) => {
  app.use('/api/v1/user', userRoute);
  app.use('/api/v1/info', infoRoute);
  app.use('/api/v1/news', newRoute);
  app.use('/api/v1/messages', messageRoute);
  app.use('/api/v1/questions', questionRoute);
  app.use('/api/v1/orders', orderRoute);
  app.use('/api/v1/posts', postRoute);
}

module.exports = mountRoutes;