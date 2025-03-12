const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDUzZWIwZmQ1N2QzODllMjRlMGFhNTY1MDA5NjA2MCIsIm5iZiI6MTc0MTc1NzEzNi4zNzIsInN1YiI6IjY3ZDExYWQwNDM0Yzk4YzhlYzgxNWU2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tuFhCncKvmXShNl3qsg2SMy0fRjgsuSvoy2q-aetQmA'
    }
  };
  
  fetch('https://api.themoviedb.org/3/authentication', options)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err));