import * as express from 'express';

import CatCtrl from './controllers/cat';
import UserCtrl from './controllers/user';
import InterviewCtrl from './controllers/interview';

import Cat from './models/cat';
import User from './models/user';
import Interview from './models/interview';

export default function setRoutes(app) {

  const router = express.Router();

  const catCtrl = new CatCtrl();
  const userCtrl = new UserCtrl();
  const interviewCtrl = new InterviewCtrl();

  // Cats
  router.route('/cats').get(catCtrl.getAll);
  router.route('/cats/count').get(catCtrl.count);
  router.route('/cat').post(catCtrl.insert);
  router.route('/cat/:id').get(catCtrl.get);
  router.route('/cat/:id').put(catCtrl.update);
  router.route('/cat/:id').delete(catCtrl.delete);

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  // Interviews
  router.route('/interviews').get(interviewCtrl.getAll);
  router.route('/interviews/count').get(interviewCtrl.count);
  router.route('/interviews').post(interviewCtrl.insert);
  router.route('/interviews/:id').get(interviewCtrl.get);
  router.route('/interviews/:id').put(interviewCtrl.update);
  router.route('/interviews/:id').delete(interviewCtrl.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
