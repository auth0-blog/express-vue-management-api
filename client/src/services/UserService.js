import axios from "axios"
export default {
  async getUsers() {
    let res = await axios.get("http://localhost:8000/users");
    console.log(res.data);
    return res.data;
  },
  async deleteUser(id) {
    let res = await axios.get(`http://localhost:8000/users/${id}/delete`);
    return res.data;
  }
}