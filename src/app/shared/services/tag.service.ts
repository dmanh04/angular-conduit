import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TagsResponse } from "../models/tag.model";
import { api_prefix } from "../constants/api.constant";

@Injectable({
    providedIn: "root"
})
export class TagService {

    constructor(private httpClient: HttpClient) {}

    getTags(): Observable<TagsResponse> {
        return this.httpClient.get<TagsResponse>(`${api_prefix}/tags`)
    }
}