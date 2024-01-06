import jszip = require("jszip");
import fs = require("fs");
import { XMLParser } from 'fast-xml-parser';
import { XMindType } from "./xmindTypes";

export class XMindParser {
    async parseXMind(filename: string): Promise<XMindType> {
        if (fs.existsSync(filename)) {
            const XMindXML = await this.unzip(filename);
            const jsonDataStr = this.xmlToJSON(XMindXML);
            const jsonXmind: XMindType = JSON.parse(JSON.stringify(jsonDataStr));
            return (jsonXmind);
        }
        else {
            console.error(`The Xmind File ${filename} does not exist`);
            return null;
        }
    }
    private async unzip(filename: string): Promise<string> {

        const fileContent = fs.readFileSync(filename);
        const jszipInstance = new jszip();
        const result = await jszipInstance.loadAsync(fileContent);
        const contentXMLFile = result.file("content.xml");
        const content = await contentXMLFile.async('string') as string;

        return content;
    }
    private xmlToJSON(xmlDataStr: string): string {
        const options = {
            ignoreAttributes: false,
            attributeNamePrefix: "@_"
        };

        const parser = new XMLParser(options);
        const output = parser.parse(xmlDataStr);
        return output;

    }

}

