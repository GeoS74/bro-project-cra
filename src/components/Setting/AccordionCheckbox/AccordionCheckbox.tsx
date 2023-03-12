type Props = {
  id: string,
  name: string,
  title: string,
}

export default function AccordionCheckbox({ id, name, title }: Props) {
  return <>
    <input type="checkbox" 
      name={name} 
      id={id}
      className="form-check-input" />

    <label className="form-check-label" htmlFor={id}>
      {title}
    </label>
  </>
}
