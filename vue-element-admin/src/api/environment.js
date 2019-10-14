let env = {}

switch (process.env.srconfig) {
  case 'prod':
    env = {
      envApi: 'https://somsgateway.ksudi.com',
      envWebSocket: '://somsgateway.ksudi.com'
    }
    break

  case 'beta':
    env = {
      envApi: 'http://localhost:9000',
      envWebSocket: '://localhost:9000'
    }
    break

  case 'test':
    env = {
      envApi: 'https://sstest1.ksudi.com',
      envWebSocket: '://sstest1.ksudi.com'
    }
    break

  case 'dev':
    env = {
      envApi: 'http://localhost:9000',
      envWebSocket: '://localhost:9000'
    }
    break

  default:
    env = {
      envApi: 'http://localhost:9000',
      envWebSocket: '://localhost:9000'
    }
    break
}

export default env
