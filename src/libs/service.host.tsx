import config from "../config"

type ServiceName = "bridge" | "mauth";

export default function serviceHost(name: ServiceName): string {
  switch (name) {
    case "bridge":
      return `${config.catalog.back.host || ''}${config.catalog.back.port ? ':' : ''}${config.catalog.back.port || ''}`;
    case "mauth":
      return `${config.auth.back.host || ''}${config.auth.back.port ? ':' : ''}${config.auth.back.port || ''}`;
  }
}