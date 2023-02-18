const { deterministicPartitionKey } = require("./dpk");

describe('deterministicPartitionKey', () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it('should return the trivial partition key if event is null or undefined', () => {
    expect(deterministicPartitionKey(null)).toBe("0");
    expect(deterministicPartitionKey(undefined)).toBe("0");
  });

  it('should return the event partition key if it exists', () => {
    const event = { partitionKey: "myPartitionKey" };
    expect(deterministicPartitionKey(event)).toBe("myPartitionKey");
  });

  it('should generate a hash of the event data if the partition key does not exist', () => {
    const event = { someData: "myData" };
    const expected = "c92b751392b184c431ce9fc78d93706f5c25fed0b360afe049b1464183c8ebccb7407878ae4b902375fbae2918dfdc98f05dbfb4988aaeefe2bd9c6ddcae03d2";
    expect(deterministicPartitionKey(event)).toBe(expected);
  });

  it('should handle non-string candidates', () => {
    const event = { someData: { a: 1, b: 2 } };
    const expected = "08fa853843e444ba5a59b38d551f7ab1ecefefe795ea4c037c72f9a60e97de091a672725a350d829200cfee9fab3ac01b02e6077064b7abb84fcac03ca42f24b";
    expect(deterministicPartitionKey(event)).toBe(expected);
  });

  it('should truncate the partition key if it is too long', () => {
    const event = { someData: "myData".repeat(1000) };
    const expected = "ee8438e6c069d4cc045ed9eb1c31a116775a0c2f60649db1f622441bed80be17bbee572b6a4ee98dcfd13fbcf5322e8cfb1aee3c010a9e93626b5582712fb754";
    expect(deterministicPartitionKey(event)).toBe(expected);
  });
});