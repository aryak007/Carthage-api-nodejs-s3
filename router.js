const express = require('express');
const router = express.Router();

const s3Controller = require('./controllers/s3-controller.js')

//Not implemented fully
router.route('/files/:id')
    .post(s3Controller.uploadFileIntoSpecificBucket);
/*router.route('/create1/:id')
    .post(s3Controller.uploadFileIntoSpecificBucket1);
*/

//
router.route('/files/:id')
    .get(s3Controller.retrieveSpecificFileFromBucket)

router.route('/files')
    .get(s3Controller.retrieveAllFiles)

router.route('/files/:id')
    .delete(s3Controller.deleteSpecificFile)
module.exports = router;
