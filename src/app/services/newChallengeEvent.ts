import Challenge from './challenge';
export class NewChallengeEvent {
    private _name:string;

    constructor(name:string) {
        this._name = name;
    }

    public get name():string {
        return this._name;
    }
}