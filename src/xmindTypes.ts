export interface XMindType {
    "?xml"?: XMindXML,
    "xmap-content"?: XMindXmapContent
}
export interface XMindXML {
    "@_version"?: string,
    "@_encoding"?: string,
    "@_standalone"?: string
}
export interface XMindXmapContent {
    sheet?: {
        topic?: XMindTopic
    },
    "@_xmlns"?: string,
    "@_xmlns:fo"?: string,
    "@_xmlns:svg"?: string,
    "@_xmlns:xhtml"?: string,
    "@_xmlns:xlink"?: string,
    "@_modified-by"?: string,
    "@_timestamp"?: string,
    "@_version"?: string
}
export interface XMindTopic {
    title?: string | XMindTopicTitle,
    "@_id"?: string,
    "@_modified-by"?: string,
    "@_timestamp"?: string,
    extensions?: {
        extension?: {
            content?: {
                "right-number"?: number
            },
            "@_provider"?: string
        }
    },
    children?: {
        topics?: {
            topic?: XMindTopic[]
        }
    }
}
export interface XMindTopicTitle {
    "#text"?: string
}
