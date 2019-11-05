"use strict";
import {Modal} from "./modal";
import { div, dropdown, h2, textbox, TagElement} from "../util/tags";
export class Prompt extends Modal {
    private input: TagElement<"input">;
    private keyHandler: (evt: Event) => void;
    private messageHandler: (message: String)=> void
    constructor(callbackHandler: (message: string)=>void){
        super(
            div([], []),
            { windowClasses: ['prompt'] }
        );
        this.keyHandler = (evt: KeyboardEvent) => this.onKeyDown(evt);
        this.input.addEventListener('keydown', this.keyHandler);
        this.messageHandler=callbackHandler
    }

    promptMain(){
        const el = div(["prompt-display"], [
            div([], [
                this.input = textbox([], "")
            ])
        ])
        return el;
    }
    show() {
        this.promptMain.bind(this);
        super.show();
    }
    onKeyDown(evt: KeyboardEvent) {
        if (evt.key === 'Enter') {
            this.messageHandler(this.input.value)
            evt.preventDefault();
            super.hide();
        } else if (evt.key === 'Escape' || evt.key === 'Cancel') {
            super.hide();
        }
    }

}