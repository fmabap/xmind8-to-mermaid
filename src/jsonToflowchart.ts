import { XMindTopic, XMindType } from "./xmindTypes";

export class jsonToflowchart {
    private firstTopic: boolean = true;
    private idCounter: number = 0;
    public convert(data: XMindType, format: string = "LR"): string {
        const mermaid = "flowchart " + format + "\n";

        if (data["xmap-content"] == undefined) {
            return mermaid;
        }
        if (data["xmap-content"].sheet == undefined) {
            return mermaid;
        }
        if (data["xmap-content"].sheet.topic == undefined) {
            return mermaid;
        }

        if (data["xmap-content"].sheet.topic.children == undefined) {
            return mermaid + this.getIdWithTitle(data["xmap-content"].sheet.topic)
        }
        return mermaid + this.getConnections(data["xmap-content"].sheet.topic);
    }
    private getId(topic: XMindTopic): string {
        if (topic["@_id"] == undefined || topic["@_id"] == "") {
            this.idCounter = this.idCounter + 1;
            topic["@_id"] = "OBJ" + this.idCounter.toString();
        }
        return topic["@_id"];
    }
    private getIdWithTitle(topic: XMindTopic): string {
        this.getId(topic);
        let nodeText = " ";
        if (topic.title != undefined) {
            if (topic.title["#text"] != undefined) {
                nodeText = topic.title["#text"]
            }
            else {
                nodeText = topic.title as string;
            }
        }
        if (nodeText == "") {
            nodeText = " ";
        }
        const result = `${topic["@_id"]}["${nodeText}"]`;
        return result;
    }
    private getConnections(topic: XMindTopic): string {
        let conString = "";

        if (topic.children == undefined) {
            return "";
        }
        if (topic.children.topics == undefined) {
            return "";
        }

        function getCon(childTopic: XMindTopic) {
            let curCon = "\t";
            if (conString != "") {
                conString = conString + "\n";
            }
            if (this.firstTopic === true) {
                this.firstTopic = false;
                curCon = curCon + this.getIdWithTitle(topic);
            }
            else {
                curCon = curCon + this.getId(topic);
            }
            curCon = curCon + " --> " + this.getIdWithTitle(childTopic);
            conString = conString + curCon;
            const childCon = this.getConnections(childTopic);
            if (childCon != undefined && childCon != "") {
                conString = conString + "\n" + childCon;
            }
        }

        const getC = getCon.bind(this);
        if (Array.isArray(topic.children.topics.topic)) {
            topic.children.topics.topic.forEach(childTopic => {
                getC(childTopic);
            });
        }
        else {
            getC(topic.children.topics.topic);
        }
        return conString;
    }
}