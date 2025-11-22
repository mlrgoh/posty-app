# Contributing to Posty

Thank you for your interest in contributing! This document explains how to add posts and submit changes.

## Adding Posts

- Add a Markdown file to the `posts/` directory.
- Filename: use a timestamp and slug so files sort nicely, for example:

  `20251122-143200-my-new-post.md` or `1699999999999-my-new-post.md`

- Content requirements:
  - The first line should be the title as an H1, e.g.:

    `# My New Post`

  - After the title, add your post content in Markdown.
  - The app extracts the title from the first `#` heading and uses the file name as the slug.

## Running the app locally

1. Install dependencies:

```bash
npm install
```

2. Run the app:

```bash
npm start
```

3. Open `http://localhost:3000` (or `http://localhost:3001` if you set `PORT`) and verify your post appears.

Alternatively you can use the `New Post` form at `/new` to create posts via the web UI.

## Pull requests

- Fork the repository (or branch directly), create a feature branch named `add/` or `fix/`, e.g. `add-contributing`.
- Make small, focused commits with clear messages (imperative tense): `Add CONTRIBUTING.md`.
- Run the app locally and verify changes before opening a PR.
- Link your PR to any relevant issue and add a short description of what the change does.

## Code style and tests

- Keep changes minimal and focused.
- There are no automated tests in this repo; manual verification by running the app is sufficient for blog/content changes.

## Review process

- A maintainer will review your PR and request changes if needed.
- After approval the PR will be merged into `main`.

Thanks again — contributions are welcome!
