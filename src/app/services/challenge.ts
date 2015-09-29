const GameTime = 30;

export class Challenge {
    private _id:number;
    private _name:string;
    private _distance:number;
    private _maxSpeed:number;
    private _speed:number;
    private _timeLeft:number;
    private _started:boolean;
    private _revolutionsStarted:number;
    private _revolutionsEnded:number;

    constructor(id:number, name:string, distance:number, maxSpeed:number, speed:number, timeLeft:number) {
        this._id = id;
        this._name = name;
        this._distance = distance;
        this._maxSpeed = maxSpeed;
        this._speed = speed;
        this._timeLeft = timeLeft;
    }

    public static createNew(name:string, id:number):Challenge {
        //todo remove random
        return new Challenge(id, name, 0, 0, 0, GameTime);
    }

    public static unmarshal(obj:any):Challenge {
        return new Challenge(obj._id, obj._name, obj._distance, obj._maxSpeed, 0, obj._timeLeft);
    }

    public markAsStarted() {
        this._started = true;
    }

    public get started():boolean {
        return this._started;
    }

    public get id():number {
        return this._id;
    }

    public get name():string {
        return this._name;
    }

    public get place():number {
        return this.distance;
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

    public set timeLeft(value:number) {
        this._timeLeft = value;
    }

    public get revolutionsStarted():number {
        return this._revolutionsStarted;
    }

    public set revolutionsStarted(value:number) {
        this._revolutionsStarted = value;
    }

    public get revolutionsEnded():number {
        return this._revolutionsEnded;
    }

    public set revolutionsEnded(value:number) {
        this._revolutionsEnded = value;
    }

    public set distance(value:number) {
        this._distance = value;
    }

    public set maxSpeed(value:number) {
        this._maxSpeed = value;
    }
}