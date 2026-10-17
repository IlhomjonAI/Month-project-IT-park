const benefits = []
const input = document.querySelector(".input");
const wrapper = document.querySelector(".wrapper");

input.addEventListener('input', function () {
    let arr = input.value.split(", ");
    if (arr.length == 2) {
        benefits.push(arr[0])
        arr = [];
        input.value = ''
    }
      wrapper.innerHTML = ''
    for (let i = 0; i < benefits.length; i++) {
       const span  = document.createElement("span");
       span.textContent = benefits[i];
     
       wrapper.append(span)
    }

})