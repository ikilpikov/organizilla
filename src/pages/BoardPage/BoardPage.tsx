import useBoardData from '../../hooks/useBoardData';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import styles from './BoardPage.module.scss';
import CreateListButton from '../../components/CreateList/CreateListButton/CreateListButton';
import List from '../../components/List/List';
import { IList } from '../../types/entityTypes';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const BoardPage = () => {
    const { id } = useParams();
    const { data, isSuccess } = useBoardData(id || '');
    const [listData, setListData] = useState<IList[]>([]);
    useEffect(() => {
        if (data) {
            console.log(data);
            setListData(data.data.lists);
        }
    }, [data]);

    const handleDragDrop = results => {
        const { source, destination, type } = results;

        if (!destination) return;
        if (source.droppableId === destination.droppableId && source.index === destination.index)
            return;
        if (type === 'group') {
            const reorderedLists = [...listData];
            const sourceIndex = source.index;
            const destinationIndex = destination.index;
            const [removedList] = reorderedLists.splice(sourceIndex, 1);
            reorderedLists.splice(destinationIndex, 0, removedList);
            return setListData(reorderedLists);
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
                                                        <List key={list.id} list={list} />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                        <div>
                            <CreateListButton />
                        </div>
                    </div>

                    {/*  <div>
                        <DragDropContext onDragEnd={() => console.log('drag drop event occured')}>
                            <Droppable droppableId="ROOT" type="group">
                                {provided => (
                                    <div className={styles.lists}>
                                        {isSuccess &&
                                            listData.map((list, index) => (
                                                <Draggable
                                                    draggableId={index}
                                                    key={list.id}
                                                    index={index}
                                                >
                                                    {provided => (
                                                        <div
                                                            {...provided.dragHandleProps}
                                                            {...provided.draggableProps}
                                                            ref={provided.innerRef}
                                                        >
                                                            <h3>{list.name}</h3>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                    </div>
                                )}
                            </Droppable>

                            <div>
                                <CreateListButton />
                            </div>
                        </DragDropContext>
                    </div> */}
                </div>
            )}
        </Layout>
    );
};

export default BoardPage;
