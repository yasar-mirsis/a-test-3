import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

describe('Project Structure and Setup', () => {
  describe('TypeScript Configuration', () => {
    it('tsconfig.json should exist', () => {
      const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
      expect(fs.existsSync(tsconfigPath)).toBe(true);
    });

    it('tsconfig.json should be a valid JSON file', () => {
      const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
      const tsconfigContent = fs.readFileSync(tsconfigPath, 'utf-8');
      expect(() => JSON.parse(tsconfigContent)).not.toThrow();
    });

    it('tsconfig.json should have valid TypeScript compiler options', () => {
      const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
      const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf-8'));
      const { compilerOptions } = tsconfig;

      expect(compilerOptions).toBeDefined();
      expect(compilerOptions.target).toBe('ES2020');
      expect(compilerOptions.module).toBe('commonjs');
      expect(compilerOptions.outDir).toBe('./dist');
      expect(compilerOptions.rootDir).toBe('./src');
      expect(compilerOptions.strict).toBe(true);
      expect(compilerOptions.esModuleInterop).toBe(true);
      expect(compilerOptions.declaration).toBe(true);
      expect(compilerOptions.declarationMap).toBe(true);
      expect(compilerOptions.sourceMap).toBe(true);
    });

    it('tsconfig.json should include src directory', () => {
      const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
      const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf-8'));
      expect(tsconfig.include).toContain('src/**/*');
      expect(tsconfig.exclude).toContain('node_modules');
      expect(tsconfig.exclude).toContain('dist');
    });
  });

  describe('Source Files', () => {
    it('src/index.ts should exist', () => {
      const indexPath = path.join(process.cwd(), 'src/index.ts');
      expect(fs.existsSync(indexPath)).toBe(true);
    });

    it('src/index.ts should be a valid TypeScript file', () => {
      const indexPath = path.join(process.cwd(), 'src/index.ts');
      const content = fs.readFileSync(indexPath, 'utf-8');
      expect(content).toBeTruthy();
      expect(content.length).toBeGreaterThan(0);
    });

    it('src/index.ts should contain TypeScript syntax', () => {
      const indexPath = path.join(process.cwd(), 'src/index.ts');
      const content = fs.readFileSync(indexPath, 'utf-8');
      // TypeScript files should have .ts extension and contain valid syntax
      expect(content).toMatch(/\/\/|\/\*|\bimport\b|\bexport\b|\bconst\b|\blet\b|\bvar\b/);
    });

    it('dist/index.js should exist after build', () => {
      const distPath = path.join(process.cwd(), 'dist/index.js');
      expect(fs.existsSync(distPath)).toBe(true);
    });

    it('dist/index.js should contain compiled JavaScript', () => {
      const distPath = path.join(process.cwd(), 'dist/index.js');
      const content = fs.readFileSync(distPath, 'utf-8');
      expect(content).toBeTruthy();
      expect(content.length).toBeGreaterThan(0);
      expect(content).toContain('Server entry point');
    });
  });

  describe('Dependencies', () => {
    it('package.json should exist', () => {
      const packagePath = path.join(process.cwd(), 'package.json');
      expect(fs.existsSync(packagePath)).toBe(true);
    });

    it('package.json should be a valid JSON file', () => {
      const packagePath = path.join(process.cwd(), 'package.json');
      const packageContent = fs.readFileSync(packagePath, 'utf-8');
      expect(() => JSON.parse(packageContent)).not.toThrow();
    });

    it('package.json should have express as a dependency', () => {
      const packagePath = path.join(process.cwd(), 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
      expect(packageJson.dependencies).toBeDefined();
      expect(packageJson.dependencies.express).toBeDefined();
      expect(packageJson.dependencies.express).toBe('^4.18.2');
    });

    it('package.json should have TypeScript as a devDependency', () => {
      const packagePath = path.join(process.cwd(), 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
      expect(packageJson.devDependencies).toBeDefined();
      expect(packageJson.devDependencies.typescript).toBeDefined();
      expect(packageJson.devDependencies.typescript).toBe('^5.3.3');
    });

    it('package.json should have ts-node as a devDependency', () => {
      const packagePath = path.join(process.cwd(), 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
      expect(packageJson.devDependencies).toBeDefined();
      expect(packageJson.devDependencies['ts-node']).toBeDefined();
      expect(packageJson.devDependencies['ts-node']).toBe('^10.9.2');
    });

    it('package.json should have @types/express as a devDependency', () => {
      const packagePath = path.join(process.cwd(), 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
      expect(packageJson.devDependencies).toBeDefined();
      expect(packageJson.devDependencies['@types/express']).toBeDefined();
      expect(packageJson.devDependencies['@types/express']).toBe('^4.17.17');
    });

    it('package.json should have @types/node as a devDependency', () => {
      const packagePath = path.join(process.cwd(), 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
      expect(packageJson.devDependencies).toBeDefined();
      expect(packageJson.devDependencies['@types/node']).toBeDefined();
      expect(packageJson.devDependencies['@types/node']).toBe('^20.10.0');
    });

    it('package.json should have build script', () => {
      const packagePath = path.join(process.cwd(), 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
      expect(packageJson.scripts).toBeDefined();
      expect(packageJson.scripts.build).toBe('tsc');
    });

    it('package.json should have start script', () => {
      const packagePath = path.join(process.cwd(), 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
      expect(packageJson.scripts).toBeDefined();
      expect(packageJson.scripts.start).toBe('node dist/index.js');
    });

    it('package.json should have dev script', () => {
      const packagePath = path.join(process.cwd(), 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
      expect(packageJson.scripts).toBeDefined();
      expect(packageJson.scripts.dev).toBe('ts-node src/index.ts');
    });
  });

  describe('Build Process', () => {
    it('should be able to run tsc build command successfully', () => {
      expect(() => {
        execSync('npm run build', { stdio: 'pipe' });
      }).not.toThrow();
    });

    it('build should produce dist directory with compiled files', () => {
      const distPath = path.join(process.cwd(), 'dist');
      expect(fs.existsSync(distPath)).toBe(true);
      expect(fs.statSync(distPath).isDirectory()).toBe(true);
    });

    it('build should produce index.js in dist directory', () => {
      const distIndexPath = path.join(process.cwd(), 'dist/index.js');
      expect(fs.existsSync(distIndexPath)).toBe(true);
    });

    it('build should produce index.d.ts in dist directory', () => {
      const distIndexPath = path.join(process.cwd(), 'dist/index.d.ts');
      expect(fs.existsSync(distIndexPath)).toBe(true);
    });

    it('build should produce index.js.map in dist directory', () => {
      const distIndexPath = path.join(process.cwd(), 'dist/index.js.map');
      expect(fs.existsSync(distIndexPath)).toBe(true);
    });

    it('build should produce index.d.ts.map in dist directory', () => {
      const distIndexPath = path.join(process.cwd(), 'dist/index.d.ts.map');
      expect(fs.existsSync(distIndexPath)).toBe(true);
    });

    it('compiled JavaScript should be valid', () => {
      const distIndexPath = path.join(process.cwd(), 'dist/index.js');
      const content = fs.readFileSync(distIndexPath, 'utf-8');
      expect(content).toMatch(/"use strict"/);
      expect(content).toContain('Server entry point');
    });

    it('compiled JavaScript should be transpiled to CommonJS', () => {
      const distIndexPath = path.join(process.cwd(), 'dist/index.js');
      const content = fs.readFileSync(distIndexPath, 'utf-8');
      expect(content).toMatch(/require\s*\(/);
    });
  });

  describe('File Structure', () => {
    it('project should have src directory', () => {
      const srcPath = path.join(process.cwd(), 'src');
      expect(fs.existsSync(srcPath)).toBe(true);
      expect(fs.statSync(srcPath).isDirectory()).toBe(true);
    });

    it('project should have dist directory', () => {
      const distPath = path.join(process.cwd(), 'dist');
      expect(fs.existsSync(distPath)).toBe(true);
      expect(fs.statSync(distPath).isDirectory()).toBe(true);
    });

    it('project should have node_modules directory', () => {
      const nodeModulesPath = path.join(process.cwd(), 'node_modules');
      expect(fs.existsSync(nodeModulesPath)).toBe(true);
      expect(fs.statSync(nodeModulesPath).isDirectory()).toBe(true);
    });

    it('project should have package.json', () => {
      const packagePath = path.join(process.cwd(), 'package.json');
      expect(fs.existsSync(packagePath)).toBe(true);
    });

    it('project should have tsconfig.json', () => {
      const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
      expect(fs.existsSync(tsconfigPath)).toBe(true);
    });

    it('project should have README.md', () => {
      const readmePath = path.join(process.cwd(), 'README.md');
      expect(fs.existsSync(readmePath)).toBe(true);
    });

    it('project should have .gitignore', () => {
      const gitignorePath = path.join(process.cwd(), '.gitignore');
      expect(fs.existsSync(gitignorePath)).toBe(true);
    });
  });
});