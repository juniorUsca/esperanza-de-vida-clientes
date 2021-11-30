import morgan from 'morgan'
import chalk from 'chalk'

const morganHandler = morgan((tokens, req, res) => [
  chalk.hex('#ff4757').bold(`🐶 ${req.idTrx ? req.idTrx : ''}`),
  chalk.hex('#ff4757').bold(`${req.user ? `[User: ${req.user.username}]` : ''} --> `),
  chalk.hex('#34ace0').bold(tokens.method(req, res)),
  chalk.hex('#ffb142').bold(tokens.status(req, res)),
  chalk.hex('#ff5252').bold(tokens.url(req, res)),
  chalk.hex('#2ed573').bold(`${tokens['response-time'](req, res)} ms`),
  chalk.hex('#f78fb3').bold(`@ ${tokens.date(req, res)}`),
  chalk.yellow(tokens['remote-addr'](req, res)),
  chalk.hex('#fffa65').bold(`from ${tokens.referrer(req, res)}`),
  chalk.hex('#1e90ff')(tokens['user-agent'](req, res)),
  '\n',
].join(' '))

export default morganHandler
