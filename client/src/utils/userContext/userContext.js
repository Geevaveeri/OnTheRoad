import { createContext } from 'react';

const UserContext = createContext({
    _id: '',
    username: '',
    email: '',
    roadtrips: [{
        _id: '',
        name: '',
        destination: ''
    }],
    expenses: [{
        _id: '',
        cost: '',
        category: '',
        comment: ''
    }]
});

export default UserContext;