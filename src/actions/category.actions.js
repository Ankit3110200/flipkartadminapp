import axios from "../helper/axios"
import { catconstants } from "./constant";

const getAllcategory = () => {
    return async dispatch => {
        dispatch({ type: catconstants.GET_ALL_CATEGORY_REQUEST })
        const res = await axios.get("/category/getcategory")
        console.log(res);
        if (res.status === 200) {
            const { categorylist } = res.data
            // console.log(categorylist)
            dispatch({

                type: catconstants.GET_ALL_CATEGORY_SUCCESS,
                payload: { categories: categorylist }
            })
        } else {
            dispatch({
                type: catconstants.GET_ALL_CATEGORY_FAILURE,
                payload: { error: res.data.error }
            })
        }
    }
}

export const addcategory = (form) => {
    return async dispatch => {
        dispatch({ type: catconstants.ADD_NEW_CATEGORY_REQUEST });
        try {
            const res = await axios.post("/category/create", form)
            console.log(res);
            if (res.status == 200) {
                dispatch({
                    type: catconstants.ADD_NEW_CATEGORY_SUCCESS,
                    payload: { category: res.data.category }
                });

            } else {
                dispatch({
                    type: catconstants.ADD_NEW_CATEGORY_FAILURE,
                    payload: res.data.error
                })
            }
        } catch (error) {

            console.log(error.response)

        }

    }
}
export const updatecategories = (form) => {
    return async dispatch => {
        dispatch({ type: catconstants.UPDATE_CATEGORY_REQUEST })
        const res = await axios.post("/category/update", form)

        if (res.status == 201) {
            dispatch({ type: catconstants.UPDATE_CATEGORY_SUCCESS })
            dispatch(getAllcategory())
        } else {
            const { error } = res.data
            dispatch({
                type: catconstants.UPDATE_CATEGORY_FAILURE,
                payload: { error }
            })
        }
    }
}

export const deletecategories = (ids) => {
    return async dispatch => {
        dispatch({ type: catconstants.DELETE_CATEGORY_REQUEST })
        const res = await axios.post("/category/delete", {
            payload: {
                ids
            }
        })
        if (res.status === 200) {
            dispatch({ type: catconstants.DELETE_CATEGORY_SUCCESS })
            dispatch(getAllcategory())
        } else {
            dispatch({
                type: catconstants.UPDATE_CATEGORY_FAILURE,
                payload: { error: res.data.error }
            })

        }

    }
}

export {
    getAllcategory
}