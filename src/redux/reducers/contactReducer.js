const initialState = [
    {
        id: 0,
        name: "Emil Esanaliev",
        number: 12345,
        email: "e@g.com"
    },
    {
        id: 1,
        name: "Dastan Boobekov",
        number: 54321,
        email: "d@g.com"
    }
]

const contactReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_CONTACT':
            state = [...state, action.payload]
            return state
        case 'UPDATE_CONTACT':
            const updateContact = state.map(contact => contact.id === action.payload.id ? action.payload : contact)
            state = updateContact ;
            return state
        case 'DELETE_CONTACT':
            const filterContact = state.filter(contact => contact.id !== action.payload && contact);
            state =filterContact;
            return state;
        default:
            return state
    }
}

export default contactReducer;