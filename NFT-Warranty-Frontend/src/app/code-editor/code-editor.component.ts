import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ServerHandlerService } from './../../services/http/server-handler.service';
import { map } from 'rxjs/operators'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import * as ace from 'ace-builds';

import 'ace-builds/webpack-resolver.js';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-csharp';
import 'ace-builds/src-noconflict/mode-php';
import 'ace-builds/src-noconflict/mode-ruby';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-beautify';

import { languageModuleMap } from './consts/language-module-table';
import { themeModuleMap } from './consts/theme-module-table';

const DEFAULT_INIT_CONTENT = '';
const DEFAULT_THEME = 'ace/theme/chrome';
const DEFAULT_LANG = 'cpp14';

@Component({
    selector: 'app-code-editor',
    templateUrl: './code-editor.component.html',
    styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements OnInit {

    // private codeEditor: ace.Ace.Editor;
    // private editorBeautify: any; // beautify extension
    // @ViewChild('codeEditor') private codeEditorElmRef: ElementRef;
    // @ViewChild('languagesSelect') private selectLanguageElmRef: ElementRef;
    // @ViewChild('outputBox') private outputBoxElmRef: ElementRef;
    // // @Input() content: string;
    // public languageTable: any;
    // public supportedThemes = ['github', 'chrome', 'eclipse', 'twilight'];
    // public currentTheme: string;
    // // interface runOutput {
    // //   output: string,
    // //   statusCode: Number,
    // //   memory: string,
    // //   cpuTime: string
    // // }
    // // private currentConfig: {
    // //    langMode?: string, editorTheme?: string
    // // } = {};
    //
    // constructor(private handler: ServerHandlerService) { }
    //
    // ngOnInit() {
    //     ace.require('ace/ext/language_tools');
    //     setTimeout(() => {
    //       const element = this.codeEditorElmRef.nativeElement;
    //       const editorOptions = this.getEditorOptions();
    //
    //       this.codeEditor = this.createCodeEditor(element, editorOptions);
    //       this.setLanguageMode(DEFAULT_LANG);
    //       this.setEditorTheme(DEFAULT_THEME);
    //       this.currentTheme = "chrome";
    //       this.setContent(DEFAULT_INIT_CONTENT);
    //       this.editorBeautify = ace.require('ace/ext/beautify');
    //       this.getLangs();
    //     }, 1000);
    // }
    //
    // getLangs(){
    //   this.handler.getAllSupportedLangs().subscribe(
    //     result => {
    //       this.languageTable = result;
    //       this.languageTable = this.languageTable.langs;
    //       console.log(this.languageTable);
    //     },
    //     error => {
    //       console.log(error);
    //     }
    //   );
    // }
    //
    // private createCodeEditor(element: Element, options: any): ace.Ace.Editor {
    //     const editor = ace.edit(element, options);
    //     editor.setShowFoldWidgets(true);
    //     return editor;
    // }
    //
    // private getEditorOptions(): Partial<ace.Ace.EditorOptions> & { enableBasicAutocompletion?: boolean; } {
    //     const basicEditorOptions: Partial<ace.Ace.EditorOptions> = {
    //         highlightActiveLine: true,
    //         minLines: 14,
    //         maxLines: Infinity,
    //     };
    //     const extraEditorOptions = { enableBasicAutocompletion: true, enableLiveAutocompletion: true };
    //     return Object.assign(basicEditorOptions, extraEditorOptions);
    // }
    //
    // public getContent() : any {
    //     if (this.codeEditor) {
    //         const code = this.codeEditor.getValue();
    //         return code;
    //     }
    // }
    //
    // public setContent(content: string): void {
    //     if (this.codeEditor) {
    //         this.codeEditor.setValue(content);
    //     }
    // }
    //
    // public beautifyContent() {
    //     if (this.codeEditor && this.editorBeautify) {
    //         const session = this.codeEditor.getSession();
    //         this.editorBeautify.beautify(session);
    //     }
    // }
    //
    // public OnContentChange(callback: (content: string, delta: ace.Ace.Delta) => void): void {
    //     this.codeEditor.on('change', (delta) => {
    //         const content = this.codeEditor.getValue();
    //         callback(content, delta);
    //     });
    // }
    //
    // public onLanguageSelect(){
    //     const index = this.selectLanguageElmRef.nativeElement.value;
    //     const langMode = this.languageTable[index].lang;
    //     console.log("Hello");
    //     console.log(langMode);
    //     const langModeModulePath = String(languageModuleMap.get(langMode));
    //     console.log(langModeModulePath);
    //     // this.codeEditor.getSession().setMode(langModeModulePath!);
    //     this.codeEditor.session.setMode(langModeModulePath!);
    //     console.log(this.codeEditor.getSession().getMode());
    // }
    //
    // public onThemeSelect(theme: string){
    //     const themeModulePath = themeModuleMap.get(theme);
    //     this.codeEditor.setTheme(themeModulePath!);
    //     console.log("Theme changed");
    //     this.currentTheme = theme;
    // }
    //
    // public consoleCode(){
    // }
    //
    // public setLanguageMode(langMode: string): void {
    //   try{
    //     if(languageModuleMap.has(langMode)){
    //       const langModeModulePath = languageModuleMap.get(langMode);
    //       this.codeEditor.session.setMode(langModeModulePath!);
    //       console.log(this.codeEditor.getSession().getMode());
    //       // this.codeEditor.session.setMode(langModeModulePath!);
    //     }
    //   } catch(error) {
    //     console.log(error);
    //   }
    // }
    //
    // public setEditorTheme(theme: string): void {
    //     try {
    //         if (themeModuleMap.has(theme)) {
    //             const themeModulePath = themeModuleMap.get(theme);
    //             this.codeEditor.setTheme(themeModulePath!);
    //         }
    //     } catch (error) { console.log(error); }
    // }
    //
    // public onRunContent(){
    //   const code = this.codeEditor.getValue();
    //   if(code && code.length>0){
    //     const index = this.selectLanguageElmRef.nativeElement.value;
    //     const id = this.languageTable[index].lang;
    //     const version = this.languageTable[index].version;
    //     // this.handler.postCodeToRun(code, {id: id, version: version}).subscribe(
    //     //   (result: any) => {
    //     //     this.outputBoxElmRef.nativeElement.value = "";
    //     //     this.outputBoxElmRef.nativeElement.value = result.output;
    //     //     console.log(result.output);
    //     //     // this.outputBoxElmRef.nativeElement.value = result.output;
    //     //   },
    //     //   error => {
    //     //     console.log(error);
    //     //   }
    //     // );
    //   }
    // }

    private codeEditor: ace.Ace.Editor;
    private editorBeautify: any; // beautify extension
    @ViewChild('codeEditor') private codeEditorElmRef: ElementRef;
    @ViewChild('languagesSelect') private selectLanguageElmRef: ElementRef;
    @ViewChild('outputBox') private outputBoxElmRef: ElementRef;
    @ViewChild('inputBox') private inputBoxElmRef: ElementRef;
    @Input() problem_id = '';
    // @Input() content: string;
    public languageTable: any;
    public supportedThemes = ['github', 'chrome', 'eclipse', 'twilight'];
    public currentTheme: string;
    public user_name: string;
    // interface runOutput {
    //   output: string,
    //   statusCode: Number,
    //   memory: string,
    //   cpuTime: string
    // }
    // private currentConfig: {
    //    langMode?: string, editorTheme?: string
    // } = {};

    constructor(private handler: ServerHandlerService, private _router: Router) { }

    ngOnInit() {
        ace.require('ace/ext/language_tools');
        const user_email = localStorage.getItem('user_email')!;
        if(!user_email){
          this._router.navigateByUrl('/authenticate');
        }
        this.user_name = user_email.substring(0,user_email.indexOf('@'));
        setTimeout(() => {
          const element = this.codeEditorElmRef.nativeElement;
          const editorOptions = this.getEditorOptions();

          this.codeEditor = this.createCodeEditor(element, editorOptions);
          this.setLanguageMode(DEFAULT_LANG);
          this.setEditorTheme(DEFAULT_THEME);
          this.currentTheme = "chrome";
          this.setContent(DEFAULT_INIT_CONTENT);
          this.editorBeautify = ace.require('ace/ext/beautify');
          this.getLangs();
          console.log("In Question: " + this.problem_id);
        }, 1000);
    }

    logout(){
      localStorage.removeItem('user_email');
      this._router.navigateByUrl('/authenticate');
    }

    getLangs(){
      this.handler.getAllSupportedLangs().subscribe(
        result => {
          this.languageTable = result;
          this.languageTable = this.languageTable.langs;
          console.log(this.languageTable);
        },
        error => {
          console.log(error);
        }
      );
    }

    private createCodeEditor(element: Element, options: any): ace.Ace.Editor {
        const editor = ace.edit(element, options);
        editor.setShowFoldWidgets(true);
        return editor;
    }

    private getEditorOptions(): Partial<ace.Ace.EditorOptions> & { enableBasicAutocompletion?: boolean; } {
        const basicEditorOptions: Partial<ace.Ace.EditorOptions> = {
            highlightActiveLine: true,
            minLines: 14,
            maxLines: Infinity,
        };
        const extraEditorOptions = { enableBasicAutocompletion: true, enableLiveAutocompletion: true };
        return Object.assign(basicEditorOptions, extraEditorOptions);
    }

    public getContent() : any {
        if (this.codeEditor) {
            const code = this.codeEditor.getValue();
            return code;
        }
    }

    public setContent(content: string): void {
        if (this.codeEditor) {
            this.codeEditor.setValue(content);
        }
    }

    public beautifyContent() {
        if (this.codeEditor && this.editorBeautify) {
            const session = this.codeEditor.getSession();
            this.editorBeautify.beautify(session);
        }
    }

    public OnContentChange(callback: (content: string, delta: ace.Ace.Delta) => void): void {
        this.codeEditor.on('change', (delta) => {
            const content = this.codeEditor.getValue();
            callback(content, delta);
        });
    }

    public onLanguageSelect(){
        const index = this.selectLanguageElmRef.nativeElement.value;
        const langMode = this.languageTable[index].lang;
        console.log("Hello");
        console.log(langMode);
        const langModeModulePath = String(languageModuleMap.get(langMode));
        console.log(langModeModulePath);
        // this.codeEditor.getSession().setMode(langModeModulePath!);
        this.codeEditor.session.setMode(langModeModulePath!);
        console.log(this.codeEditor.getSession().getMode());
    }

    public onThemeSelect(theme: string){
        const themeModulePath = themeModuleMap.get(theme);
        this.codeEditor.setTheme(themeModulePath!);
        console.log("Theme changed");
        this.currentTheme = theme;
    }

    public consoleCode(){
    }

    public setLanguageMode(langMode: string): void {
      try{
        if(languageModuleMap.has(langMode)){
          const langModeModulePath = languageModuleMap.get(langMode);
          this.codeEditor.session.setMode(langModeModulePath!);
          console.log(this.codeEditor.getSession().getMode());
          // this.codeEditor.session.setMode(langModeModulePath!);
        }
      } catch(error) {
        console.log(error);
      }
    }

    public setEditorTheme(theme: string): void {
        try {
            if (themeModuleMap.has(theme)) {
                const themeModulePath = themeModuleMap.get(theme);
                this.codeEditor.setTheme(themeModulePath!);
            }
        } catch (error) { console.log(error); }
    }

    public onRunContent(){
      const code = this.codeEditor.getValue();
      if(code && code.length>0){
        const index = this.selectLanguageElmRef.nativeElement.value;
        const id = this.languageTable[index].lang;
        const version = this.languageTable[index].version;
        const input = this.inputBoxElmRef.nativeElement.value;
        this.handler.postCodeToRun(code, {id: id, version: version}, input).subscribe(
          (result: any) => {
            this.outputBoxElmRef.nativeElement.style.display = 'block';
            console.log(this.outputBoxElmRef.nativeElement.style.display);
            this.outputBoxElmRef.nativeElement.value = "";
            this.outputBoxElmRef.nativeElement.value = result.output;
            console.log(result.output);
            // this.outputBoxElmRef.nativeElement.value = result.output;
          },
          error => {
            console.log(error);
          }
        );
      }
    }

    // public onSubmitContent(){
    //   const code = this.codeEditor.getValue();
    //   if(code && code.length>0){
    //     const index = this.selectLanguageElmRef.nativeElement.value;
    //     const id = this.languageTable[index].lang;
    //     const version = this.languageTable[index].version;
    //     // const input = this.inputBoxElmRef.nativeElement.value;
    //     const problem_id = this.problem_id;
    //     const email = localStorage.getItem('user_email')!;
    //     this.handler.postCodeToSubmit(code, {id: id, version: version}, problem_id, email).subscribe(
    //       (result: any) => {
    //         console.log(result);
    //         if(result.solved == 1){
    //           Swal.fire({
    //             icon: 'success',
    //             title: 'Congratulations',
    //             text: 'Question solved succesfully!',
    //             confirmButtonColor: "#0059b3",
    //             showCancelButton: false
    //           });
    //         }
    //         else{
    //           Swal.fire({
    //             icon: 'error',
    //             title: 'Oops',
    //             text: 'Question fails for some test cases!',
    //             confirmButtonColor: "#0059b3",
    //             showCancelButton: false
    //           });
    //         }
    //         // this.outputBoxElmRef.nativeElement.value = result.output;
    //       },
    //       error => {
    //         console.log(error);
    //       }
    //     );
    //   }
    // }

    // public getCurrentConfig(): Readonly<{ langMode?: string; editorTheme?: string; }> {
    //     return Object.freeze(this.currentConfig);
    // }
}
