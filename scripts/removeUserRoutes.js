const fs = require("fs-extra");
const path = require("path");

const removeUserRoutes = async () => {
  try {
    const pagesManifestPath = path.join(".next", "server", "pages-manifest.json");
    console.log('URL of pages-manifest _________', pagesManifestPath)
    const pagesManifest = await fs.readJson(pagesManifestPath);
    
    const filteredManifest = Object.keys(pagesManifest).reduce((acc, route) => {
      if (!route.startsWith("/user")) {
        acc[route] = pagesManifest[route];
      }
      return acc;
    }, {});

    await fs.writeJson(pagesManifestPath, filteredManifest, { spaces: 2 });
    console.log("User routes removed successfully.");
  } catch (error) {
    console.error("Error removing user routes:", error);
  }
};

removeUserRoutes();
