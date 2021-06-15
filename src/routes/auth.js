import broker from '../broker'

const authRoutes = router => {
	router.post('/register', ({ body }) => broker.call('auth.register', body))
	router.post('/login', ({ body }) => broker.call('auth.login', body))
	// router.get('/me', authorize(['user']), controllers.auth.me)
	return router
}

export default authRoutes