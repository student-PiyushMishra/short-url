function handleBrokenLinks(ogURL, availableRoutes){
  if(availableRoutes.includes(ogURL.split("/")[1])) return true
  else return false
}

export default handleBrokenLinks
