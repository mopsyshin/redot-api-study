// 라우팅 로직 설정
const express = require('express');
const router = express.Router();
const ctrl = require('./post.ctrl');

router.get('/', ctrl.index);
router.get('/:id', ctrl.show);
router.delete('/:id', ctrl.destroy);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);

module.exports = router;