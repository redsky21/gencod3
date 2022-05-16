import { AxiosResponse } from "axios";
import GenerateService from "./gerp/generate.service";

export type TBaseResponse<T> = Promise<AxiosResponse<T>>

export default {
    GenerateService
}