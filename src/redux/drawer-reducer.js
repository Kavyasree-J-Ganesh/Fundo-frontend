const initialDrawerState = {
	
	title: "Notes",
	
};

export const drawerReducer = (state = initialDrawerState, action) => {
	console.log(action)
	switch (action.type) {
        case 'SET_Title_as_Notes':
			return {
				...state,
				title : "Notes"
			};
            case 'SET_Title_as_Edit labels':
                return {
                    ...state,
                    title : "Edit labels"
                };
		case 'SET_Title_as_Remainder':
			return {
				...state,
				title : "Remainder"
			};
            case 'SET_Title_as_Archive':
			return {
				...state,
				title : "Archive"
			};
            case 'SET_Title_as_Bin':
			return {
				...state,
				title : "Bin"
			};

		default:
			return state;
	}
};

