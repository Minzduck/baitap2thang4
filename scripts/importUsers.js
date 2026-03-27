const connectDB = require("../config/db");
const User = require("../schemas/users");
const Role = require("../schemas/roles");
const users = require("../data/users");
const generatePassword = require("../utils/generatePassword");
const sendEmail = require("../utils/sendEmail");

async function importUsers() {
  await connectDB();

  try {
    // 🔥 lấy role user
    const userRole = await Role.findOne({ name: "user" });

    if (!userRole) {
      console.log("❌ Không tìm thấy role 'user'");
      process.exit(1);
    }

    for (let u of users) {
      const password = generatePassword(16);

      const newUser = new User({
        username: u.username,
        email: u.email,
        password: password,
        role: userRole._id
      });

      await newUser.save();

      await sendEmail(u.email, password);

      console.log(`✅ Created: ${u.username}`);
    }

    console.log("🎯 Import completed");
    process.exit();
  } catch (error) {
    console.error("❌ Import failed:", error);
    process.exit(1);
  }
}

importUsers();