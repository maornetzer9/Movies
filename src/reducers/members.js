import {
    MEMBERS_LOADING_FAILURE,
    MEMBERS_LOADING,
    MEMBERS_LOADING_SUCCESS,
    NEW_MEMBER_FAILURE,
    NEW_MEMBER_LOADING,
    DELETE_MEMBER_LOADING,
    DELETE_MEMBER_SUCCESS,
    DELETE_MEMBER_FAILURE,
    NEW_MEMBER_SUCCESS,
    EDIT_MEMBER_LOADING,
    EDIT_MEMBER_SUCCESS,
    EDIT_MEMBER_FAILURE,
    NEW_SUBSCRIPTION_LOADING,
    NEW_SUBSCRIPTION_FAILURE,
    NEW_SUBSCRIPTION_SUCCESS,
} from "../actions/members";

const initialState = {
    members: [],
    member: {
        name: "",
        email: "",
        city: "",
        subscriptions: [],
    },
    loading: false,
    error: null,
};

export const membersReducer = (state = initialState, action) => {
    switch (action.type) 
    { 
        case MEMBERS_LOADING:
        case NEW_MEMBER_LOADING:
        case EDIT_MEMBER_LOADING:    
        case NEW_SUBSCRIPTION_LOADING:
        case DELETE_MEMBER_LOADING: {
            return {
                ...state,
                loading: true,
                error: null,
            };
        }

        case MEMBERS_LOADING_SUCCESS: {
            return {
                ...state,
                members: action.payload,
                member: state.member,
                loading: false,
                error: null,
            };
        }
        
        case NEW_SUBSCRIPTION_SUCCESS: {
            const updatedMembers = state.members.map((m) =>
                m._id === action.payload._id ? action.payload : m
            );
        
            return {
                ...state,
                members: updatedMembers,
                member: action.payload,
                loading: false,
                error: null,
            };
        }

        case DELETE_MEMBER_SUCCESS: {
            return {
                ...state,
                members: action.payload,
                loading: false,
                error: null,
            };
        }

        case EDIT_MEMBER_SUCCESS: {
            const updatedMembers = state.members.map((m) =>
                m._id === action.payload._id ? {...action.payload} : m
            );
            
            return {
                ...state,
                members: updatedMembers,
                member:{
                    ...action.payload,
                    subscriptions: action.payload.subscriptions
                },
                loading: false,
                error: null,
            };
        }

        case NEW_MEMBER_SUCCESS: {
            return {
                ...state,
                members: [...state.members, action.payload],
                member: action.payload,
                loading: false,
                error: null,
            };
        }

        case NEW_MEMBER_FAILURE:
        case EDIT_MEMBER_FAILURE:
        case DELETE_MEMBER_FAILURE:
        case NEW_SUBSCRIPTION_FAILURE:
        case MEMBERS_LOADING_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        }
        default: return state;
    }
};