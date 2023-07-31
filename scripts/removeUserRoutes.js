const fs = require("fs-extra");
const path = require("path");

const removeUserRoutes = async () => {
  try {
    const pagesManifestPath = path.join(
      ".next",
      "server",
      "pages-manifest.json"
    );
    const pagesManifest = await fs.readJson(pagesManifestPath);

    const filteredManifest = Object.keys(pagesManifest).reduce((acc, route) => {
      if (!route.startsWith("/user")) {
        acc[route] = pagesManifest[route];
      }
      return acc;
    }, {});

    await fs.writeJson(pagesManifestPath, filteredManifest, { spaces: 2 });
  
    const chunksDir = path.join(".next", "static", "chunks", "pages", "user");
    await fs.remove(chunksDir);

    const chunksPagesDir = path.join(".next", "static", "chunks", "pages");
    const chunkFiles = await fs.readdir(chunksPagesDir);

    for (const file of chunkFiles) {
      if (file.startsWith("user-")) {
        await fs.remove(path.join(chunksPagesDir, file));
      }
    }
  } catch (error) {
    console.error("Error removing user routes:", error);
  }
};

removeUserRoutes();
