declare module "*.module.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

type ServiceName = "bridge" | "mauth" | "informator";