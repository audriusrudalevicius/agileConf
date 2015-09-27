export interface SpeedInformationDTO {
    revolutions:number,
    speed:number
}
export class SpeedReceivedEvent {
    private _payload:SpeedInformationDTO;

    constructor(payload:SpeedInformationDTO) {
        this._payload = payload;
    }

    public get payload():SpeedInformationDTO {
        return this._payload;
    }
}