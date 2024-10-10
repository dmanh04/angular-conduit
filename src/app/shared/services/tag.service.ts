import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseResponse, TagResponse } from "../models";


@Injectable({
    providedIn: 'root'
})
export class TagService {
    
    readonly #http = inject(HttpClient);

    getTags(): Observable<BaseResponse<TagResponse[]>>{
        return this.#http.get<BaseResponse<TagResponse[]>>('tags');
    }
}