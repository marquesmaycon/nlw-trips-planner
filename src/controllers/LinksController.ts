import { Link } from "../validation/types"
import TripResourceBaseController from "./TripResourceBaseController"

class LinksController extends TripResourceBaseController<Link> {
  constructor() {
    super('links')
  }
}

export const linksController = new LinksController()