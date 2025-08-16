import { Match } from "./Match"

export class MatchResponse {
    created: Match[]
    pending: Match[]
    confirmed: Match[]

    constructor(data:any) {
        this.created = data.created.map((match:any) => new Match(match, data.userId))
        this.pending = data.pending.map((match:any) => new Match(match, data.userId))
        this.confirmed = data.confirmed.map((match:any) => new Match(match, data.userId))
    }


}