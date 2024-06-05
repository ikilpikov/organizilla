import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// Подключаем хук useTheme
import useDescription from 'hooks/useDescription';
import { useTheme } from 'hooks/useTheme';
import { formats, modules } from 'constants/textEditor';
import './TextEditor.scss';

interface ITextEditorProps {
    cardId: number;
    description: string | null;
}
const TextEditor: FC<ITextEditorProps> = ({ cardId, description }) => {
    const { t } = useTranslation();
    const [body, setBody] = useState(description);
    const { theme } = useTheme();
    const { mutate } = useDescription();

    const saveText = () => {
        mutate({ cardId, description: body });
    };

    return (
        <div>
            <div className={`text-editor ${theme}`}>
                <ReactQuill
                    placeholder={t('textEditor.placeholder')}
                    modules={modules}
                    formats={formats}
                    value={body}
                    onChange={setBody}
                    theme="snow"
                />
            </div>
            <button onClick={() => saveText()} className="text-editor__save">
                {t('textEditor.button')}
            </button>
        </div>
    );
};

export default TextEditor;
