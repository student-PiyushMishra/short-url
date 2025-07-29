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

async function deleteLink(shortId){
  const url = "/url/delete"
  const headers = new Headers()
  headers.append("Content-Type", "application/json")
  fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({shortId: shortId})
  })
  .then(()=>{location.reload()})
  .catch((e)=>{console.error(e)})
}

if(document.querySelector('.part2')){
  document.querySelector('.part2').addEventListener('click',(e)=>{
    const popup = document.querySelector('.popup')
    if(e.target.className == 'ri-delete-bin-6-line'){
      const link = e.target.closest('.link')
      const shortId = link.querySelector('.shortid').textContent
      const redirectUrl = link.querySelector('.redirecturl').textContent
      // deleteLink(e.target.closest('.link').querySelector('.shortid').textContent)
      popup.innerHTML = writeWarning(shortId, redirectUrl)
      popup.style.display = 'flex'
      document.querySelector('.buttons').addEventListener('click',function(e){
        if(e.target.className == "yes"){deleteLink(shortId)}
        if(e.target.className == "no"){popup.style.display='none'}
      })
    }
    if(e.target.className == "ri-share-fill"){
      const link = e.target.closest('.link')
      const shortId = link.querySelector('.shortid').textContent
      popup.innerHTML = writeCopyMsg(shortId)
      popup.style.display = 'flex'
      document.querySelector('.popup button').addEventListener('click',function(){
        navigator.clipboard.writeText(popup.querySelector('h4').textContent)
          .then(()=>{popup.style.display = "none"; alert("Link copied to clipboard!")})
      })
    }
  })
}

function writeWarning(shortId, redirectUrl){
  return `<h3>Are you sure you want to delete this link?</h3>
      <h4>ShortId: <span>${shortId}</span></h4>
      <h4>RedirectUrl: <span>${redirectUrl}</span></h4>
     <div class="buttons"><button class="yes">Yes</button><button class="no">No</button></div>`
}

function writeCopyMsg(shortId){
  return `<h3>You can share the following link with everyone...</h3>
      <h4><span>https://pmurls.rf.gd/${shortId}</span></h4>
      <button class="close">Copy & Close</button>`
}
