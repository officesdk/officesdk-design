const { execSync } = require('child_process');

function run(command) {
  execSync(command, { stdio: 'inherit' });
}

function getOutput(command) {
  return execSync(command, { encoding: 'utf-8' }).trim();
}

run('yarn workspace @officesdk/design-icons generate:registry');

const diff = getOutput('git diff --name-only -- packages/icons/src packages/components/src/Icon/Icon.stories.tsx');

if (diff) {
  console.error('Generated icon files are out of date. Run `yarn workspace @officesdk/design-icons generate:registry` and commit the changes.');
  console.error(diff);
  process.exit(1);
}

console.log('Generated icon files are up to date.');
