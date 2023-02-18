console.log('12345')
// 此檔用來改首頁部分項目的 background-color

const changeBG = document.querySelectorAll('.col-8[data-index]')

changeBG.forEach(item => {
  if ((Number(item.dataset.index) + 1) % 2) {
    item.classList.add('bg-gray')
  }
})
