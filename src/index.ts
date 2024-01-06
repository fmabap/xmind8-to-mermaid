import { XMindParser } from "./xmindParser";
import { jsonToflowchart } from "./jsonToflowchart";
import { MDCreater } from "./MDCreater";

async function main() {
    if (!process.argv[2]) {
        writeError();
        return;
    }
    const filename = process.argv[2];
    let format = "LR";
    if (process.argv[3] != undefined) {
        switch (process.argv[3]) {
            case "TB":
            case "TD":
            case "BT":
            case "RL":
            case "LR":
                format = process.argv[3];
                break;

            default:
                writeError();
                return;
        }
    }
    try {
        const parser = new XMindParser();
        const jsonXmind = await parser.parseXMind(filename);
        if (jsonXmind != null) {
            const jsonToflowchartConv = new jsonToflowchart();
            const flowchart = jsonToflowchartConv.convert(jsonXmind, format);
            const targetFile = filename.replace(/\.[^/.]+$/, "") + ".md"
            const mdCreater = new MDCreater();
            mdCreater.createMD(targetFile, flowchart);
        }
    }
    catch (error) {
        console.error(error);
    }

}
function writeError() {
    console.error("Please enter the path to the XMind File as parameter1 and optional the format (TB, TD, BT, RL LR) as parameter2 (LR is default)");
}
main();




