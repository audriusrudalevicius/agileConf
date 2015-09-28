export class Challenge {

    private _id:number;
    private _name:string;
    private _place:number;
    private _distance:number;
    private _maxSpeed:number;
    private _speed:number;
    private _timeLeft:number;

    constructor(id:number, name:string, place:number, distance:number, maxSpeed:number, speed:number, timeLeft:number) {
        this._id = id;
        this._name = name;
        this._place = place;
        this._distance = distance;
        this._maxSpeed = maxSpeed;
        this._speed = speed;
        this._timeLeft = timeLeft;
    }

    public static createNew(name:string, id:number):Challenge {
        //todo remove random
        return new Challenge(id, name, Math.floor(Math.random() * 10) + 1, 0, 0, 0, 30);
    }

    public static unmarshal(obj:any):Challenge {
        return new Challenge(obj._id, obj._name, obj._place, obj._distance, obj._maxSpeed, 0, 0);
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

    public get speed():number {
        return this._speed;
    }

    public set speed(value:number) {
        this._speed = Math.round(value);
    }

    public get timeLeft():number {
        return this._timeLeft;
    }
}