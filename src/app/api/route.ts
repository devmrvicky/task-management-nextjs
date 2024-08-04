export function GET(request: Request){
  const res = Response.json({message: 'message for testing'})
  console.log(res)
  console.log('get request for testing')
  return res
}