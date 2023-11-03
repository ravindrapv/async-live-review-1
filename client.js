async function fetchUsers() {
  try {
    const userDataPromises = await fetch("http://localhost:3000/users");
    const userData = await userDataPromises.json();
    return userData;
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
    return todoData;
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
    while (currentId < 20) {
      const todos = await fetch5todosWithDelay(currentId);
      console.log("Todos:", todos);
      currentId += 5;
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
