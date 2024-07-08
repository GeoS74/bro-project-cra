import config from "../config"

export default function serviceHost(name: ServiceName): string {
  switch (name) {
    case "bridge":
      return _makeURL(config.catalog.back.host, config.catalog.back.port);
    case "mauth":
      return _makeURL(config.auth.back.host, config.auth.back.port);
    case "informator":
      return _makeURL(config.info.back.host, config.info.back.port);
    case "mnote":
      return _makeURL(config.mnote.back.host, config.mnote.back.port);
    case "cargobox":
      return _makeURL(config.cargobox.back.host, config.cargobox.back.port);
  }
}

function _makeURL(host: string, port: number): string {
  return `${host || ''}${port ? ':' : ''}${port || ''}`
}