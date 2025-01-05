import axios from 'axios';

export const membersRoute = async (url) => {
    try
    {
        const { data } = await axios.get(url);
        return data
    }
    catch(err)
    {
        console.error(err.message);
        throw new Error('Failed to fetch members', err.message);
    }
}; 

export const newMemberRoute = async (newMember, url) => {
    try
    {
        const { data } = await axios.post(url, newMember);
        return data
    }
    catch(err)
    {
        console.error(err.message);
        throw new Error('Failed to add new member', err.message);
    }
}; 

export const newSubscriptionRoute = async (newSubscription, url) => {
    try
    {
        const { data } = await axios.post(url, newSubscription);
        return data
    }
    catch(err)
    {
        console.error(err.message);
        throw new Error('Failed to subscribe movie to member', err.message);
    }
}; 

export const editMemberRoute = async (form, url) => {
    try
    {
        const { data } = await axios.put(url, form);

        return data
    }
    catch(err)
    {
        console.error(err.message);
        throw new Error('Failed to edit member', err.message);
    }
}; 

export const deleteMemberRoute = async (id, url) => {
    try
    {
        const deleteUrlQueries = `${url}?id=${id}` 
        const { data } = await axios.delete(deleteUrlQueries);

        return data
    }
    catch(err)
    {
        console.error(err.message);
        throw new Error('Failed to delete member', err.message);
    }
};