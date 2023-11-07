const fetch = require("node-fetch");

async function fetchUsers() {
  try {
    const userDataPromises = await fetch("http://localhost:3000/users");
    const userData = await userDataPromises.json();
    return userData.users; // Extract 'users' array from the response
  } catch (error) {
    throw error;
  }
}

async function fetchTodos(userId) {
  try {
    const todoPromises = await fetch(
      `http://localhost:3000/todos?user_id=${userId}`
    );
    const todoData = await todoPromises.json();
    return todoData.todos; // Extract 'todos' array from the response
  } catch (error) {
    throw error;
  }
}

async function fetch5todosWithDelay(currentId) {
  const todoPromises = [];
  for (let i = currentId; i < currentId + 5; i++) {
    todoPromises.push(fetchTodos(i));
  }

  try {
    const todos = await Promise.all(todoPromises);
    console.log("Fetched 5 todos ...");
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(todos);
      }, 1000); // 1-second delay
    });
  } catch (error) {
    throw error;
  }
}

async function main() {
  try {
    const users = await fetchUsers();
    console.log("Users:", users);

    let currentId = 1;
    const results = [];

    while (currentId <= users.length) {
      const todos = await fetch5todosWithDelay(currentId);
      currentId += 5;
      for (let i = 0; i < todos.length; i++) {
        const user = users[i];
        const numTodosCompleted = todos[i].filter(
          (todo) => todo.isCompleted
        ).length;
        results.push({
          id: currentId - 5 + user.id,
          name: `User ${currentId - 5 + user.id}`,
          numTodosCompleted,
        });
      }
    }
    console.log(results);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
