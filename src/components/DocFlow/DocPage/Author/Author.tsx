export default function Author({ author }: IDoc) {
  return <div className="mt-4"><small>автор: {author.fullName}</small></div>
}