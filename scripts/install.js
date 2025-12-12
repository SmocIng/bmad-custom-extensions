#!/usr/bin/env node

/**
 * BMad Custom Workflows インストールスクリプト (Node.js版)
 * 
 * このスクリプトは、.bmad-custom-extensionsリポジトリから
 * ワークフローファイルを.cursor/rules/bmad-custom/workflows/にコピーします
 */

const fs = require('fs');
const path = require('path');

// カラー出力
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// スクリプトのディレクトリを取得
const scriptDir = __dirname;
const repoRoot = path.resolve(scriptDir, '..');
const projectRoot = path.resolve(repoRoot, '..', '..');

// ターゲットディレクトリ
const targetDir = path.join(projectRoot, '.cursor', 'rules', 'bmad-custom', 'workflows');
const sourceDir = path.join(repoRoot, 'workflows');
const implementationTarget = path.join(projectRoot, '.bmad-custom', 'workflows');

log('BMad Custom Workflows インストールスクリプト', 'green');
log('==========================================');
console.log('');

// ソースディレクトリの確認
if (!fs.existsSync(sourceDir)) {
  log(`エラー: ソースディレクトリが見つかりません: ${sourceDir}`, 'red');
  process.exit(1);
}

// ターゲットディレクトリの作成
log(`ターゲットディレクトリを作成中: ${targetDir}`);
fs.mkdirSync(targetDir, { recursive: true });
fs.mkdirSync(implementationTarget, { recursive: true });

// ワークフローファイルのコピー
console.log('');
log('ワークフローファイルをコピー中...');
console.log('');

let workflowsCopied = 0;
let workflowsSkipped = 0;

const workflowDirs = fs.readdirSync(sourceDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

for (const workflowName of workflowDirs) {
  const workflowDir = path.join(sourceDir, workflowName);
  const workflowMdc = path.join(workflowDir, `${workflowName}.mdc`);
  const targetFile = path.join(targetDir, `${workflowName}.mdc`);
  
  if (fs.existsSync(workflowMdc)) {
    if (fs.existsSync(targetFile)) {
      log(`スキップ: ${workflowName}.mdc は既に存在します`, 'yellow');
      workflowsSkipped++;
    } else {
      fs.copyFileSync(workflowMdc, targetFile);
      log(`✓ コピー完了: ${workflowName}.mdc`, 'green');
      workflowsCopied++;
    }
  }
  
  // 実装ディレクトリのコピー
  const targetWorkflowDir = path.join(implementationTarget, workflowName);
  
  if (fs.existsSync(targetWorkflowDir)) {
    log(`スキップ: ${workflowName}/ は既に存在します`, 'yellow');
  } else {
    fs.mkdirSync(targetWorkflowDir, { recursive: true });
    
    // .mdcファイル以外のファイルをコピー
    const files = fs.readdirSync(workflowDir);
    for (const file of files) {
      if (!file.endsWith('.mdc')) {
        const sourceFile = path.join(workflowDir, file);
        const targetFile = path.join(targetWorkflowDir, file);
        
        if (fs.statSync(sourceFile).isDirectory()) {
          // ディレクトリの場合は再帰的にコピー
          copyRecursiveSync(sourceFile, targetFile);
        } else {
          fs.copyFileSync(sourceFile, targetFile);
        }
      }
    }
    log(`✓ コピー完了: ${workflowName}/`, 'green');
  }
}

// 再帰的コピー関数
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// 結果サマリー
console.log('');
log('==========================================', 'green');
log('インストール完了', 'green');
console.log('');
console.log(`コピーされたワークフロー: ${workflowsCopied}`);
console.log(`スキップされたワークフロー: ${workflowsSkipped}`);
console.log('');
console.log(`ワークフローファイル: ${targetDir}`);
console.log(`実装ディレクトリ: ${implementationTarget}`);
console.log('');
