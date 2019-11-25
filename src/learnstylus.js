import './stylus.styl'
export const learnstylus = () => {
  var stylelement = document.createElement('div')
  stylelement.innerHTML = _.join(['Hello', 'stylus'], ' ')
  stylelement.classList.add('style');
  return stylelement
}