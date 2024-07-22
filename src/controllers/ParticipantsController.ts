import { Participant } from "../validation/types"
import TripResourceBaseController from "./TripResourceBaseController"

class ParticipantsController extends TripResourceBaseController<Participant> {
  constructor() {
    super('participants')
  }
}

export const participantsController = new ParticipantsController()