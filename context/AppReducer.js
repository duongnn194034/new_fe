import { avatar, coverImage } from "../ultis/Constants"

export const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user_id: action.user_id,
                token: action.token,
                username: action.username,
                description: action.description,
                address: action.address,
                city: action.city,
                country: action.city,
                link: action.link,
                birthday: action.birthday,
                avatar: (action.avatar) ? avatar : action.avatar,
                coverImg: (action.coverImg) ? coverImage : action.coverImg
            }
        case 'LOGOUT': {
            return {
                ...state,
                user_id: null,
                token: null,
                username: null, 
                description: null,
                address: null,
                city: null,
                country: null,
                link: null,
                birthday: null,
                avatar: null,
                coverImg: null
            }
        }
        case 'CHANG_USER_NAME': {
            return {
                ...state,
                username: action.username
            }
        }
        case 'CHANG_AVATAR': {
            return {
                ...state,
                avatar: action.avatar,
                coverImg: action.coverImg
            }
        }

    }
}