type Props = {
  signatory: IDocSignatory[]
}

export default function SignatoryPane({signatory}: Props) {
  return <ul>
  {signatory.map(s => (
    <li key={s.uid}>{`${s.name} ${s.email}`}
      <input type="hidden" name={`acceptor[${s.uid}]`} defaultValue={""} />
    </li>
  ))}
</ul>
}