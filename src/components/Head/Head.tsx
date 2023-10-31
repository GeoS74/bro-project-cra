import { Helmet } from "react-helmet";

type Props = {
  title?: string,
  description?: string,
}

const defaultTitle = 'SIGNAL - поставщик автомобильных запчастей и запасных частей к спецтехнике';
const defaultDescription = 'SIGNAL - поставщик автомобильных запчастей и запасных частей к спецтехнике';

export default function Head({title, description}: Props) {
  document.title = title || defaultTitle;
  document.querySelector('meta[name="description"]')?.setAttribute('content', description || defaultDescription);
  console.log(document.title);

  return <></>

  // return <Helmet onChangeClientState={() => {
  //   const metaDescription = document.querySelector('meta[name="description"]');
  //   if (metaDescription) {
  //     metaDescription.setAttribute('content', description || defaultDescription);
  //   }}
  //   }>
  //   <title>{title || defaultTitle}</title>
  //   {/* <meta name="description" content={description || defaultDescription} /> */}
  // </Helmet>
}