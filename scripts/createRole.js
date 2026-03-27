const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Role = require("../schemas/roles");

async function createRole() {
  await connectDB();

  try {
    const existing = await Role.findOne({ name: "user" });

    if (existing) {
      console.log("✅ Role 'user' đã tồn tại");
      process.exit();
    }

    await Role.create({ name: "user" });

    console.log("🎯 Đã tạo role 'user'");
    process.exit();
  } catch (error) {
    console.error("❌ Lỗi:", error);
    process.exit(1);
  }
}

createRole();