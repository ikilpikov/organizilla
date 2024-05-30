import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FC, useState } from 'react';
import 'react-tooltip/dist/react-tooltip.css';
import './TextEditor.scss'; // Подключаем SCSS файл
import { useTheme } from '../../hooks/useTheme'; // Подключаем хук useTheme
import useDescription from '../../hooks/useDescription';
import { modules, formats } from '../../constants/textEditor';

interface ITextEditorProps {
    cardId: number;
    description: string | null;
}
const TextEditor: FC<ITextEditorProps> = ({ cardId, description }) => {
    const [body, setBody] = useState(description);
    const { theme } = useTheme();
    const { mutate } = useDescription();

    const saveText = () => {
        console.log(body);

        mutate({ cardId, description: body });
    };

    return (
        <div>
            <div className={`text-editor ${theme}`}>
                <ReactQuill
                    placeholder="Write some amazing..."
                    modules={modules}
                    formats={formats}
                    value={body}
                    onChange={setBody}
                    theme="snow"
                />
            </div>
            <button onClick={() => saveText()} className="text-editor__save">
                Save
            </button>
        </div>
    );
};

export default TextEditor;
