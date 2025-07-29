data = data.reverse()

const iconsData = `<i class="ri-delete-bin-6-line"></i><i class="ri-share-fill"></i>`

const linksDiv = document.querySelector(".part2")

data.forEach(link => {
  if(link.redirectUrl.startsWith("https://")){link.redirectUrl = link.redirectUrl.split("https://")[1]}else{
    link.redirectUrl = link.redirectUrl.split("http://")[1]
  }
  const linkDiv = createDiv('link',null)
  const shortId = createDiv('shortid', link.shortId)
  const redirectUrl = createDiv('redirecturl', link.redirectUrl)
  const icons = createDiv('icons', iconsData)
  linkDiv.appendChild(shortId)
  linkDiv.appendChild(redirectUrl)
  linkDiv.appendChild(icons)
  linksDiv.appendChild(linkDiv)
})

function createDiv(className, content){
  const div = document.createElement('div')
  div.className = className
  if(content){div.innerHTML = content}
  return div
}

if(document.querySelector('.part2')){
  document.querySelector('.part2').addEventListener('click',(e)=>{
    if(e.target.className == 'ri-delete-bin-6-line'){
      console.log('hey')
      console.log(e.target.closest('.link'))
    }
  })
}
