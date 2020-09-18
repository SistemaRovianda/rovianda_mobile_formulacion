import { Inject, Injectable } from "@angular/core";
import { API_ENDPOINT_PROVIDER } from "src/app/providers/tokens";
import { Formulation } from "../models/formulation.interface";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { FileOpener } from "@ionic-native/file-opener/ngx";
import {
  FileTransfer,
  FileTransferObject,
} from "@ionic-native/file-transfer/ngx";
import { File } from "@ionic-native/file/ngx";
import { environment } from "src/environments/environment";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class FormulationService {
  url: string;

  fileTransfer: FileTransferObject;

  constructor(
    private http: HttpClient,
    private fileOpener: FileOpener,
    private transfer: FileTransfer,
    private file: File,
    private toastCtrl: ToastController,
    @Inject(API_ENDPOINT_PROVIDER) private endpoint
  ) {
    this.url = `${endpoint}`;
  }

  addFormulation(payload: Formulation): Observable<any> {
    // const f = {
    //   ...payload,
    //   loteId: parseInt(payload.lotId),
    // };
    return this.http.post<any>(`${this.url}/formulation`, payload);
  }

  // getReport(idFormulation: string): Observable<any> {
  //   return this.http.get(`${this.url}/report/formulation/${idFormulation}`, {
  //     responseType: "arraybuffer",
  //     observe: "response",
  //   });
  // }

  getReport(idFormulation: string) {
    this.fileTransfer = this.transfer.create();
    this.fileTransfer
      .download(
        `${this.url}/report/formulation/${idFormulation}`,
        this.file.dataDirectory + idFormulation + ".pdf"
      )
      .then((entry) => {
        this.fileOpener
          .open(entry.toURL(), "application/pdf")
          .then(() => {
            this.toastSuccessDownload();
          })
          .catch((error) => console.log("Error opening file", error));
      });
  }

  async toastSuccessDownload() {
    const toast = await this.toastCtrl.create({
      message: "Se decargo con exito",
      duration: 2000,
      color: "success",
    });
    // this.router.navigate(["/dried/menu"]);
    toast.present();
  }
}
