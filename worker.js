const fib = (n, memo = { "1": 1, "2": 2 }) => {
  if (n in memo) return memo[n];
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
};

onmessage = (e) => {
  const result = fib(e.data);
  postMessage(result);
};
