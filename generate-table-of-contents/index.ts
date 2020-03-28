// Libraries
import {
  resolve,
} from 'path';
import {
  promises,
  Dirent,
  writeFileSync,
} from 'fs';

function getChapterUrl(direntName: string): string {
  // https://github.com/rmolinamir/algorithms-and-data-structures/tree/master/01.%20Algorithms%20and%20Data%20Structures
  return `https://github.com/rmolinamir/algorithms-and-data-structures/tree/master/${direntName.replace(/\s/g, "%20")}#readme`;
}

const { readdir } = promises;

/**
 * Recursive Files Async Iterator Generator. Allow us to iterate over data that
 * comes asynchronously, in this case the data will be our directories.
 * Returns an Async Iterator of the files in every directory that
 * is not a node module or a git folder.
 * @param {string} dir - Directory.
 */
async function* getPackages(dir = resolve(__dirname, '..')): AsyncGenerator<Dirent> {
  // A representation of a directory entry, as
  // returned by reading from an fs.Dir.
  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const isValid = (
      dirent.isDirectory() &&
      !dirent.name.includes('git') &&
      !dirent.name.includes('node_modules') &&
      !dirent.name.includes('download-md-images') &&
      !dirent.name.includes('generate-table-of-contents')
    );
    // If it's a directory, return it.
    if (dirent.isDirectory() && isValid) {
      yield dirent; // Return the directory.
    } else {
      continue;
    }
  }
}

async function generateToC(): Promise<void> {
  // Creating the packages table.
  const packageLinks: Array<string> = [];
  for await (const packageDirent of getPackages()) {
    const chapterUrl = getChapterUrl(packageDirent.name);
    // [I'm an inline-style link with title](https://www.google.com "Google's Homepage")
    const packageMarkdown = `- [${packageDirent.name}](${chapterUrl} "${packageDirent.name}")`;
    packageLinks.push(packageMarkdown);
  }
  const markdown: string = packageLinks.join('\n');
  writeFileSync(resolve('.', 'TOC.md'), markdown);
}

generateToC();
