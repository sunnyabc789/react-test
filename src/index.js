// import _ from 'lodash'

// function component() {
// 	var element = document.createElement('div')

// 	// Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
// 	element.innerHTML = _.join(['Hello', 'webpack'], ' ')



// 	return element
// }

// document.body.appendChild(component())
import _ from 'lodash'
import Print from './print'
import './style.css'

function component() {
	var element = document.createElement('div')

	// lodash 是由当前 script 脚本 import 导入进来的
	element.innerHTML = _.join(['Hello', 'webpack'], ' ')
  element.onclick = Print.bind(null, 'Hello webpack!')
  element.classList.add('style')
	return element
}

document.body.appendChild(component())