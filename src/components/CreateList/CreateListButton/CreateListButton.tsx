import { useState } from 'react';
import CreateListForm from '../CreateListForm.tsx/CreateListForm';

const CreateListButton = () => {
    const [isAddList, setIsAddList] = useState(false);
    return (
        <>
            {!isAddList && (
                <button onClick={() => setIsAddList(true)}>Добавить еще один список</button>
            )}
            {isAddList && <CreateListForm setIsAddList={setIsAddList} />}
        </>
    );
};

export default CreateListButton;
