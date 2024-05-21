import { FC } from 'react';
import { ICard } from '../../types/entityTypes';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Card from '../Card/Card';
interface IListContainerProps {
    cards: ICard[];
    listId: string;
}
const ListContainer: FC<IListContainerProps> = ({ cards, listId }) => {
    return (
        <div>
            <Droppable droppableId={listId}>
                {provided => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        <div className="items-container">
                            {cards?.map((card, index) => (
                                <Draggable
                                    draggableId={card.id.toString()}
                                    index={index}
                                    key={card.id}
                                >
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
        </div>
    );
};

export default ListContainer;
