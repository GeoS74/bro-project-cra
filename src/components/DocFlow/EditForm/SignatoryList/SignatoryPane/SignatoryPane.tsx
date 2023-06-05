import styles from "./styles.module.css"

type Props = {
  signatory: IDocSignatory[]
}

export default function SignatoryPane({ signatory }: Props) {
  return <ul className={styles.root}>
    {signatory.map(s => (
      <li
        key={s.uid}
        onMouseEnter={_showOptionalButton}
        onMouseLeave={_showOptionalButton}
      >{`${s.name} ${s.email}`}

        <span hidden
          onClick={(event) => {
            if (!confirm('Удалить?')) {
              return;
            }
            event.currentTarget.parentElement?.remove();
            // if (docId) {
            //   _delFile(docId, f.fileName)
            // }
          }}
        ><small>удалить</small></span>

        <input type="hidden" name={`acceptor[${s.uid}]`} defaultValue={""} />
      </li>
    ))}
  </ul>
}

function _showOptionalButton(event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
  const optionalButton = event.currentTarget.querySelector('span') as HTMLElement | undefined;
  if (optionalButton) {
    optionalButton.hidden = !optionalButton.hidden;
  }
}