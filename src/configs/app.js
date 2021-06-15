import { overrideConfig } from '../utils'

const config = {
	name: 'be-project-router',
	node_env: 'development',
	version: 'development',
	service: 'router',
	port: 8080,
	log_level: 'info',
	nats_host: 'localhost',
	nats_port: 4222
}

const appConfig = overrideConfig(config)

export { appConfig }