const express=require('express')
const router=express.Router();
const adminData=require('../controller/adminController')
const authMiddleware=require('../middleware/authMiddleware')
const adminMiddleware=require('../middleware/adminMiddleware')

router.route('/users').get(authMiddleware,adminMiddleware,adminData.allUser)
router.route('/contact').get(authMiddleware,adminMiddleware,adminData.allContact)
router.route('/delete/:id').delete(authMiddleware,adminMiddleware,adminData.userDelete)
router.route('/edit/:id').get(authMiddleware,adminMiddleware,adminData.userUpdateGet)
router.route('/edit/:id').patch(authMiddleware,adminMiddleware,adminData.userUpdate)





module.exports=router;