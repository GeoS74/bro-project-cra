import config from "../config"

export default function serviceHost(name: ServiceName): string {
  switch (name) {
    case "bridge":
      return `${config.catalog.back.host || ''}${config.catalog.back.port ? ':' : ''}${config.catalog.back.port || ''}`;
    case "mauth":
      return `${config.auth.back.host || ''}${config.auth.back.port ? ':' : ''}${config.auth.back.port || ''}`;
    case "informator":
      return `${config.info.back.host || ''}${config.info.back.port ? ':' : ''}${config.info.back.port || ''}`;
  }
}