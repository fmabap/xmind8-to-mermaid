# XMind 8 to Mermaid flowchart

This command line based program converts a XMind 8 file to a Mermaid flowchart.

It takes only the text of the shapes for the conversion.

It supports only XMind 8 files with one sheet / diagram.

## How does it work

A XMind file is just a renamed ZIP-file. It contains among others the file content.xml. The program unzips and parses this XML-file. The XML will be converted into a Markdown-file that contains the Mermaid flowchart.

## Installation

- The program requires Node.js. You can download and install it from [here](https://nodejs.org/)
- Clone or download this Git repository
- If you downloaded it then unzip it to a folder you like
- Open a terminal or the command prompt
- Use the cd command to switch to the folder where you unzipped or cloned the repository to
- Enter the following command ```npm install```. This installs the dependencies
- Enter then the following command ```npm run build```. This converts the source code into executable JS files

## Execution of the program

You can run the program after the successful installation with the command ```npm run conv``` followed by the path to the XMind-file and an optional flowchart format option from the main folder of the program.

The Markdown-file will be created in the folder of the XMind-file with the name of the XMind-file.

Example: ```npm run conv "C:\test\myxmind.xmind"``` converts the XMind into ```"C:\test\myxmind.md"```

### Format options (directions)

There are the following format options (directions) of the Mermaid flowchart:

- TB - Top to bottom
- TD - Top-down/ same as top to bottom
- BT - Bottom to top
- RL - Right to left
- LR - Left to right

If no format option is entered then LR will be used.

You can find an explanation of it [here](https://mermaid.js.org/syntax/flowchart.html#direction)

Example: ```npm run conv "C:\test\myxmind.xmind" TD``` converts the XMind-file with format option TD.
