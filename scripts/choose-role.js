// -----------------------------------------------------------------------
// This file iam using to create a user based build by choosing the role.
// -----------------------------------------------------------------------

const readlineSync = require("readline-sync");
const fs = require("fs");

const roles = ["user", "admin"];
const selectedRole = readlineSync.keyInSelect(roles, "Choose the role (user/admin): ");

if (selectedRole === -1) {
    console.error("\x1b[31mNo role selected. Aborting build.\x1b[0m");
    process.exit(1);
}

const role = roles[selectedRole];

fs.writeFileSync(".env.local", `NEXT_PUBLIC_APP_TYPE=${role}\n`, { flag: "w" });

console.log('------------------------------------------------');
console.log(`\x1b[32mBuild will be for role: ${role} \x1b[0m`);
console.log('------------------------------------------------');
