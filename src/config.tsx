const prod = false; 
export default {
  catalog: {
    back: {
      host: prod ? '' : 'http://192.168.0.21',
      port: prod ? 0 : 3100,
    }
  },
  auth: {
    back: {
      host: prod ? '' : 'http://192.168.0.21',
      port: prod ? 0 : 3001,
    }
  },
  info: {
    back: {
      host: prod ? '' : 'http://192.168.0.21',
      port: prod ? 0 : 3200,
    }
  },
  mnote: {
    back: {
      host: prod ? '' : 'http://192.168.0.21',
      port: prod ? 0 : 3300,
    }
  },
  signum: {
    back: {
      host: prod ? '' : 'http://192.168.0.21',
      port: prod ? 0 : 3535,
    }
  },
}