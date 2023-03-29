import { ErrorMessage } from "../ErrorMessage/ErrorMessage"

type Props = {
    errorMessage: IErrorDocMessage | undefined
}

export default function TextPane({ errorMessage }: Props) {
    return <div className="form-group mb-4">
        <label htmlFor="titleInput" className="form-label mt-1">Название документа</label>

        <div>
            <input type="text" id="titleInput" name="title" className="form-control" placeholder="Введите название документа" />
            {errorMessage?.field === "title" ? <ErrorMessage errorMessage={errorMessage.message} /> : <></>}
        </div>

        <label htmlFor="descTextarea" className="form-label mt-4">Пояснительная записка</label>

        <textarea className="form-control" id="descTextarea" name="description"></textarea>
    </div>
}