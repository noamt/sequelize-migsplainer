# Sequelize Migration Explainer

Translates database migration files into human speak.

![build](https://github.com/noamt/sequelize-migsplainer/workflows/test-and-lint/badge.svg)
![build](https://img.shields.io/badge/npm-v0.0.2-blue)
[![codecov](https://codecov.io/gh/noamt/sequelize-migsplainer/branch/main/graph/badge.svg?token=3e3jFHsQRr)](https://codecov.io/gh/noamt/sequelize-migsplainer)

## About
While managing migration-as-code using [sequelize-auto-migrations](https://www.npmjs.com/package/sequelize-auto-migrations), I wanted to also be able to describe the evolution of the database in a more natural language.

This tool reads migration files and produces an HTML report where each migration operation is converted to an explanation in English.

## Installation
```bash
npm i sequelize-migsplainer -g
```

## Usage

From your project's root directory run:
```bash
migsplain --migrations relative/path/to/migrations/
```

This will produce a report based on the migration files found in `relative/path/to/migrations/` and save it to `output/migrations.html`.

The location of the output file can be controlled using the `--output` switch:

```bash
migsplain --migrations relative/path/to/migrations/ --output /some/other/path.html
```
