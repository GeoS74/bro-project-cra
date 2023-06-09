import { Converter } from "md-conv";

const converter = new Converter()

export default function Description({ description }: IDoc) {
  return <div className="mt-4"
    dangerouslySetInnerHTML={{ __html: converter.markdownToHTML(description) }}
  ></div>
}