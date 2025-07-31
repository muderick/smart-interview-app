export const initialForm = { name: "", email: "", phone: "" };

export const formReducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_FIELD":
            return {
                ...state,
                [action.field]: action.value,
            };

        case "RESET":
            return initialForm;
        
        case "SET_FORM":
            return {...action.payload};

        default: state;
    }
}