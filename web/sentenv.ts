const { writeFile } = require('fs');
const { argv } = require('yargs');

const environment = argv.environment;
const targetPath = './src/environments/environment.prod.ts';

const environmentFileContent = `
export const environment = {
   production: true,
   peer: "${process.env.PEER_URL}",
   socket: "${process.env.SOCKET_URL}"
};
`;

writeFile(targetPath, environmentFileContent, (err: any) => {
  if (err) {
    console.log(err);
  }
  console.log(`Wrote variables to ${targetPath}`);
});
