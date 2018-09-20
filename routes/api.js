// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

/*  This is a sample API route. */
const Profile = require('../models/Profile')

router.get('/profile', (req, res) => {

	const query =req.query

	Profile.find(query)
	.then(profiles => {
	res.json({
		confirmation: 'success',
        data : profiles
	})
}).catch(err=>{
	res.json({
		confirmation :'fail',
		message :err.message
	})
})
})
router.get('/profile/update', (req,res) => {
	const query = req.query
	const profileId = query.id

	Profile.findByIdAndUpdate(profileId , query,{new:true})
	.then(profile=> {
		res.json({
			confirmation :'success',
			data: profile
		})
	})
	.catch(err=> {
		res.json({
		confirmation :'fail',
		message : err.message
	})

	})
})

router.get('/profile/remove', (req,res)=> {
	const query =req.query
	Profile.findByIdAndRemove(query.id)
	.then(data => {
		res.json({
			confirmation:'success',
			data:'Profile '+query.id+' successfullly removed'
		})

	})
	.catch(err=> {
		res.json({
		confirmation :'fail',
		message : err.message
	})
	})
})

router.get('/profile/:id',(req, res)=> {
	const id = req.params.id

	Profile.findById(id)
	.then(profile => {
		res.json({
			confirmation :"sucess",
			data:profile
		})
	}).catch(err=> {
		res.json({
		   confirmation :'fail',
		   message : 'profile id :'+id+' not found!!!'
	    })
	})	
})



router.post('/profile',(req,res) => {

	Profile.create(req.body)
	.then(
	    profile => {

		res.json({
		confirmation :'success',
		data : profile
		})
	})
    .catch(err =>{

		res.json({
		confirmation :'fail',
		message :err.message
	    })
	})
})



module.exports = router
