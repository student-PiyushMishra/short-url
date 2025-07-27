    data = data.reverse()
    const tableBody = document.getElementById("linkTableBody");
    data.forEach(link => {
      const tableRow = document.createElement('tr')
      const shortId = document.createElement('td')
      const redirectUrl = document.createElement('td')
      shortId.textContent = link.shortId 
      redirectUrl.textContent =  link.redirectUrl  
      tableRow.appendChild(shortId) 
      tableRow.appendChild(redirectUrl) 
      tableBody.appendChild(tableRow)
    })
