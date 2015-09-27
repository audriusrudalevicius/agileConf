export class Challenge {

    private _id:number;
    private _name:string;
    private _place:number;
    private _distance:number;
    private _maxSpeed:number;

    constructor(name:string, id:number) {
        this._name = name;
        this._id = id;
        this._place = 0;
        this._distance = 0;
        this._maxSpeed = 0;
    }

    public get id():number {
        return this._id;
    }

    public get name():string {
        return this._name;
    }

    public get place():number {
        return this._place;
    }


    public get distance():number {
        return this._distance;
    }

    public get maxSpeed():number {
        return this._maxSpeed;
    }
}