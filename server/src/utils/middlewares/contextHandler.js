import { v4 as uuidv4 } from 'uuid'

export default (req, __, next) => {
  req.idTrx = uuidv4()
  next()
}
