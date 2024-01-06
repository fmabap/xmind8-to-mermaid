import fs = require("fs");
export class MDCreater {
    public createMD(filename: string, mermaid: string) {
        const fileContent = this.getFileContent(mermaid);
        fs.writeFileSync(filename, fileContent);
        console.log(filename + " created");
    }
    private getFileContent(mermaid: string) {
        const fileContent = "```mermaid" + "\n" + mermaid + "\n" + "```";
        return fileContent;
    }
}