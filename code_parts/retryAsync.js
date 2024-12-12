function retryAsync(func, retries = 3) {
  // Returns a promise that retries an asynchronous function upon failure
  return new Promise((resolve, reject) => {
    const attempt = (remainingRetries) => {
      func()
        .then(resolve) // If the function resolves, resolve the promise
        .catch((err) => {
          if (remainingRetries <= 0) {
            reject(err); // Reject if no retries are left
          } else {
            attempt(remainingRetries - 1); // Retry with remaining attempts
          }
        });
    };
    attempt(retries); // Start the first attempt
  });
}

// Usage example:
// Tries to fetch data from an API up to 3 times if it fails
retryAsync(() => fetch('https://api.example.com/data'), 3)
  .then((response) => console.log('Success:', response))
  .catch((err) => console.error('Failed after retries:', err));
