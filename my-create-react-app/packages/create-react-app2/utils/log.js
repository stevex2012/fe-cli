export function log(...rest) {
  const date = new Date();
  const timeStamp = date.toISOString()
  console.log(`-----${timeStamp}`,...rest)
}
// export{ log}