const crypto = require("crypto");
const defaultHashAlgorithm = "sha3-512";

exports.createHash = (data, hash = defaultHashAlgorithm) => crypto.createHash(hash).update(data).digest("hex");
