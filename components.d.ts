import { Text, Code, Line, List, Quote, Refer, Table, Tip, Title, Image, Api } from './page/component/note'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Text: typeof Text,
    Image: typeof Image,
    Api: typeof Api,
    Code: typeof Code,
    Line: typeof Line,
    List: typeof List,
    Quote: typeof Quote,
    Refer: typeof Refer,
    Table: typeof Table,
    Tip: typeof Tip,
    Title: typeof Title,
  }
}
