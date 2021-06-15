import express from 'express'

import authRoutes from './auth'

const routes = {
  create: app => {
    const Router = express.Router

    app.use('/auth', authRoutes(Router()))
  }
}

export default routes