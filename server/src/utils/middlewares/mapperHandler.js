export default (mapper, check = 'body') => (req, _, next) => {
  try {
    req[check] = mapper(req[check])
    next()
  } catch (err) {
    next(err)
  }
}
