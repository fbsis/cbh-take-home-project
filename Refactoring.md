# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
- Initial creation of 6 tests, covering all use cases of the function
- Creation of an abstract function that can be reused for creating a hash (createHash). 
- I could use TypeScript for this refactoring, using the interface pattern for dependency injection. With this, I could change the createHash function, ensuring that the method signature remains the same, but there wouldn't be enough time for that.
- Creation of a function to check and handle candidate events (handlerEventCandidate)
- Creation of a function that can be easily reused for truncating partitions in other places (truncatePartitionKey)
- Function for stringifying partitions in a way that can be easily reused due to loose but specific parameters in the functions (stringifyPartitionKey)
- A single function to check the size of candidate data (handlerMaxCandidateLengh)
- All functions are pure, with the exception of createHash, which requires an external library.