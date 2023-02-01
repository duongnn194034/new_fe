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
                country: action.country,
                link: action.link,
                birthday: action.birthday,
                avatarURL: (action.avatarURL) ?  action.avatarURL : avatar_basic.uri,
                coverImgURL: (action.coverImgURL) ?  action.coverImgURL : coverImage_basic.uri,
                friend_list: action.friend_list ? action.friend_list : [],
                block_list: action.block_list ? action.block_list : []
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
                coverImgURL: null,
                friend_list: [],
                block_list: []
            }
        }
        case 'CHANGE_INFO_USER': {
            return {
                ...state,
                username: action.username,
                description: action.description,
                address: action.address,
                city: action.city,
                country: action.country,
                link: action.link,
                birthday: action.birthday,
                avatarURL: (action.avatarURL) ?  action.avatarURL : avatar_basic.uri,
                coverImgURL: (action.coverImgURL) ?  action.coverImgURL : coverImage_basic.uri
            }
        }
    }
}