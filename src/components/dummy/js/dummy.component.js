// import webpack from '../../../general/images/webpack.png'
// import react from '../../../general/images/react.png'
import logo from '../../../general/images/svg/webpack.svg'
console.log('logo', logo)

class Dummy {
  constructor(element) {
    this.element = element

    this.init()
  }

  init() {
    console.log('dummy is running!')

    let img = document.createElement('img')
    img.setAttribute('src', logo)

    document.body.appendChild(img)
  }
}

export default Dummy
