const fs = require("fs-extra");
const path = require("path");

const selectedRole = process.env.npm_config_role;

console.log('----------',selectedRole)

const excludeFolder = selectedRole === "admin" ? "user" : "admin";

const removeUserRoutes = async () => {
  try {
    console.log(excludeFolder, selectedRole)
    const pagesManifestPath = path.join(
      ".next",
      "server",
      "pages-manifest.json"
    );
    const pagesManifest = await fs.readJson(pagesManifestPath);

    const filteredManifest = Object.keys(pagesManifest).reduce((acc, route) => {
      if (!route.startsWith(`/${excludeFolder}`)) {
        acc[route] = pagesManifest[route];
      }
      return acc;
    }, {});

    await fs.writeJson(pagesManifestPath, filteredManifest, { spaces: 2 });
  
    const chunksDir = path.join(".next", "static", "chunks", "pages", excludeFolder);
    await fs.remove(chunksDir);

    const chunksPagesDir = path.join(".next", "static", "chunks", "pages");
    const chunkFiles = await fs.readdir(chunksPagesDir);

    for (const file of chunkFiles) {
      if (file.startsWith(`${excludeFolder}-`)) {
        await fs.remove(path.join(chunksPagesDir, file));
      }
    }

    const serverDir = path.join(".next", "server", "pages", excludeFolder);
    await fs.remove(serverDir);

    const serverPagesDir = path.join(".next", "server", "pages");
    const serverFiles = await fs.readdir(serverPagesDir);

    for (const file of serverFiles) {
      if (file.startsWith(excludeFolder)) {
        await fs.remove(path.join(serverPagesDir, file));
      }
    }

  } catch (error) {
    console.error("Error removing user routes:", error);
  }
};

removeUserRoutes();
