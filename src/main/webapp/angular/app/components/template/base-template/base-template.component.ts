import {Component} from '@angular/core';
import {UiComposition} from 'angular-jsf-components';

@Component({
    selector: 'app-base-template',
    templateUrl: './base-template.component.html',
    styleUrls: ['./base-template.component.css']
})
export class BaseTemplateComponent extends UiComposition {
    constructor() {
        super();
    }
}
