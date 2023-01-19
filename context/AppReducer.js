export const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user_id: action.user_id,
                token: action.token,
                username: action.username
            }
        case 'LOGOUT': {
            return {
                ...state,
                user_id: null,
                token: null,
                username: null
            }
        }
        case 'CHANG_USER_NAME': {
            return {
                ...state,
                user_id: action.user_id,
                token: action.token,
                username: action.username
            }
        }

    }
}