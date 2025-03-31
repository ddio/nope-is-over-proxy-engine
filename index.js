const ProxyChain = require('proxy-chain');

const balancer = require('./balancer');
const config = require('./env.json');

  // The function must return an object (or promise resolving to the object) with the following signature:
  // { requestAuthentication: boolean, upstreamProxyUrl: string, failMsg?: string, customTag?: unknown }
   
const server = new ProxyChain.Server({
  port: config.server.port,
  prepareRequestFunction: ({ request, username, password, hostname }) => {
    console.log(`Request to ${request.url} - ${hostname}`);

    const nextProxy = balancer.getNextProxy(hostname);
    if (!nextProxy) {
      return {}
    }
    const ret = {
      requestAuthentication: false,
      upstreamProxyUrl: `${nextProxy.protocol}://${nextProxy.server}`,
      ignoreUpstreamProxyCertificate: true
    };

    if (nextProxy.username && nextProxy.password) {
      ret.upstreamProxyUrl = `${nextProxy.protocol}://${nextProxy.username}:${nextProxy.password}@${nextProxy.server}`;
    }

    console.log(`Using upstream proxy ${ret.upstreamProxyUrl}`);

    return ret;
  }
})

server.listen(() => {
    console.log(`Proxy server is listening on port ${server.port}`);
});
