
/*
 *
 */

var Users = require('../controllers/users');

module.exports = function(app) {
	app.get('/', function (req, res) {
	    res.render('index', {
	    title: '主页',
	    user: req.session.user,
	    success: req.flash('success').toString(),
	    error: req.flash('error').toString()
	  });
  });

	app.get('/signup', checkNotLogin);
  app.get('/signup', Users.signup);

  app.post('/signup', checkNotLogin);
  app.post('/signup', Users.add);

	app.get('/login', checkNotLogin);
  app.get('/login', Users.login);

  app.post('/login', checkNotLogin);
  app.post('/login', Users.doLogin);

  app.get('/post', function (req, res) {
    res.render('post', { title: '发表' });
  });

  app.post('/post', function (req, res) {

  });

  app.get('/logout', checkLogin);
  app.get('/logout', Users.logout);

  function checkLogin(req, res, next) {
    if (!req.session.user) {
      req.flash('error', '未登录!'); 
      res.redirect('/login');
    }
    next();
  }

  function checkNotLogin(req, res, next) {
    if (req.session.user) {
      req.flash('error', '已登录!'); 
      res.redirect('back');
    }
    next();
  }
};