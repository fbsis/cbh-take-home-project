
const { createHash } = require("./CripytoHash");
 
const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

const handlerEventCandidate = (event) => {
  if (event) {
    if (event.partitionKey) return event.partitionKey;

    const data = JSON.stringify(event);
    return createHash(data);
  }
};

const truncatePartitionKey = (candidate, maxLength) => {
  if (candidate && candidate.length > maxLength) {
    return createHash(candidate);
  }
  return candidate;
}

const  stringifyPartitionKey = (candidate, trivialPartitionKey) => {
  if (candidate && typeof candidate !== "string") {
    return JSON.stringify(candidate);
  }
  return candidate || trivialPartitionKey;
}

const handlerMaxCandidateLengh = (candidate, maxLength) => {
  if(candidate.length > maxLength){
    return createHash(candidate);
  }
  return candidate
};

exports.deterministicPartitionKey = (event) => {
  let candidate = null;

  if (!event) return "0";

  candidate = handlerEventCandidate(event);
  candidate = truncatePartitionKey(candidate, MAX_PARTITION_KEY_LENGTH);
  candidate = stringifyPartitionKey(candidate, TRIVIAL_PARTITION_KEY);
  candidate = handlerMaxCandidateLengh(candidate, MAX_PARTITION_KEY_LENGTH);

  return candidate;
};