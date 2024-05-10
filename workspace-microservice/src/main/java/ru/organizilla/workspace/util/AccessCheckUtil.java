package ru.organizilla.workspace.util;

import org.springframework.stereotype.Component;
import ru.organizilla.workspace.domain.Board;
import ru.organizilla.workspace.domain.User;
import ru.organizilla.workspace.domain.enums.BoardAuthority;

@Component
public class AccessCheckUtil {


    /**
     * Checks if user can create, update and delete cards and lists in a board
     * @param user User database entity
     * @param board Board database entity
     * @return Check result
     */
    public boolean canCreateUpdateDeleteCardAndList(User user, Board board) {
        return isUserCreator(user, board) || isUserEditor(user, board);
    }

    /**
     * Checks if user can read cards and lists in a board
     * @param user User database entity
     * @param board Board database entity
     * @return Check result
     */
    public boolean canReadBoardEntities(User user, Board board) {
        return isUserCreator(user, board) || isUserEditor(user, board) || isUserReadonly(user, board);
    }

    /**
     * Checks if user can create, update and delete board only
     * @param user User database entity
     * @param board Board database entity
     * @return Check result
     */
    public boolean canCreateUpdateDeleteBoard(User user, Board board) {
        return isUserCreator(user, board);
    }

    private boolean isUserCreator(User user, Board board) {
        return board.getCreatedBy().equals(user);
    }

    private boolean isUserReadonly(User user, Board board) {
        return hasAuthority(user, board, BoardAuthority.READONLY);
    }

    private boolean isUserEditor(User user, Board board) {
        return hasAuthority(user, board, BoardAuthority.EDITOR);
    }

    private boolean hasAuthority(User user, Board board, BoardAuthority authority) {
        var boardColabInfo = board
                .getBoardColab()
                .stream()
                .filter(b -> b.getUser().equals(user))
                .findFirst();

        return boardColabInfo.filter(boardColab -> boardColab.getAuthority() == authority).isPresent();
    }
}



