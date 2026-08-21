#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, 'src', 'shared', 'assets', 'icons');

// Получаем все файлы с расширением .tsx или .ts в директории
const files = fs.readdirSync(iconsDir)
  .filter(file => file.endsWith('.tsx') || file.endsWith('.ts'))
  .filter(file => file !== 'index.ts'); // Исключаем сам index.ts

// Генерируем экспорты
const exportStatements = files.map(file => {
  // Удаляем расширение файла
  const fileName = path.parse(file).name;
  // Формируем название экспорта: НазваниеФайла + UIIcon
  const exportName = `${fileName}UIIcon`;
  // Формируем путь импорта
  const importPath = `./${fileName}`;
  return `export { default as ${exportName} } from '${importPath}';`;
});

// Записываем результат в index.ts
const output = exportStatements.join('\n') + '\n';
const indexPath = path.join(iconsDir, 'index.ts');

fs.writeFileSync(indexPath, output, 'utf8');

console.log(`✅ Generated index.ts with ${exportStatements.length} exports:`);
console.log(output);
