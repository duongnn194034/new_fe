import { avatar_basic, coverImage_basic } from "../ultis/Constants"

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
                avatarURL: (action.avatarURL) ?  action.avatarURL : avatar_basic.uri,
                coverImgURL: (action.coverImgURL) ?  action.coverImgURL : coverImage_basic.uri 
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
                avatarURL: null,
                coverImgURL: null
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
                avatarURL: action.avatarURL,
                coverImgURL: action.coverImgURL
            }
        }

    }
}