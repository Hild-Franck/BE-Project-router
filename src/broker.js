import { ServiceBroker } from 'moleculer'
import ApiService from 'moleculer-web'

import { appConfig } from './configs'
import logger, { loggingOptions } from './logger'

const broker = new ServiceBroker({
  logger: {
    type: "Winston",
    options: {
      level: appConfig.log_level,
      winston: loggingOptions
    }
  },
  requestRetry: 20,
  transporter: `nats://${appConfig.nats_host}:${appConfig.nats_port}`
})

export const startBroker = async () => {
	broker.createService({
    mixins: [ApiService],
    settings: {
      port: 8080,
      onError(req, res, err) {
        res.setHeader("Content-Type", "application/json")
        const code = err.code || 500
        res.writeHead(code)
        res.end(JSON.stringify({
          error: err.message, code, type: err.type || "UNEXPECTED_ERROR"
        }))
      }
    }
  })

	try {
		await broker.start()
		logger.info('Running with the following config', { meta: appConfig })
	} catch(error) {
		logger.error(error.message)
	}
}

export default broker
