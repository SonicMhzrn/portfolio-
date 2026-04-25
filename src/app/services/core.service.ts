import { Injectable } from "@angular/core";

@Injectable()
export class CoreService {
    public FocusInputById(targetId: string, waitTimeInMs: number = 100) {
        let timer = window.setTimeout(function () {
            let htmlObject: any = document.getElementById(targetId);
            if (htmlObject) {
                htmlObject.focus();
                let elemType = htmlObject.type;
                //content selection is applied for below content types. Not applicable For other only focus is applied.
                if (
                    elemType == "text" ||
                    elemType == "number" ||
                    elemType == "tel" ||
                    elemType == "password"
                ) {
                    htmlObject.select();
                }
            }
            clearTimeout(timer);
        }, waitTimeInMs);
    }
}
