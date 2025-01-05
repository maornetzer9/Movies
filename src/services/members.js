import { deleteMemberAction, editMemberAction, loadingMembersAction, newMemberAction, newSubscriptionAction } from "../actions/members";
import { SUBSCRIPTIONS } from "../App";

export const loadingMembers = async (dispatch) => {
    try
    {
        const MEMBERS = `${SUBSCRIPTIONS}/members/`;
        await dispatch(loadingMembersAction(MEMBERS));
    }
    catch(err)
    {
        console.error(err.message);
        throw new Error(err.message);
    }
};


export const addNewMemberService = async (newMember, dispatch) => {

    try
    {
        const MEMBERS = `${SUBSCRIPTIONS}/members/add`;
        const { code, message } = await dispatch(newMemberAction(newMember, MEMBERS));
        return { code, message }
    }
    catch(err)
    {
        console.error(err.message);
        throw new Error(err.message);
    }
};


export const editMemberService = async (form, dispatch) => {
    try
    {
        const EDIT_MEMBER = `${SUBSCRIPTIONS}/members/edit`;
        const { code } = await dispatch(editMemberAction(form, EDIT_MEMBER));
        return { code };
    }
    catch(err)
    {
        console.error(err.message);
        throw new Error(err.message);
    }
};


export const newSubscriptionService = async (newSubscription, dispatch) => {
    try
    {       
        const NEW_SUBSCRIPTION = `${SUBSCRIPTIONS}/members/new-subscription`;
        await dispatch(newSubscriptionAction(newSubscription, NEW_SUBSCRIPTION))
    }
    catch(err)
    {
        console.error(err.message);
    }
};

export const deleteMemberById = async (id, dispatch) => {
    try
    {
        const DELETE_MEMBER = `${SUBSCRIPTIONS}/members/delete`;
        await dispatch(deleteMemberAction(id, DELETE_MEMBER));
    }
    catch(err)
    {
        console.error(err.message);
    }
};