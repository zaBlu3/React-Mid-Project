import axios from "axios";

const getUsers = async (url) => {
  const response = await axios.get(url);
  return response.data;
};
const postUsers = async (url,user) => {
  const response = await axios.post(url,user);
  return response.data;
};
const patchUsers = async (url,id,user) => {
  const response = await axios.patch(`${url}/${id}`,user);
  return response.data;
};
const getTodos = async (url) => {
  const {data} = await axios.get(url);
  return data;
};
const getPosts = async (url) => {
  const {data} = await axios.get(url);
  return data;
};
const getUserTodos = (todos,id) => {

  return todos.filter(({ userId }) => userId == id)

}
const getUserPosts = (posts,id) => {

  return posts.filter(({ userId }) => userId == id)

}


export { getUserPosts, getUserTodos ,getPosts,getTodos,getUsers,  postUsers,patchUsers };
