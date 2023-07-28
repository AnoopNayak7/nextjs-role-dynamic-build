
const fs = require("fs");

const role = process.env.npm_config_role;

if (!role || !["user", "admin"].includes(role)) {
  console.error("\x1b[31mInvalid or no role specified. Available roles are user and admin.\x1b[0m");
  process.exit(1);
}

fs.writeFileSync(".env.production", `NEXT_PUBLIC_APP_TYPE=${role}\n`, { flag: "w" });

console.log('------------------------------------------------');
console.log(`\x1b[32mBuild will be for role: ${role} \x1b[0m`);
console.log('------------------------------------------------');
