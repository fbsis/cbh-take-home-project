const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

const handlerEventCandidate = (event) => {
  if (event) {
    if (event.partitionKey) return event.partitionKey;

    const data = JSON.stringify(event);
    return crypto.createHash("sha3-512").update(data).digest("hex");
  }
};

const truncatePartitionKey = (candidate, maxLength) => {
  if (candidate && candidate.length > MAX_PARTITION_KEY_LENGTH) {
    return crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate;
}

const  stringifyPartitionKey = (candidate) => {
  if (candidate && typeof candidate !== "string") {
    return JSON.stringify(candidate);
  }
  return candidate || TRIVIAL_PARTITION_KEY;
}

const handlerMaxCandidateLengh = (candidate) => {
  if(candidate.length > MAX_PARTITION_KEY_LENGTH){
    return crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate
};

exports.deterministicPartitionKey = (event) => {
  let candidate;

  candidate = handlerEventCandidate(event);
  candidate = truncatePartitionKey(candidate);
  candidate = stringifyPartitionKey(candidate);
  candidate = handlerMaxCandidateLengh(candidate);

  return candidate;
};
