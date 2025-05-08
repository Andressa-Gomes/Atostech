import { VideoInfoResponse } from "./video-info-response.model";

export interface CourseResponse {
    id: number;
    title: string;
    shortDescription: string;
    description: string;
    path?: string;
    isActive?: boolean;
    createDate?: string
    icon?: string;
    videos?: VideoInfoResponse[];
}
