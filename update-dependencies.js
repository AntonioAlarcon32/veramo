const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const packagesDir = path.join(__dirname, 'packages');
const newDependency = '/Users/antonio/UPC/repos/did-jwt-vc'; // Update this path

function updatePackageJson(packagePath) {
  const packageJsonPath = path.join(packagePath, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  if (packageJson.dependencies && packageJson.dependencies['did-jwt-vc']) {
    console.log(`Updating ${packageJsonPath}`);
    execSync(`pnpm add "${newDependency}" --save-exact`, { cwd: packagePath });
    console.log(`Updated ${packageJsonPath}`);
  }
}

fs.readdirSync(packagesDir).forEach(packageName => {
  const packagePath = path.join(packagesDir, packageName);
  if (fs.statSync(packagePath).isDirectory()) {
    updatePackageJson(packagePath);
  }
});

console.log('Finished updating packages');
