const connectDB = require("../config/db");
const User = require("../schemas/users");

async function clearUsers() {
  await connectDB();

  await User.deleteMany({});
  console.log("🗑️ Deleted all users");

  process.exit();
}

clearUsers();