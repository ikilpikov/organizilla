import { FC } from 'react';
import { ICard } from '../../types/entityTypes';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Card from '../Card/Card';
import styles from './ListContainer.module.scss';

interface IListContainerProps {
    cards: ICard[];
    listId: string;
}

const ListContainer: FC<IListContainerProps> = ({ cards, listId }) => {
    return (
        <Droppable droppableId={listId} type="card">
            {provided => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                    <div className={styles.listContainer}>
                        {cards?.map((card, index) => (
                            <Draggable draggableId={card.id.toString()} index={index} key={card.id}>
                                {provided => (
                                    <div
                                        {...provided.dragHandleProps}
                                        {...provided.draggableProps}
                                        ref={provided.innerRef}
                                    >
                                        <Card card={card} />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                </div>
            )}
        </Droppable>
    );
};

export default ListContainer;
