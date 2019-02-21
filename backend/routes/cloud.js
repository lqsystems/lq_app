var express = require('express');
var router = express.Router();
var fs = require('fs');





// --------------------------------------------------------------------
// --------------------------------------------------------------------
const g_Root = '/';

// --------------------------------------------------------------------
// --------------------------------------------------------------------


var Reaction = require('../models/reaction');
var Measurements = require('../models/measurements');


function handleError(err) {
    console.log(err);
    return(err)
}


//======  ======  ======   ======   ======   ======   ======   ======   ======   ======   ======   ======   ======
//  Get Dashboard and Populate
//

router.get(g_Root, ensureAuthenticated, function(req, res){
    //
    var userId = req.user.id;
    loadRootAssets(userId,'cloud',res);
    //
  });



module.exports = router;
