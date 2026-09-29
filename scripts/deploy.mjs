// Deploy multiplataforma (Windows/PowerShell, macOS, Linux):
// build -> S3 -> invalidación de CloudFront.
// Uso: npm run deploy   |   npm run deploy:dry (simula, no sube ni invalida)
import { spawnSync } from 'node:child_process';
import { loadEnv } from 'vite';

const DEFAULT_BUCKET = 'portfolio-sahid-web-2026';
const isDryRun = process.argv.includes('--dry-run');

// Lee .env.production + variables del sistema (las que no empiezan con VITE_ no llegan al bundle)
const env = loadEnv('production', process.cwd(), '');
const apiUrl = env.VITE_API_URL;
const distributionId = env.CLOUDFRONT_DISTRIBUTION_ID;
const bucket = env.DEPLOY_BUCKET || DEFAULT_BUCKET;

const fail = (message) => {
  console.error(`\n❌ ${message}`);
  process.exit(1);
};

if (!apiUrl) {
  fail('Falta VITE_API_URL (endpoint del formulario). Definila en .env.production (ver .env.example).');
}
if (!distributionId) {
  fail('Falta CLOUDFRONT_DISTRIBUTION_ID. Definila en .env.production (ver .env.example).');
}
// Validación de formato: los valores se interpolan en comandos de shell
if (!/^[A-Z0-9]+$/.test(distributionId)) {
  fail(`CLOUDFRONT_DISTRIBUTION_ID inválido: "${distributionId}" (ej: E1ABC2DEF3GHIJ).`);
}
if (!/^[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$/.test(bucket)) {
  fail(`DEPLOY_BUCKET inválido: "${bucket}".`);
}

// shell: true es necesario en Windows para resolver npm.cmd / aws.cmd
const run = (label, command) => {
  console.log(`\n▶ ${label}\n  $ ${command}`);
  const result = spawnSync(command, { stdio: 'inherit', shell: true });
  if (result.status !== 0) {
    fail(`Falló: ${label}`);
  }
};

const awsCheck = spawnSync('aws --version', { stdio: 'ignore', shell: true });
if (awsCheck.status !== 0) {
  fail('No se encontró el AWS CLI. Instalalo y ejecutá "aws configure": https://aws.amazon.com/cli/');
}

const dryFlag = isDryRun ? ' --dryrun' : '';
console.log(`🚀 Deploy a s3://${bucket} (CloudFront ${distributionId})${isDryRun ? ' — SIMULACIÓN' : ''}`);

run('Build de producción', 'npm run build');
run(
  'Subir assets (caché larga, nombres con hash)',
  `aws s3 sync dist/ s3://${bucket}/ --delete --exclude index.html --cache-control "public,max-age=31536000,immutable"${dryFlag}`
);
run(
  'Subir index.html (sin caché)',
  `aws s3 cp dist/index.html s3://${bucket}/index.html --cache-control "no-cache"${dryFlag}`
);

if (isDryRun) {
  console.log('\n✅ Simulación completa. No se subió nada ni se invalidó CloudFront.');
} else {
  run(
    'Invalidar caché de CloudFront',
    `aws cloudfront create-invalidation --distribution-id ${distributionId} --paths "/*"`
  );
  console.log('\n✅ Deploy completo. En 1-2 minutos: https://cv.nieridev.site/');
}
