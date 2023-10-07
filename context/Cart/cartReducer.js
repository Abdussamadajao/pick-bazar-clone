import {
	ADD_TO_CART,
	CLEAR_ITEM,
	FILTER_PRODUCT,
	REMOVE_FROM_CART,
} from '../Types';

const reducer = (state, action) => {
	switch (action.type) {
		case ADD_TO_CART:
			let foundItem = state.cart.find(
				({ id }) => id === action.payload.id
			);
			if (foundItem) {
				return {
					...state,
					cart: state.cart.map((item) =>
						item.id === action.payload.id
							? { ...item, count: String(Number(item.count) + 1) }
							: item
					),
				};
			}

			return {
				...state,
				cart: [...state.cart, action.payload],
				loading: false,
			};

		case REMOVE_FROM_CART:
			let secondItem = state.cart.find(({ id }) => id === action.payload);

			if (secondItem && Number(secondItem.count) > 1) {
				return {
					...state,
					cart: state.cart.map((item) =>
						item.id === action.payload
							? { ...item, count: String(Number(item.count) - 1) }
							: item
					),
				};
			}

			const index = state.cart.findIndex(
				(cartItem) => cartItem.id === action.payload
			);
			let newCart = [...state.cart];
			if (index >= 0) {
				newCart.splice(index, 1);
			}
			return {
				...state,
				cart: newCart.length ? newCart : [],
				loading: false,
			};

		case FILTER_PRODUCT:
			return {
				...state,
				filter: state.cart.filter((cart) => {
					const regex = new RegExp(`${action.payload}`, 'gi');
					return cart.Tag.match(regex);
				}),
			};

		case CLEAR_ITEM:
			return {
				...state,
				cart: [],
			};
	}
};

export default reducer;
