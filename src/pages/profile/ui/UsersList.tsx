
const response = await fetch(
  "https://reqres.in/api/collections/users/records?project_id=55530",
  {
    headers: {
      "x-api-key": "pro_716a55de73ab859433282374cf2272c4dd3fad20a1e36a07d0ebf1e50297eaea",
      "X-Reqres-Env": "prod"
    }
  }
);
const data = await response.json();

console.log(data);

const UsersList = () => {


}