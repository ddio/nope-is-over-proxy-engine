const config = require('./env.json');

class LoadBalancer {
  constructor() {
    this.perDomainCursor = {}

    for (const domainConfig of config.proxy) {
      const domain = domainConfig.targetDomain;
      if (!this.perDomainCursor[domain]) {
        this.perDomainCursor[domain] = {
          config: domainConfig,
          cursor: 0
        }
      }
    }
  }

  getNextProxy(urlDomain) {
    const domainCursor = this.perDomainCursor[urlDomain]
    if (!domainCursor || !domainCursor.config.proxies) {
      return null
    }

    const cursor = domainCursor.cursor
    const proxy = domainCursor.config.proxies[cursor]
    domainCursor.cursor = (domainCursor.cursor + 1) % domainCursor.config.proxies.length

    return proxy
  }
}

module.exports = new LoadBalancer();