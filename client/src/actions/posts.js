import * as api from "../api";
import {
  CREATE,
  DELETE,
  END_LOADING,
  FETCH_ALL,
  FETCH_BY_SEARCH,
  LIKE,
  START_LOADING,
  UPDATE,
} from "../constants/actionTypes";

// Action Creators are the functions that return actions
export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(page);
    dispatch({
      type: FETCH_ALL,
      payload: data,
    });
    dispatch({ type: END_LOADING });
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const getPostBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);
    dispatch({
      type: FETCH_BY_SEARCH,
      payload: data,
    });
    dispatch({ type: END_LOADING });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post);
    dispatch({
      type: CREATE,
      payload: data,
    });
    dispatch({ type: END_LOADING });
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
