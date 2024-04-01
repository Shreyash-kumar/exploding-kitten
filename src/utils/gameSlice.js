import { createSlice } from "@reduxjs/toolkit";


const gameSlice = createSlice({
    name: 'game',
    initialState: {
        registeredUsers: [],
        currentUser: null,
        userRegistered: false,
        openLeaderBoard: false,
    },
    reducers: {
        addNewUser: (state, actions) => {
            state.registeredUsers.push({"name": actions.payload,"score": 0});
        },
        changeUserRegistered: (state, actions) => {
            state.currentUser = actions.payload;
            state.userRegistered = !state.userRegistered;
        },
        updateUserScore: (state, action) => {
            const { userName, score } = action.payload;

            // Use `findIndex` to find the index of the user
            const userIndex = state.registeredUsers.findIndex((user) => user.name === userName);


            if (userIndex !== -1) {
                // If the user is found, update their score
                state.registeredUsers[userIndex] = { "name": userName, "score": score };
            }
        }, 
        changeLeaderBoard: (state) => {
            state.openLeaderBoard = !state.openLeaderBoard;
        },
    }
});

export const { addNewUser, changeUserRegistered, updateUserScore, changeLeaderBoard } = gameSlice.actions;

export default gameSlice.reducer;