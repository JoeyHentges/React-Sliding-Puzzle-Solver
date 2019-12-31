# Sliding Puzzle Solver (15/8 Puzzle)

A React project that solves sliding puzzles using Breadth First Search (Brute Force), and A\* searching algorithms.

## Notes

When running the algorithms, open the browser console (F12). You can view where the algorithms are in terms of loop counts.

Both algorithms can take quite a bit of time to complete, and may not even find a solution due to stopping early. I set the algorithms to stop early because in the worst case it will check every possible board configuration which is equal to w^2! (w = number of rows/columns on the board).

## Features

- [x] **[Node.JS](https://nodejs.org)** v10.x.x
- [x] **[React](https://reactjs.org)** v16.x.x

## Usage

Install dependencies

```
$ npm install
```

or

```
yarn
```

For development

```bash
$ npm start
```

To Deploy to GitHub Pages

```bash
$ npm run deploy
```
