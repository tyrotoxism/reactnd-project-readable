import * as api from '../utils/api'
import uuid from 'uuid/v1'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const UPVOTE_POST = 'UPVOTE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
export const REMOVE_POST = 'REMOVE_POST'

function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts: posts.filter((post) => !post.deleted),
  }
}

export function fetchPosts(dispatch) {
  api.fetchPosts()
    .then(data => dispatch(receivePosts(data || [])))
}

export function createPost(dispatch, post) {
  api.createPost({ ...post, id: uuid(), timestamp: Date.now() })
    .then(data => dispatch(addPost(data)))
}

function addPost(post) {
  return {
    type: ADD_POST,
    post,
  }
}

export function saveEditedPost(dispatch, editedPost) {
  api.editPost(editedPost.id, editedPost.title, editedPost.body)
    .then(data => dispatch(editPost(data)))
}

function editPost({ id, title, body }) {
    return {
      type: EDIT_POST,
      id,
      title,
      body,
    }
  }

export function voteOnPost(dispatch, id, vote) {
  api.voteOnPost(id, vote)
    .then(() => dispatch(vote === 'upVote' ? upvotePost(id) : downvotePost(id)))
}

function upvotePost(id) {
  return {
    type: UPVOTE_POST,
    id,
  }
}

function downvotePost(id) {
  return {
    type: DOWNVOTE_POST,
    id,
  }
}

export function deletePost(dispatch, id) {
  api.deletePost(id)
    .then(() => dispatch(removePost(id)))
}

function removePost(id) {
  return {
    type: REMOVE_POST,
    id,
  }
}