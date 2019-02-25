const express = require('express');
const router = express.Router();
const { loadRootAssets } = require('./index');

router.get('/', ensureAuthenticated, (req, res) => {
    const { id } = req.user;
    loadRootAssets(id, null, res);
});

module.exports = router;