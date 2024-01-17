import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
  .prompt([
    {
      message: 'Type in your URL',
      name: 'URL',
    },
  ])
  .then((answers) => {
    const url = answers.URL;
    var qr_svg = qr.image(url);

    // Save QR code image to file
    qr_svg.pipe(fs.createWriteStream('image.png'));

    // Save URL to msg.txt
    fs.writeFile('msg.txt', url, (err) => {
      if (err) {
        console.error('Error saving msg.txt:', err);
      } else {
        console.log('The msg.txt file has been saved!');
      }
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
