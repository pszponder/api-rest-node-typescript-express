import { IMessageResponse } from "./IMessageResponse";

export interface IErrorResponse extends IMessageResponse {
  stack?: string;
}
