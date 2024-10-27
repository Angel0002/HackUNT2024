const bcrypt = require("bcrypt");

async function testBcrypt() {
  const password = "password123";

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed password:", hashedPassword);

  // Compare the password with the hash
  const isMatch = await bcrypt.compare(password, hashedPassword);
  console.log("Password match:", isMatch); // Should output true if bcrypt is working correctly
}

testBcrypt().catch(console.error);
