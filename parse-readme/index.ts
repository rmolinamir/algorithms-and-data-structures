// Libraries
import {
  resolve,
  join,
} from 'path';
import {
  createWriteStream,
  readFileSync,
  promises,
} from 'fs';
import marked from 'marked';
import axios from 'axios';
import { JSDOM } from 'jsdom';
import { Spinner } from 'cli-spinner';

interface IImage {
  alt: string
  title: string
  src: string
}

// CLI Spinner ;)
const spinner = new Spinner('Fetching images...');
const { readdir } = promises;

/**
 * Recursive Files Async Iterator Generator. Allow us to iterate over data that
 * comes asynchronously, in this case the data will be our directories.
 * Returns an Async Iterator of the files in every directory that
 * is not a node module or a git folder.
 * @param {string} dir - Directory.
 */
async function* getFiles(dir: string): AsyncGenerator<string> {
  // A representation of a directory entry, as
  // returned by reading from an fs.Dir.
  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) { // Base condition.
    // Resolving the files and directories.
    const res = resolve(dir, dirent.name);
    // Do not get files if they're node modules or git folders.
    const shouldNotGetFiles = (
      res.includes('node_modules') ||
      res.includes('.git')
    )
    // If it's a directory, recursively get more files.
    if (dirent.isDirectory() && !shouldNotGetFiles) {
      yield* getFiles(res);
    } else {
      yield res; // Return the file.
    }
  }
}

/**
 * Parses the Markdown file into a HTML file, then creates a DOM object,
 * then uses querySelectorAll to find all of the images.
 * The images are processed to get their metadata, then we return an image
 * array.
 * @param {string} file - Markdown File.
 */
function findImagesInMarkdown(file: string): Array<IImage> {
  const readMe = readFileSync(file, 'utf-8');
  const readmeHtml = marked(readMe); // .md to .html.
  const dom = new JSDOM(readmeHtml);// .html to DOM.
  const images: Array<IImage> = Array // Parsing images in the DOM.
    .prototype
    .slice
    .call(dom.window.document.querySelectorAll('img'))
    .reduce((rawImages: Array<IImage>, image: any) => {
      rawImages.push({
        alt: image.getAttribute('alt') as string,
        title: image.getAttribute('title') as string,
        src: image.getAttribute('src') as string,
      });
      return rawImages;
    }, []);
  return images;
}

/**
 * Downloads all of the found images in the markdown files,
 * then save the data in the passed directory.
 * @param {IImage[]} images - Array of images attrs.
 * @param {string} saveDirectory - Download directory.
 */
async function downloadImages(images: IImage[], saveDirectory: string) {
  for (let i = 0; i < images.length; i++) {
    const { src, title, alt } = images[i];
    const filename = `${title}_${alt}.png`
      .replace(/[/\\?%*:|"<>]/g, '')
      .replace(' ', '-');
    const result = await axios({ url: src, responseType: 'stream' });
    // Downloading the images, then saving them.
    await new Promise(resolve => {
      result.data
        .pipe(createWriteStream(
          join(saveDirectory, filename),
          {
            flags: 'w+',
          },
        ))
        .on('finish', resolve)
        .on('error', (e: Error) => {
          throw new Error(e.message);
        });
    });
  }
}

/**
 * Recursively downloads all images then saves
 */
async function recursiveMarkdownImageSearch() {
  spinner.start();
  let index = 0;
  for await (const file of getFiles('..')) {
    index ++;
    const parsedFile = file.split('.');
    const fileFormat = parsedFile[parsedFile.length - 1];
    if (fileFormat === 'md') {
      spinner.setSpinnerString(index);
      const images = findImagesInMarkdown(file);
      const directory = file.split('\\');
      const saveDirectory = directory
        .slice(0, directory.length - 1)
        .join('\\');
      await downloadImages(images, saveDirectory);
    }
  }
  spinner.setSpinnerString('slow');
  spinner.stop();
}

recursiveMarkdownImageSearch().then(() => {
  console.log('\nDone! Exiting Node.js...');
});
