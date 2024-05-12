import useBoardData from '../../hooks/useBoardData';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import styles from './BoardPage.module.scss';
import CreateListButton from '../../components/CreateList/CreateListButton/CreateListButton';
import List from '../../components/List/List';
import { IList } from '../../types/entityTypes';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { IListReorder } from '../../types/entityTypes';
import useReorderList from '../../hooks/useReorderList';
const BoardPage = () => {
    const { id } = useParams();
    const { data, isSuccess } = useBoardData(id || '');

    const [listData, setListData] = useState<IList[]>([]);

    const { mutate } = useReorderList();
    useEffect(() => {
        if (data) {
            setListData(data.data.lists);
        }
    }, [data]);

    const handleDragDrop = results => {
        const { source, destination, type, draggableId } = results;

        if (!destination) return;
        if (source.droppableId === destination.droppableId && source.index === destination.index)
            return;
        if (type === 'group') {
            const listReorder: IListReorder = {
                id: draggableId,
                previousListId: null,
                nextListId: null,
            };
            const reorderedLists = [...listData];
            const sourceIndex = source.index;
            const destinationIndex = destination.index;
            const [removedList] = reorderedLists.splice(sourceIndex, 1);
            reorderedLists.splice(destinationIndex, 0, removedList);

            const previousListId =
                destinationIndex > 0 ? reorderedLists[destinationIndex - 1].id : null;
            const nextListId =
                destinationIndex < reorderedLists.length - 1
                    ? reorderedLists[destinationIndex + 1].id
                    : null;

            listReorder.previousListId = previousListId;
            listReorder.nextListId = nextListId;

            setListData(reorderedLists);
            mutate(listReorder);
        }
    };

    return (
        <Layout>
            {isSuccess && (
                <div
                    className={styles.boardWrapper}
                    style={{
                        backgroundImage: `url(${data?.data.backgroundImage})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div>
                        <DragDropContext onDragEnd={handleDragDrop}>
                            <div className={styles.lists}>
                                <Droppable droppableId="ROOT" type="group" direction="horizontal">
                                    {provided => (
                                        <div
                                            className={styles.lists}
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            {listData.map((list, index) => (
                                                <Draggable
                                                    draggableId={list.id.toString()}
                                                    index={index}
                                                    key={list.id}
                                                >
                                                    {provided => (
                                                        <div
                                                            {...provided.dragHandleProps}
                                                            {...provided.draggableProps}
                                                            ref={provided.innerRef}
                                                        >
                                                            <List
                                                                key={list.id}
                                                                list={list}
                                                                boardId={id!}
                                                            />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                                <div className={styles.addList}>
                                    <CreateListButton />
                                </div>
                            </div>
                        </DragDropContext>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default BoardPage;
