import Generic from "./Generic";

export default interface Meeting extends Generic {
    date_start: string;
    gmt_offset: string;
    location: string;
    meeting_name: string;
    meeting_official_name: string;
    meeting_key: number;
    year: number;
}
